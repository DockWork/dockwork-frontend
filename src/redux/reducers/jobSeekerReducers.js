import {
  GET_ME_SKILLS_REQUEST,
  GET_ME_SKILLS_SUCCESS,
  GET_ME_SKILLS_ERROR,
  GET_TEST_DETAILS_REQUEST,
  GET_TEST_DETAILS_SUCCESS,
  GET_TEST_DETAILS_ERROR,
  SUBMIT_SKILL_TEST_REQUEST,
  SUBMIT_SKILL_TEST_SUCCESS,
  SUBMIT_SKILL_TEST_ERROR,
  CHANGE_SEEKER_PASSWORD_REQUEST,
  CHANGE_SEEKER_PASSWORD_SUCCESS,
  CHANGE_SEEKER_PASSWORD_ERROR,
  ADD_INFO_SEEKER_REQUEST,
  ADD_INFO_SEEKER_SUCCESS,
  ADD_INFO_SEEKER_ERROR,
  GET_SEEKER_INFO_REQUEST,
  GET_SEEKER_INFO_SUCCESS,
  GET_SEEKER_INFO_ERROR,
  GET_JOBSEEKER_DASHBOARD_REQUEST,
  GET_JOBSEEKER_DASHBOARD_SUCCESS,
  GET_JOBSEEKER_DASHBOARD_ERROR,
  READ_PDF_REQUEST,
  READ_PDF_SUCCESS,
  READ_PDF_ERROR,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  GET_JS_NOTIFICATION_REQUEST,
  GET_JS_NOTIFICATION_SUCCESS,
  GET_JS_NOTIFICATION_ERROR,
  GET_JS_PENDINGS_REQUEST,
  GET_JS_PENDINGS_SUCCESS,
  GET_JS_PENDINGS_ERROR,
  GET_ME_PROFILE_REQUEST,
  GET_ME_PROFILE_SUCCESS,
  GET_ME_PROFILE_ERROR,
  RESPOND_JS_REQUEST,
  RESPOND_JS_SUCCESS,
  RESPOND_JS_ERROR,
} from '../actions/jobSeekerActions'

const initialState = {
  getMeSkillsData: {},
  getMeSkillsLoading: false,

  testDetailsData: {},
  testDetailsLoading: false,

  skillTestResult: {},
  skillTestLoading: false,

  changePasswordData: {},
  changePasswordLoading: false,

  addInfoData: {},
  addInfoLoading: false,

  seekerExpInfoData: {},
  seekerExpInfoLoading: false,

  seekerDashboardData: {},
  seekerDashboardLoading: false,

  pdfUploadData: {},
  pdfUploadLoading: false,

  editProfileData: {},
  editProfileLoading: false,

  notificationData: [],
  notificationLoading: false,

  pendingData: [],
  pendingLoading: false,

  profileData: [],
  profileLoading: false,
  notificationCount: 0,

  jsRespondLoading: false,
}

function jobSeeker(state = initialState, action) {
  switch (action.type) {
    case GET_ME_SKILLS_REQUEST:
      return Object.assign({}, state, {
        getMeSkillsData: {},
        getMeSkillsLoading: true,
      })
    case GET_ME_SKILLS_SUCCESS:
      console.log(action.payload.data)
      return Object.assign({}, state, {
        getMeSkillsData: action.payload.data?.skills || {},
        getMeSkillsLoading: false,
      })
    case GET_ME_SKILLS_ERROR:
      return Object.assign({}, state, {
        getMeSkillsData: {},
        getMeSkillsLoading: false,
      })

    case GET_TEST_DETAILS_REQUEST:
      return Object.assign({}, state, {
        testDetailsData: {},
        testDetailsLoading: true,
      })
    case GET_TEST_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        testDetailsData: action.payload.data,
        testDetailsLoading: false,
      })
    case GET_TEST_DETAILS_ERROR:
      return Object.assign({}, state, {
        testDetailsData: {},
        testDetailsLoading: false,
      })

    case SUBMIT_SKILL_TEST_REQUEST:
      return Object.assign({}, state, {
        skillTestResult: {},
        skillTestLoading: true,
      })
    case SUBMIT_SKILL_TEST_SUCCESS:
      return Object.assign({}, state, {
        skillTestResult: action.payload.data,
        skillTestLoading: false,
      })
    case SUBMIT_SKILL_TEST_ERROR:
      return Object.assign({}, state, {
        skillTestResult: {},
        skillTestLoading: false,
      })

    case CHANGE_SEEKER_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        changePasswordData: {},
        changePasswordLoading: true,
      })
    case CHANGE_SEEKER_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        changePasswordData: action.payload.data,
        changePasswordLoading: false,
      })
    case CHANGE_SEEKER_PASSWORD_ERROR:
      return Object.assign({}, state, {
        changePasswordData: {},
        changePasswordLoading: false,
      })

    case ADD_INFO_SEEKER_REQUEST:
      return Object.assign({}, state, {
        addInfoData: {},
        addInfoLoading: true,
      })
    case ADD_INFO_SEEKER_SUCCESS:
      return Object.assign({}, state, {
        addInfoData: action.payload.data,
        addInfoLoading: false,
      })
    case ADD_INFO_SEEKER_ERROR:
      return Object.assign({}, state, {
        addInfoData: {},
        addInfoLoading: false,
      })

    case GET_SEEKER_INFO_REQUEST:
      return Object.assign({}, state, {
        seekerExpInfoData: {},
        seekerExpInfoLoading: true,
      })
    case GET_SEEKER_INFO_SUCCESS:
      return Object.assign({}, state, {
        seekerExpInfoData: action.payload.data,
        seekerExpInfoLoading: false,
      })
    case GET_SEEKER_INFO_ERROR:
      return Object.assign({}, state, {
        seekerExpInfoData: {},
        seekerExpInfoLoading: false,
      })

    case GET_JOBSEEKER_DASHBOARD_REQUEST:
      return Object.assign({}, state, {
        seekerDashboardData: {},
        seekerDashboardLoading: true,
      })
    case GET_JOBSEEKER_DASHBOARD_SUCCESS:
      return Object.assign({}, state, {
        seekerDashboardData: action.payload.data,
        seekerDashboardLoading: false,
      })
    case GET_JOBSEEKER_DASHBOARD_ERROR:
      return Object.assign({}, state, {
        seekerDashboardData: {},
        seekerDashboardLoading: false,
      })

    case READ_PDF_REQUEST:
      return Object.assign({}, state, {
        pdfUploadData: {},
        pdfUploadLoading: true,
      })
    case READ_PDF_SUCCESS:
      return Object.assign({}, state, {
        pdfUploadData: action.payload.data,
        pdfUploadLoading: false,
      })
    case READ_PDF_ERROR:
      return Object.assign({}, state, {
        pdfUploadData: {},
        pdfUploadLoading: false,
      })

    case EDIT_PROFILE_REQUEST:
      return Object.assign({}, state, {
        editProfileData: {},
        editProfileLoading: true,
      })
    case EDIT_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        editProfileData: action.payload.data,
        editProfileLoading: false,
      })
    case EDIT_PROFILE_ERROR:
      return Object.assign({}, state, {
        editProfileData: {},
        editProfileLoading: false,
      })

    case GET_JS_NOTIFICATION_REQUEST:
      return Object.assign({}, state, {
        notificationLoading: action.payload.withLoading,
      })
    case GET_JS_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        notificationData: action.payload.data,
        notificationLoading: false,
        notificationCount: 0,
      })
    case GET_JS_NOTIFICATION_ERROR:
      return Object.assign({}, state, {
        notificationData: [],
        notificationLoading: false,
      })

    case GET_JS_PENDINGS_REQUEST:
      return Object.assign({}, state, {
        pendingsLoading: action.payload.withLoading,
      })
    case GET_JS_PENDINGS_SUCCESS:
      return Object.assign({}, state, {
        pendingsData: action.payload.data,
        pendingsLoading: false,
      })
    case GET_JS_PENDINGS_ERROR:
      return Object.assign({}, state, {
        pendingsData: [],
        pendingsLoading: false,
      })

    case GET_ME_PROFILE_REQUEST:
      return Object.assign({}, state, {
        profileLoading: true,
        profileData: [],
        notificationCount: 0,
      })
    case GET_ME_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profileLoading: false,
        profileData: action.payload.data,
        notificationCount: action.payload.notificationCount,
      })
    case GET_ME_PROFILE_ERROR:
      return Object.assign({}, state, {
        profileLoading: false,
        profileData: [],
        notificationCount: 0,
      })

    case RESPOND_JS_REQUEST:
      return Object.assign({}, state, {
        jsRespondLoading: true,
      })

    case RESPOND_JS_SUCCESS:
    case RESPOND_JS_ERROR:
      return Object.assign({}, state, {
        jsRespondLoading: false,
      })

    default:
      return state
  }
}

export default jobSeeker
