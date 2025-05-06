import axios from 'axios'

import { env } from '../env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
      localStorage.removeItem("@foodbox.scala:token")
      localStorage.removeItem("@foodbox.scala:auth")
    }

    return Promise.reject(error);
  }
);
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@foodbox.scala:token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}