import { axios } from '@/lib/axios'
import { User } from './types'
import { Account } from 'thirdweb/wallets'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      logoutFromPwBackend()
    }
    return Promise.reject(error)
  }
)

export const isLoggedIn = async () => {
  if (localStorage.getItem("auth")) return false
  try {
    const { data } = await axios.get<User>('/auth/isloggedin')
    return data
  } catch (err) {
    return false
  }
}

// const fetchNonce = async () => {
//   try {
//     const { data } = await axios.get<string>('/auth/nonce')
//     return data
//   } catch (err) {
//     console.error(err)
//   }
// }

// function generateRandomString(length: number): string {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

export let alreadyInProgress = false

export const loginToPwBackend = async (
  chainId: number,
  address: string,
  signFunction: Account['signMessage']
) => {
  alreadyInProgress = true
  // const nonce = await fetchNonce()
  // const nonce = generateRandomString(16

  const message = "Signing in to Pairwise servers"

  const signature = await signFunction({
    message,
  })

  // Verify signature
  const verifyRes = await axios.post('/auth/login', {
    ...{ message, signature: `${signature}`, address, chainId },
  })

  window.localStorage.setItem('auth', verifyRes.data)
  window.localStorage.setItem('loggedInAddress', address)
  axios.defaults.headers.common['auth'] = verifyRes.data

  alreadyInProgress = false
  return verifyRes
}

export const logoutFromPwBackend = async () => {
  try {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('loggedInAddress')
    if (axios.defaults.headers.common['auth']) {
      delete axios.defaults.headers.common['auth']
    }
    await axios.post('/auth/logout')
  } catch (err) {
    console.error(err)
  }
}
