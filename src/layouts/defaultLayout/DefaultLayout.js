import React, {lazy} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'

/* COMPONENTS */
import Header from './Header'
import Footer from './Footer'

/* Routes */
import UserRoute from '../../routers/UserRoute'

// Profile
const JSProfile = lazy(() => import('../../pages/profile/JSProfile'))
const RCProfile = lazy(() => import('../../pages/profile/RCProfile'))

// Dashboard
const JobSeekerDashboard = lazy(() => import('../../pages/jobSeeker/JobSeekerDashboard'))
const JSExperience = lazy(() => import('../../pages/jobSeeker/JSExperience'))

const RCDashboard = lazy(() => import('../../pages/recruiter/RCDashboard'))
const AdvancedSearch = lazy(() => import('../../pages/recruiter/AdvancedSearch'))
const SearchResults = lazy(() => import('../../pages/recruiter/SearchResults'))

// Personality test
const PersonalityTest = lazy(() => import('../../pages/personalityTest/PersonalityTest'))

// Skill test
const SkillTest = lazy(() => import('../../pages/skillTest/SkillTest'))
const Editor = lazy(() => import('../../pages/skillTest/Editor'))
const Congratulation = lazy(() => import('../../pages/skillTest/Congratulation'))

const Notification = lazy(() => import('../../pages/notification/Notification'))

function DefaultLayout() {
  return (
    <div className="pages-container">
      <div>
        <Header />
        <Switch>
          {/* JOB SEEKER */}
          <Route exact path="/" render={() => <Redirect to="/js/dashboard" />} />

          <UserRoute exact path="/js/profile" component={JSProfile} />
          <UserRoute exact path="/js/profile/experience" component={JSExperience} />

          <UserRoute exact path="/js/dashboard" component={JobSeekerDashboard} />

          <UserRoute exact path="/js/presonality-test" component={PersonalityTest} />

          <UserRoute exact path="/js/skill-test/" component={SkillTest} />
          <UserRoute exact path="/js/skill-test/:testId" component={Editor} />
          <UserRoute exact path="/js/skill-test/congratulations/:language/:level" component={Congratulation} />

          <UserRoute exact path="/js/notification/:page" component={Notification} />

          {/* RECRUITER */}
          <UserRoute exact path="/rc/profile" component={RCProfile} />

          <UserRoute exact path="/rc/dashboard" component={RCDashboard} />

          <UserRoute exact path="/rc/search" component={AdvancedSearch} />
          <UserRoute exact path="/rc/search/:searchId" component={SearchResults} />
          <UserRoute exact path="/rc/notification/:page" component={Notification} />

          {/* error route */}
          <Route render={() => <Redirect to="/error" />} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps)(withRouter(DefaultLayout))
