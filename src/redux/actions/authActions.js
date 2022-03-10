import {login, register, verify, resendVerify, passwordResetRequest, passwordResetSubmit} from '../../config/config'
import {notification} from 'antd'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const VERIFY_REQUEST = 'VERIFY_REQUEST'
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS'
export const VERIFY_ERROR = 'VERIFY_ERROR'

export const RESEND_VERIFY_REQUEST = 'RESEND_VERIFY_REQUEST'
export const RESEND_VERIFY_SUCCESS = 'RESEND_VERIFY_SUCCESS'
export const RESEND_VERIFY_ERROR = 'RESEND_VERIFY_ERROR'

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST'
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS'
export const PASSWORD_RESET_ERROR = 'PASSWORD_RESET_ERROR'

export const PASSWORD_SUBMIT_REQUEST = 'PASSWORD_SUBMIT_REQUEST'
export const PASSWORD_SUBMIT_SUCCESS = 'PASSWORD_SUBMIT_SUCCESS'
export const PASSWORD_SUBMIT_ERROR = 'PASSWORD_SUBMIT_ERROR'

export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

const actions = {
  // LOGIN USER
  login: (data, history, type) => async (dispatch) => {
    dispatch({type: LOGIN_REQUEST})
    await login(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            accessToken: res?.data?.accessToken,
          },
        })
        localStorage.setItem('accessToken', res?.data?.accessToken)
        if (type === 'rc') {
          history.push('/rc/dashboard')
        } else if (type === 'js') {
          history.push('/js/dashboard')
        }
      } else if (res?.status === 333) {
        dispatch({
          type: LOGIN_ERROR,
        })
        history.push(res?.data?.url)
      } else {
        dispatch({
          type: LOGIN_ERROR,
        })
        notification['error']({
          message: 'Log in Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // LOGOUT USER
  logout: (history, type) => () => {
    localStorage.clear()
    sessionStorage.clear()
    if (type === 'js') {
      history.push('/js/login')
    } else {
      history.push('/rc/login')
    }
  },

  // REGISTER USER
  register: (data, history, type) => async (dispatch) => {
    dispatch({type: REGISTER_REQUEST})
    await register(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            message: res?.data?.message,
          },
        })
        notification['info']({
          message: 'Email Sent',
          description: res?.data?.message || res?.message,
        })
        if (type === 'rc') {
          history.push('/rc/login')
        } else if (type === 'js') {
          history.push('/js/login')
        }
      } else {
        dispatch({
          type: REGISTER_ERROR,
        })
        notification['error']({
          message: 'Register Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // VERIFY
  verify: (data, history, type) => async (dispatch) => {
    dispatch({type: VERIFY_REQUEST})
    await verify(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: VERIFY_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        notification['success']({
          message: 'Email Verified',
          description: res?.data?.message || res?.message,
        })
        if (type === 'rc') {
          history.push('/rc/login')
        } else if (type === 'js') {
          history.push('/js/login')
        }
      } else {
        dispatch({
          type: VERIFY_ERROR,
        })
        notification['error']({
          message: 'Verification Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // RESEND VERIFY
  resendVerify: (data, history, type) => async (dispatch) => {
    dispatch({type: RESEND_VERIFY_REQUEST})
    await resendVerify(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: RESEND_VERIFY_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        notification['info']({
          message: 'Email Sent',
          description: res?.data?.message || res?.message,
        })
        if (type === 'rc') {
          history.push('/rc/login')
        } else if (type === 'js') {
          history.push('/js/login')
        }
      } else {
        dispatch({
          type: RESEND_VERIFY_ERROR,
        })
        notification['error']({
          message: 'Resend Email Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // PASSWORD RESET
  passwordResetRequest: (data, history, type) => async (dispatch) => {
    dispatch({type: PASSWORD_RESET_REQUEST})
    await passwordResetRequest(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        notification['info']({
          message: 'Email Sent',
          description: res?.data?.message || res?.message,
        })
        if (type === 'rc') {
          history.push('/rc/login')
        } else if (type === 'js') {
          history.push('/js/login')
        }
      } else {
        dispatch({
          type: PASSWORD_RESET_ERROR,
        })
        notification['error']({
          message: 'Email Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // PASSWORD SUBMIT
  passwordResetSubmit: (data, history, type) => async (dispatch) => {
    dispatch({type: PASSWORD_SUBMIT_REQUEST})
    await passwordResetSubmit(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: PASSWORD_SUBMIT_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        notification['success']({
          message: 'Password reset',
          description: res?.data?.message || res?.message,
        })
        if (type === 'rc') {
          history.push('/rc/login')
        } else if (type === 'js') {
          history.push('/js/login')
        }
      } else {
        dispatch({
          type: PASSWORD_SUBMIT_ERROR,
        })
        notification['error']({
          message: 'Password Reset Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // CLEAR MESSAGES
  clearMessage: () => (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    })
  },
}

export default actions
