import axios from 'axios'

import {SENIOR_API} from '../constants'

export const PrivateApiCall = axios.create({
  baseURL: SENIOR_API,
})

PrivateApiCall.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('accessToken')
    req.headers.Authorization = `Bearer ${token}`
    return req
  },
  (err) => {
    throw err
  },
)

PrivateApiCall.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    throw err
  },
)

export const PublicApiCall = axios.create({
  baseURL: SENIOR_API,
})

PublicApiCall.interceptors.request.use(
  (req) => {
    return req
  },
  (err) => {
    throw err
  },
)

PublicApiCall.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    throw err
  },
)
