import {
  getMeSkills,
  getRandomSkillTest,
  getTestDetails,
  submitSkillTest,
  changeJobSeekerPassword,
  jobSeekerAddInfo,
  jobSeekerGetInfo,
  getJobSeekerDashboard,
  readPdf,
  editJobSeekerProfile,
  getJSNotifications,
  getJSPendings,
  getMeProfile,
  jsRespond,
} from '../../config/config'
import {notification} from 'antd'

export const GET_ME_SKILLS_REQUEST = 'GET_ME_SKILLS_REQUEST'
export const GET_ME_SKILLS_SUCCESS = 'GET_ME_SKILLS_SUCCESS'
export const GET_ME_SKILLS_ERROR = 'GET_ME_SKILLS_ERROR'

export const GET_JOBSEEKER_DASHBOARD_REQUEST = 'GET_JOBSEEKER_DASHBOARD_REQUEST'
export const GET_JOBSEEKER_DASHBOARD_SUCCESS = 'GET_JOBSEEKER_DASHBOARD_SUCCESS'
export const GET_JOBSEEKER_DASHBOARD_ERROR = 'GET_JOBSEEKER_DASHBOARD_ERROR'

export const GET_RANDOM_TEST_REQUEST = 'GET_RANDOM_TEST_REQUEST'
export const GET_RANDOM_TEST_SUCCESS = 'GET_RANDOM_TEST_SUCCESS'
export const GET_RANDOM_TEST_ERROR = 'GET_RANDOM_TEST_ERROR'

export const GET_TEST_DETAILS_REQUEST = 'GET_TEST_DETAILS_REQUEST'
export const GET_TEST_DETAILS_SUCCESS = 'GET_TEST_DETAILS_SUCCESS'
export const GET_TEST_DETAILS_ERROR = 'GET_TEST_DETAILS_ERROR'

export const SUBMIT_SKILL_TEST_REQUEST = 'SUBMIT_SKILL_TEST_REQUEST'
export const SUBMIT_SKILL_TEST_SUCCESS = 'SUBMIT_SKILL_TEST_SUCCESS'
export const SUBMIT_SKILL_TEST_ERROR = 'SUBMIT_SKILL_TEST_ERROR'

export const CHANGE_SEEKER_PASSWORD_REQUEST = 'CHANGE_SEEKER_PASSWORD_REQUEST'
export const CHANGE_SEEKER_PASSWORD_SUCCESS = 'CHANGE_SEEKER_PASSWORD_SUCCESS'
export const CHANGE_SEEKER_PASSWORD_ERROR = 'CHANGE_SEEKER_PASSWORD_ERROR'

export const ADD_INFO_SEEKER_REQUEST = 'ADD_INFO_SEEKER_REQUEST'
export const ADD_INFO_SEEKER_SUCCESS = 'ADD_INFO_SEEKER_SUCCESS'
export const ADD_INFO_SEEKER_ERROR = 'ADD_INFO_SEEKER_ERROR'

export const GET_SEEKER_INFO_REQUEST = 'GET_SEEKER_INFO_REQUEST'
export const GET_SEEKER_INFO_SUCCESS = 'GET_SEEKER_INFO_SUCCESS'
export const GET_SEEKER_INFO_ERROR = 'GET_SEEKER_INFO_ERROR'

export const READ_PDF_REQUEST = 'READ_PDF_REQUEST'
export const READ_PDF_SUCCESS = 'READ_PDF_SUCCESS'
export const READ_PDF_ERROR = 'READ_PDF_ERROR'

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST'
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS'
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR'

export const GET_JS_NOTIFICATION_REQUEST = 'GET_JS_NOTIFICATION_REQUEST'
export const GET_JS_NOTIFICATION_SUCCESS = 'GET_JS_NOTIFICATION_SUCCESS'
export const GET_JS_NOTIFICATION_ERROR = 'GET_JS_NOTIFICATION_ERROR'

export const GET_JS_PENDINGS_REQUEST = 'GET_JS_PENDINGS_REQUEST'
export const GET_JS_PENDINGS_SUCCESS = 'GET_JS_PENDINGS_SUCCESS'
export const GET_JS_PENDINGS_ERROR = 'GET_JS_PENDINGS_ERROR'

export const GET_ME_PROFILE_REQUEST = 'GET_ME_PROFILE_REQUEST'
export const GET_ME_PROFILE_SUCCESS = 'GET_ME_PROFILE_SUCCESS'
export const GET_ME_PROFILE_ERROR = 'GET_ME_PROFILE_ERROR'

export const RESPOND_JS_REQUEST = 'RESPOND_JS_REQUEST'
export const RESPOND_JS_SUCCESS = 'RESPOND_JS_SUCCESS'
export const RESPOND_JS_ERROR = 'RESPOND_JS_ERROR'

export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

const actions = {
  // GET JOB SEEKER PROFILE
  getMeSkills: () => async (dispatch) => {
    dispatch({type: GET_ME_SKILLS_REQUEST})
    await getMeSkills().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_ME_SKILLS_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_ME_SKILLS_ERROR,
        })
        notification['error']({
          message: 'Api Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  getRandomSkillTest: (language, level, history) => async (dispatch) => {
    dispatch({type: GET_RANDOM_TEST_REQUEST})
    await getRandomSkillTest(language, level).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_RANDOM_TEST_SUCCESS,
        })
        console.log(res?.data)
        history.push(`/js/skill-test/${res?.data?.data}`)
      } else {
        dispatch({type: GET_RANDOM_TEST_ERROR})
        notification['error']({
          message: 'Api Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  getTestDetails: (testId, history) => async (dispatch) => {
    dispatch({type: GET_TEST_DETAILS_REQUEST})
    await getTestDetails(testId).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_TEST_DETAILS_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({type: GET_TEST_DETAILS_ERROR})
        notification['error']({
          message: 'Api Error',
          description: res?.data?.message || res?.message,
        })
        history.push('/js/skill-test')
      }
    })
  },

  submitSkillTest: (testId, data, lvl, history) => async (dispatch) => {
    dispatch({type: SUBMIT_SKILL_TEST_REQUEST})
    await submitSkillTest(testId, data).then((res) => {
      if (res?.status === 200) {
        if (res?.data?.status === 1) {
          dispatch({
            type: SUBMIT_SKILL_TEST_SUCCESS,
            payload: {
              data: res?.data,
            },
          })
          history.push(`/js/skill-test/congratulations/${data?.lang}/${lvl}`)
        } else {
          dispatch({
            type: SUBMIT_SKILL_TEST_SUCCESS,
            payload: {
              data: res?.data,
            },
          })
        }
      } else {
        dispatch({type: SUBMIT_SKILL_TEST_ERROR})
        notification['error']({
          message: 'Api Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // CHANGE JOB SEEKER PASSWORD
  changeJobSeekerPassword: (data, setState) => async (dispatch) => {
    dispatch({type: CHANGE_SEEKER_PASSWORD_REQUEST})
    await changeJobSeekerPassword(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: CHANGE_SEEKER_PASSWORD_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
        notification['success']({
          message: 'Password Changed',
          description: res?.data?.message || res?.message,
        })
        if (setState) setState(false)
      } else {
        dispatch({
          type: CHANGE_SEEKER_PASSWORD_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  jobSeekerAddInfo: (data, history) => async (dispatch) => {
    dispatch({type: ADD_INFO_SEEKER_REQUEST})
    await jobSeekerAddInfo(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: ADD_INFO_SEEKER_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
        notification['success']({
          message: 'Info Updated',
          description: res?.data?.message || res?.message,
        })
        history.push('/js/dashboard')
      } else {
        dispatch({
          type: ADD_INFO_SEEKER_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  jobSeekerGetInfo: () => async (dispatch) => {
    dispatch({type: GET_SEEKER_INFO_REQUEST})
    await jobSeekerGetInfo().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_SEEKER_INFO_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_SEEKER_INFO_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  getJobSeekerDashboard: () => async (dispatch) => {
    dispatch({type: GET_JOBSEEKER_DASHBOARD_REQUEST})
    await getJobSeekerDashboard().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_JOBSEEKER_DASHBOARD_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_JOBSEEKER_DASHBOARD_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  readPdf: (data) => async (dispatch) => {
    dispatch({type: READ_PDF_REQUEST})
    await readPdf(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: READ_PDF_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: READ_PDF_ERROR,
        })
        notification['error']({
          message: 'Upload PDF Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  editJobSeekerProfile: (data) => async (dispatch) => {
    dispatch({type: EDIT_PROFILE_REQUEST})
    await editJobSeekerProfile(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: EDIT_PROFILE_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        dispatch(actions.getMeProfile())
        notification['success']({
          message: 'Profile Updated',
          description: res?.data?.message || res?.message,
        })
      } else {
        dispatch({
          type: EDIT_PROFILE_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // GET JOB SEEKER PROFILE
  getMeProfile: () => async (dispatch) => {
    dispatch({type: GET_ME_PROFILE_REQUEST})
    await getMeProfile().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_ME_PROFILE_SUCCESS,
          payload: {
            data: res?.data?.data,
            notificationCount: res?.data?.notificationCount,
            message: res?.data?.message,
          },
        })
      } else {
        dispatch({
          type: GET_ME_PROFILE_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  getNotifications: (withLoading) => async (dispatch) => {
    dispatch({type: GET_JS_NOTIFICATION_REQUEST, payload: {withLoading}})
    await getJSNotifications().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_JS_NOTIFICATION_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_JS_NOTIFICATION_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },
  getPendings: (withLoading) => async (dispatch) => {
    dispatch({type: GET_JS_PENDINGS_REQUEST, payload: {withLoading}})
    await getJSPendings().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_JS_PENDINGS_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_JS_PENDINGS_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  respondToRequest: (data) => async (dispatch) => {
    dispatch({
      type: RESPOND_JS_REQUEST,
    })
    await jsRespond(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: RESPOND_JS_SUCCESS,
        })
        notification['success']({
          message: 'Success',
          description: res?.data?.message,
        })
        dispatch(actions.getPendings(false))
      } else {
        dispatch({
          type: RESPOND_JS_ERROR,
        })
        notification['error']({
          message: 'Request Error',
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
