import {PrivateApiCall, PublicApiCall} from './interceptors'

const errorCatch = (error) => {
  console.log('ERROR API', error, error?.response)
  if (error.response) {
    if (error.reponse?.data) {
      return error.response?.data
    }
    return error.response
  } else {
    return error
  }
}

/** ******************************************************************************************* **/
/** ************************************** AUTH *********************************************** **/
/** ******************************************************************************************* **/
async function login(data) {
  return await PublicApiCall.post('/auth/login', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function register(data) {
  return await PublicApiCall.post('/auth/register', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function verify(data) {
  return await PublicApiCall.post('/auth/register/verify', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function resendVerify(data) {
  return await PublicApiCall.post('/auth/register/resend', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function passwordResetRequest(data) {
  return await PublicApiCall.post('/auth/password/request', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function passwordResetSubmit(data) {
  return await PublicApiCall.post('/auth/password/submit', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

/** ******************************************************************************************* **/
/** *********************************** COMPANY *********************************************** **/
/** ******************************************************************************************* **/
async function getCompanyProfile() {
  return await PrivateApiCall.get('/company/profile')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function recruiterEditProfile(data) {
  return await PrivateApiCall.put('/company/profile', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function recruiterChangePassword(data) {
  return await PrivateApiCall.post('/company/profile/password', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function matchSearch(data) {
  return await PrivateApiCall.post('/company/match', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getSearchById(uuid) {
  return await PrivateApiCall.get(`/company/match/${uuid}`)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getCNotifications() {
  return await PrivateApiCall.get('/company/notification')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getCPendings() {
  return await PrivateApiCall.get('/company/pendingRequests')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function cRespond(data) {
  return await PrivateApiCall.put('/company/respond', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function requestMeeting(data) {
  return await PrivateApiCall.post('/company/requestMeeting', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getRecruiterDashboard(date) {
  return await PrivateApiCall.get(`/company/dashboard?${date ? 'month=' + date : ''}`)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

/** ******************************************************************************************* **/
/** *********************************** JOBSEEKER ********************************************* **/
/** ******************************************************************************************* **/
async function getMeProfile() {
  return await PrivateApiCall.get('/jobSeeker/profile')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getRandomSkillTest(language, level) {
  return await PrivateApiCall.get(`/jobSeeker/randomTest/${language}/${level}`)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getTestDetails(testId) {
  return await PrivateApiCall.get(`/jobSeeker/takeSkillTest/${testId}`)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function submitSkillTest(testId, data) {
  return await PrivateApiCall.post(`/jobSeeker/takeSkillTest/${testId}`, data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}
async function getMeSkills() {
  return await PrivateApiCall.get('/jobSeeker/skills')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function changeJobSeekerPassword(data) {
  return await PrivateApiCall.post('/jobSeeker/profile/password', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function editJobSeekerProfile(data) {
  return await PrivateApiCall.put('/jobSeeker/profile', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function jobSeekerAddInfo(data) {
  return await PrivateApiCall.post('/jobSeeker/extraInfo', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function jobSeekerGetInfo() {
  return await PrivateApiCall.get('/jobSeeker/extraInfo')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getJobSeekerDashboard() {
  return await PrivateApiCall.get('/jobSeeker/dashboard')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function readPdf(data) {
  return await PrivateApiCall.post('/jobSeeker/pdfRead', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getJSNotifications() {
  return await PrivateApiCall.get('/jobSeeker/notification')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function jsReadNotifiaction(data) {
  return await PrivateApiCall.put('/jobSeeker/notification', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function getJSPendings() {
  return await PrivateApiCall.get('/jobSeeker/pendingRequests')
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

async function jsRespond(data) {
  return await PrivateApiCall.put('/jobSeeker/respond', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

/** ******************************************************************************************* **/
/** ******************************* PERSONALITY TEST ****************************************** **/
/** ******************************************************************************************* **/
async function personalityTest(data) {
  return await PrivateApiCall.post('/jobSeeker/personalityTest', data)
    .then((res) => res)
    .catch((err) => errorCatch(err))
}

export {
  // AUTH
  login,
  register,
  verify,
  resendVerify,
  passwordResetRequest,
  passwordResetSubmit,
  // COMPANY
  getCompanyProfile,
  recruiterEditProfile,
  recruiterChangePassword,
  matchSearch,
  getSearchById,
  getCNotifications,
  getCPendings,
  cRespond,
  getRecruiterDashboard,
  requestMeeting,
  // JOBSEEKER
  getMeProfile,
  editJobSeekerProfile,
  getJobSeekerDashboard,
  getRandomSkillTest,
  getTestDetails,
  getMeSkills,
  submitSkillTest,
  changeJobSeekerPassword,
  jobSeekerAddInfo,
  jobSeekerGetInfo,
  readPdf,
  getJSNotifications,
  getJSPendings,
  jsReadNotifiaction,
  jsRespond,
  // PERSONALITY TEST
  personalityTest,
}
