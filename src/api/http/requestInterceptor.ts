const handleRequestError = (err: any) => {
  console.log('handleRequestError', err)
  return Promise.reject(err)
}

const reqestInterceptor = (config: any) => {
  const token = 'Bearer ' + localStorage.getItem('token') || 'mock-token'
  config.headers['Authorization'] = token
  return config
}

export { reqestInterceptor, handleRequestError }
