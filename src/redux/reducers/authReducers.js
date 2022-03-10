import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
  RESEND_VERIFY_REQUEST,
  RESEND_VERIFY_SUCCESS,
  RESEND_VERIFY_ERROR,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  PASSWORD_SUBMIT_REQUEST,
  PASSWORD_SUBMIT_SUCCESS,
  PASSWORD_SUBMIT_ERROR,
  CLEAR_MESSAGES,
} from '../actions/authActions'

const initialState = {
  signupToken: '',
  accessToken: '',

  registerLoading: false,

  loginData: [],
  loginLoading: false,

  verifyEmailData: [],
  verifyEmailLoading: false,

  resendVerifyEmailData: [],
  resendVerifyEmailLoading: false,

  passwordResetData: [],
  passwordResetLoading: false,

  passwordSubmitData: [],
  passwordSubmitLoading: false,
}

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        accessToken: '',
        loginLoading: true,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
        loginLoading: false,
      })
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        accessToken: '',
        loginLoading: false,
      })

    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        registerLoading: true,
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        registerLoading: false,
      })
    case REGISTER_ERROR:
      return Object.assign({}, state, {
        registerLoading: false,
      })

    case VERIFY_REQUEST:
      return Object.assign({}, state, {
        verifyEmailLoading: true,
      })
    case VERIFY_SUCCESS:
      return Object.assign({}, state, {
        verifyEmailData: action.payload.data,
        verifyEmailLoading: false,
      })
    case VERIFY_ERROR:
      return Object.assign({}, state, {
        verifyEmailData: [],
        verifyEmailLoading: false,
      })

    case RESEND_VERIFY_REQUEST:
      return Object.assign({}, state, {
        resendVerifyEmailLoading: true,
      })
    case RESEND_VERIFY_SUCCESS:
      return Object.assign({}, state, {
        resendVerifyEmailData: action.payload.data,
        resendVerifyEmailLoading: false,
      })
    case RESEND_VERIFY_ERROR:
      return Object.assign({}, state, {
        resendVerifyEmailData: [],
        resendVerifyEmailLoading: false,
      })

    case PASSWORD_RESET_REQUEST:
      return Object.assign({}, state, {
        passwordResetLoading: true,
      })
    case PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        passwordResetData: action.payload.data,
        passwordResetLoading: false,
      })
    case PASSWORD_RESET_ERROR:
      return Object.assign({}, state, {
        passwordResetData: [],
        passwordResetLoading: false,
      })

    case PASSWORD_SUBMIT_REQUEST:
      return Object.assign({}, state, {
        passwordSubmitLoading: true,
      })
    case PASSWORD_SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        passwordSubmitData: action.payload.data,
        passwordSubmitLoading: false,
      })
    case PASSWORD_SUBMIT_ERROR:
      return Object.assign({}, state, {
        passwordSubmitData: [],
        passwordSubmitLoading: false,
      })

    case CLEAR_MESSAGES:
      return Object.assign({}, state, {})

    default:
      return state
  }
}

export default auth
