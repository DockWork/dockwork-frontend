import {combineReducers} from 'redux'
import auth from './authReducers'
import personality from './personalityReducers'
import jobSeeker from './jobSeekerReducers'
import recruiter from './recruiterReducers'

const reducers = combineReducers({
  auth,

  personality,
  jobSeeker,
  recruiter,
})

export default reducers
