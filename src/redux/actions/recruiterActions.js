import {
  recruiterChangePassword,
  recruiterEditProfile,
  getCompanyProfile,
  matchSearch,
  getSearchById,
  getCNotifications,
  getCPendings,
  cRespond,
  getRecruiterDashboard,
  requestMeeting,
} from '../../config/config'

import {notification} from 'antd'

export const GET_COMPANY_PROFILE_REQUEST = 'GET_COMPANY_PROFILE_REQUEST'
export const GET_COMPANY_PROFILE_SUCCESS = 'GET_COMPANY_PROFILE_SUCCESS'
export const GET_COMPANY_PROFILE_ERROR = 'GET_COMPANY_PROFILE_ERROR'

export const EDIT_COMPANY_PROFILE_REQUEST = 'EDIT_COMPANY_PROFILE_REQUEST'
export const EDIT_COMPANY_PROFILE_SUCCESS = 'EDIT_COMPANY_PROFILE_SUCCESS'
export const EDIT_COMPANY_PROFILE_ERROR = 'EDIT_COMPANY_PROFILE_ERROR'

export const CHANGE_RECRUITER_PASSWORD_REQUEST = 'CHANGE_RECRUITER_PASSWORD_REQUEST'
export const CHANGE_RECRUITER_PASSWORD_SUCCESS = 'CHANGE_RECRUITER_PASSWORD_SUCCESS'
export const CHANGE_RECRUITER_PASSWORD_ERROR = 'CHANGE_RECRUITER_PASSWORD_ERROR'

export const MATCH_SEARCH_REQUEST = 'MATCH_SEARCH_REQUEST'
export const MATCH_SEARCH_SUCCESS = 'MATCH_SEARCH_SUCCESS'
export const MATCH_SEARCH_ERROR = 'MATCH_SEARCH_ERROR'

export const GET_SEARCH_REQUEST = 'GET_SEARCH_REQUEST'
export const GET_SEARCH_SUCCESS = 'GET_SEARCH_SUCCESS'
export const GET_SEARCH_ERROR = 'GET_SEARCH_ERROR'

export const GET_C_NOTIFICATION_REQUEST = 'GET_C_NOTIFICATION_REQUEST'
export const GET_C_NOTIFICATION_SUCCESS = 'GET_C_NOTIFICATION_SUCCESS'
export const GET_C_NOTIFICATION_ERROR = 'GET_C_NOTIFICATION_ERROR'

export const GET_C_PENDINGS_REQUEST = 'GET_C_PENDINGS_REQUEST'
export const GET_C_PENDINGS_SUCCESS = 'GET_C_PENDINGS_SUCCESS'
export const GET_C_PENDINGS_ERROR = 'GET_C_PENDINGS_ERROR'

export const RESPOND_C_REQUEST = 'RESPOND_C_REQUEST'
export const RESPOND_C_SUCCESS = 'RESPOND_C_SUCCESS'
export const RESPOND_C_ERROR = 'RESPOND_C_ERROR'

export const RECRUITER_DASHBOARD_REQUEST = 'RECRUITER_DASHBOARD_REQUEST'
export const RECRUITER_DASHBOARD_SUCCESS = 'RECRUITER_DASHBOARD_SUCCESS'
export const RECRUITER_DASHBOARD_ERROR = 'RECRUITER_DASHBOARD_ERROR'

export const REQUEST_MEETING_REQUEST = 'REQUEST_MEETING_REQUEST'
export const REQUEST_MEETING_SUCCESS = 'REQUEST_MEETING_SUCCESS'
export const REQUEST_MEETING_ERROR = 'REQUEST_MEETING_ERROR'

const actions = {
  // GET RECRUITER PROFILE
  getCompanyProfile: () => async (dispatch) => {
    dispatch({type: GET_COMPANY_PROFILE_REQUEST})
    await getCompanyProfile().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_COMPANY_PROFILE_SUCCESS,
          payload: {
            data: res?.data?.data,
            notificationCount: res?.data?.notificationCount,
            message: res?.data?.message,
          },
        })
      } else {
        dispatch({
          type: GET_COMPANY_PROFILE_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // EDIT RECRUITER PROFILE
  recruiterEditProfile: (data) => async (dispatch) => {
    dispatch({type: EDIT_COMPANY_PROFILE_REQUEST})
    await recruiterEditProfile(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: EDIT_COMPANY_PROFILE_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        dispatch(actions.getCompanyProfile())
        notification['success']({
          message: 'Profile Updated',
          description: res?.data?.message || res?.message,
        })
      } else {
        dispatch({
          type: EDIT_COMPANY_PROFILE_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // MATCH SEARCH
  recruiterChangePassword: (data, setState) => async (dispatch) => {
    dispatch({type: CHANGE_RECRUITER_PASSWORD_REQUEST})
    await recruiterChangePassword(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: CHANGE_RECRUITER_PASSWORD_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        if (setState) setState(false)
        notification['success']({
          message: 'Password Changed',
          description: res?.data?.message || res?.message,
        })
      } else {
        dispatch({
          type: CHANGE_RECRUITER_PASSWORD_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // GET SEARCH RESULTS
  matchSearch: (data, history) => async (dispatch) => {
    dispatch({type: MATCH_SEARCH_REQUEST})
    await matchSearch(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: MATCH_SEARCH_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
        history.push(`/rc/search/${res?.data?.data}`)
      } else {
        dispatch({
          type: MATCH_SEARCH_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  // CHANGE RECRUITER PASSWORD
  getSearchById: (data) => async (dispatch) => {
    dispatch({type: GET_SEARCH_REQUEST})
    await getSearchById(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_SEARCH_SUCCESS,
          payload: {
            data: res?.data?.data,
            message: res?.data?.message,
          },
        })
      } else {
        dispatch({
          type: GET_SEARCH_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },
  getNotifications: (withLoading) => async (dispatch) => {
    dispatch({type: GET_C_NOTIFICATION_REQUEST, payload: {withLoading}})
    await getCNotifications().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_C_NOTIFICATION_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_C_NOTIFICATION_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },
  getPendings: (withLoading) => async (dispatch) => {
    dispatch({type: GET_C_PENDINGS_REQUEST, payload: {withLoading}})
    await getCPendings().then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: GET_C_PENDINGS_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: GET_C_PENDINGS_ERROR,
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
      type: RESPOND_C_REQUEST,
    })
    await cRespond(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: RESPOND_C_SUCCESS,
        })
        notification['success']({
          message: 'Success',
          description: res?.data?.message,
        })
        dispatch(actions.getPendings(false))
      } else {
        dispatch({
          type: RESPOND_C_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  getRecruiterDashboard: (date) => async (dispatch) => {
    dispatch({type: RECRUITER_DASHBOARD_REQUEST})
    await getRecruiterDashboard(date).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: RECRUITER_DASHBOARD_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
      } else {
        dispatch({
          type: RECRUITER_DASHBOARD_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },

  requestMeeting: (data, setState) => async (dispatch) => {
    dispatch({type: REQUEST_MEETING_REQUEST})
    await requestMeeting(data).then((res) => {
      if (res?.status === 200) {
        dispatch({
          type: REQUEST_MEETING_SUCCESS,
          payload: {
            data: res?.data?.data,
          },
        })
        if (setState) setState({data: '', open: false})
        notification['success']({
          message: 'Meeting Requested',
          description: res?.data?.message,
        })
      } else {
        dispatch({
          type: REQUEST_MEETING_ERROR,
        })
        notification['error']({
          message: 'Request Error',
          description: res?.data?.message || res?.message,
        })
      }
    })
  },
}

export default actions
