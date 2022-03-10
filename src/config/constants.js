export const NODE_ENV = process.env.NODE_ENV
export const SENIOR_API = NODE_ENV == 'development' ? 'http://localhost:9900' : process.env.NODE_ENV
