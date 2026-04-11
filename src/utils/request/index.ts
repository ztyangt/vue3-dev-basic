import { HttpRequestFactory } from './factory'

const getBaseUrl = () => {
  const baseURL = import.meta.env.APP_BASE_API
  return baseURL
}

export default HttpRequestFactory.create({
  type: 'axios',
  baseURL: getBaseUrl(),
  timeout: 0,
  withCredentials: false
})
