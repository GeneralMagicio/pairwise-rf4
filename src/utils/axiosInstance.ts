import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL:
    // process.env.NEXT_PUBLIC_BASE_URL || 'https://pairwise.melodicdays.shop',
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:7070',
  headers: {
    'Content-type': 'application/json',
  },
})
