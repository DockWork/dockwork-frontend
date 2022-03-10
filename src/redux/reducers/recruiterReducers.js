import {
  EDIT_COMPANY_PROFILE_REQUEST,
  EDIT_COMPANY_PROFILE_SUCCESS,
  EDIT_COMPANY_PROFILE_ERROR,
  CHANGE_RECRUITER_PASSWORD_REQUEST,
  CHANGE_RECRUITER_PASSWORD_SUCCESS,
  CHANGE_RECRUITER_PASSWORD_ERROR,
  GET_COMPANY_PROFILE_REQUEST,
  GET_COMPANY_PROFILE_SUCCESS,
  GET_COMPANY_PROFILE_ERROR,
  MATCH_SEARCH_REQUEST,
  MATCH_SEARCH_SUCCESS,
  MATCH_SEARCH_ERROR,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_ERROR,
  GET_C_NOTIFICATION_REQUEST,
  GET_C_NOTIFICATION_SUCCESS,
  GET_C_NOTIFICATION_ERROR,
  GET_C_PENDINGS_REQUEST,
  GET_C_PENDINGS_SUCCESS,
  GET_C_PENDINGS_ERROR,
  RESPOND_C_REQUEST,
  RESPOND_C_SUCCESS,
  RESPOND_C_ERROR,
  RECRUITER_DASHBOARD_REQUEST,
  RECRUITER_DASHBOARD_SUCCESS,
  RECRUITER_DASHBOARD_ERROR,
  REQUEST_MEETING_REQUEST,
  REQUEST_MEETING_SUCCESS,
  REQUEST_MEETING_ERROR,
} from '../actions/recruiterActions'

const initialState = {
  changePasswordData: {},
  changePasswordLoading: false,

  editProfileData: {},
  editProfileLoading: false,

  profileData: {},
  profileLoading: false,
  notificationCount: 0,

  matchSearchData: {},
  matchSearchLoading: false,

  searchResData: {},
  searchResLoading: false,

  notificationData: [],
  notificationLoading: false,

  pendingsData: [],
  pendingsLoading: false,

  cRespondLoading: false,

  recruiterDashboardData: {},
  recruiterDashboardLoading: false,

  requestMeetingData: {},
  requestMeetingLoading: false,
}

function recruiter(state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_PROFILE_REQUEST:
      return Object.assign({}, state, {
        profileLoading: true,
        profileData: {},
        notificationCount: 0,
      })
    case GET_COMPANY_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profileLoading: false,
        profileData: action.payload.data,
        notificationCount: action.payload.notificationCount,
      })
    case GET_COMPANY_PROFILE_ERROR:
      return Object.assign({}, state, {
        profileLoading: false,
        profileData: {},
        notificationCount: 0,
      })

    case EDIT_COMPANY_PROFILE_REQUEST:
      return Object.assign({}, state, {
        editProfileLoading: true,
        editProfileData: {},
      })
    case EDIT_COMPANY_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        editProfileLoading: false,
        editProfileData: action.payload.data,
      })
    case EDIT_COMPANY_PROFILE_ERROR:
      return Object.assign({}, state, {
        editProfileLoading: false,
        editProfileData: {},
      })

    case CHANGE_RECRUITER_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        changePasswordLoading: true,
        changePasswordData: {},
      })
    case CHANGE_RECRUITER_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        changePasswordLoading: false,
        changePasswordData: action.payload.data,
      })
    case CHANGE_RECRUITER_PASSWORD_ERROR:
      return Object.assign({}, state, {
        changePasswordLoading: false,
        changePasswordData: {},
      })

    case MATCH_SEARCH_REQUEST:
      return Object.assign({}, state, {
        matchSearchLoading: true,
        matchSearchData: {},
      })
    case MATCH_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        matchSearchLoading: false,
        matchSearchData: action.payload.data,
      })
    case MATCH_SEARCH_ERROR:
      return Object.assign({}, state, {
        matchSearchLoading: false,
        matchSearchData: {},
      })

    case GET_SEARCH_REQUEST:
      return Object.assign({}, state, {
        searchResLoading: true,
        searchResData: {},
      })
    case GET_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        searchResLoading: false,
        searchResData: action.payload.data,
      })
    case GET_SEARCH_ERROR:
      return Object.assign({}, state, {
        searchResLoading: false,
        searchResData: {},
      })

    case GET_C_NOTIFICATION_REQUEST:
      return Object.assign({}, state, {
        notificationLoading: action.payload.withLoading,
      })
    case GET_C_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        notificationData: action.payload.data,
        notificationLoading: false,
      })
    case GET_C_NOTIFICATION_ERROR:
      return Object.assign({}, state, {
        notificationData: [],
        notificationLoading: false,
      })

    case GET_C_PENDINGS_REQUEST:
      return Object.assign({}, state, {
        pendingsLoading: action.payload.withLoading,
      })
    case GET_C_PENDINGS_SUCCESS:
      return Object.assign({}, state, {
        pendingsData: action.payload.data,
        pendingsLoading: false,
      })
    case GET_C_PENDINGS_ERROR:
      return Object.assign({}, state, {
        pendingsData: [],
        pendingsLoading: false,
      })

    case RESPOND_C_REQUEST:
      return Object.assign({}, state, {
        cRespondLoading: true,
      })
    case RESPOND_C_SUCCESS:
    case RESPOND_C_ERROR:
      return Object.assign({}, state, {
        cRespondLoading: false,
      })

    case RECRUITER_DASHBOARD_REQUEST:
      return Object.assign({}, state, {
        recruiterDashboardLoading: true,
        recruiterDashboardData: {},
      })
    case RECRUITER_DASHBOARD_SUCCESS:
      return Object.assign({}, state, {
        recruiterDashboardLoading: false,
        recruiterDashboardData: action.payload.data,
      })
    case RECRUITER_DASHBOARD_ERROR:
      return Object.assign({}, state, {
        recruiterDashboardLoading: false,
        recruiterDashboardData: {},
      })

    case REQUEST_MEETING_REQUEST:
      return Object.assign({}, state, {
        requestMeetingLoading: true,
        requestMeetingData: {},
      })
    case REQUEST_MEETING_SUCCESS:
      return Object.assign({}, state, {
        requestMeetingLoading: false,
        requestMeetingData: action.payload.data,
      })
    case REQUEST_MEETING_ERROR:
      return Object.assign({}, state, {
        requestMeetingLoading: false,
        requestMeetingData: {},
      })

    default:
      return state
  }
}

export default recruiter
