import { axiosInstance } from './axiosInstance'
import { User } from './types'
import { Account } from 'thirdweb/wallets'

axiosInstance.interceptors.response.use(
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
  try {
    const { data } = await axiosInstance.get<User>('/auth/isloggedin')
    return data
  } catch (err) {
    return false
  }
}

// const fetchNonce = async () => {
//   try {
//     const { data } = await axiosInstance.get<string>('/auth/nonce')
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

export const loginToPwBackend = async (
  chainId: number,
  address: string,
  signFunction: Account['signMessage']
) => {
  // const nonce = await fetchNonce()
  // const nonce = generateRandomString(16

  const message = "Signing in to Pairwise servers"

  const signature = await signFunction({
    message,
  })

  // Verify signature
  const verifyRes = await axiosInstance.post('/auth/login', {
    ...{ message, signature: `${signature}6`, address, chainId },
  })

  window.localStorage.setItem('auth', verifyRes.data)
  window.localStorage.setItem('loggedInAddress', address)
  axiosInstance.defaults.headers.common['auth'] = verifyRes.data
  return verifyRes
}

export const logoutFromPwBackend = async () => {
  try {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('loggedInAddress')
    if (axiosInstance.defaults.headers.common['auth']) {
      delete axiosInstance.defaults.headers.common['auth']
    }
    await axiosInstance.post('/auth/logout')
  } catch (err) {
    console.error(err)
  }
}
