import React, {Suspense, lazy} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

// LAYOUTS
import AuthLayout from './layouts/authLayout/AuthLayout'
import DefaultLayout from './layouts/defaultLayout/DefaultLayout'

// COMPONENTS
import Loading from './components/loading/Loading'

// Pages
const ErrorPage = lazy(() => import('./pages/error/ErrorPage'))
const LandingPage = lazy(() => import('./pages/home/LandingPage'))

// Login
const LoginJS = lazy(() => import('./pages/auth/seeker/Login'))
const LoginRC = lazy(() => import('./pages/auth/recruiter/Login'))

// Signup
const SignupJobSeeker = lazy(() => import('./pages/auth/seeker/SignupJobSeeker'))
const SignupRecruiter = lazy(() => import('./pages/auth/recruiter/SignupRecruiter'))

// Verify
const EmailVerifyJS = lazy(() => import('./pages/auth/seeker/EmailVerify'))
const EmailVerifyRC = lazy(() => import('./pages/auth/recruiter/EmailVerify'))

// Verify resend
const ResendEmailJS = lazy(() => import('./pages/auth/seeker/ResendEmail'))
const ResendEmailRC = lazy(() => import('./pages/auth/recruiter/ResendEmail'))

// Password reset
const ForgotPasswordRC = lazy(() => import('./pages/auth/recruiter/ForgotPassword'))
const ResetPasswordRC = lazy(() => import('./pages/auth/recruiter/ResetPassword'))

const ForgotPasswordJS = lazy(() => import('./pages/auth/seeker/ForgotPassword'))
const ResetPasswordJS = lazy(() => import('./pages/auth/seeker/ResetPassword'))

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/error">
          <ErrorPage />
        </Route>
        {/* Landing page*/}
        <Route exact path="/" render={() => <Redirect to="/welcome" />} />
        <AuthLayout exact path="/welcome" component={LandingPage} />

        {/* JOB SEEKER */}
        {/* Login and Signup*/}
        <AuthLayout exact path="/js/login" component={LoginJS} />
        <AuthLayout exact path="/js/register" component={SignupJobSeeker} />

        {/* verify and resend email */}
        <AuthLayout exact path="/js/register/verify/:token" component={EmailVerifyJS} />
        <AuthLayout exact path="/js/register/resend/:email" component={ResendEmailJS} />

        {/* password reset */}
        <AuthLayout exact path="/js/password/forgot" component={ForgotPasswordJS} />
        <AuthLayout exact path="/js/password/reset/:token" component={ResetPasswordJS} />

        {/* JOB RECRUITER */}
        {/* Login and Signup*/}
        <AuthLayout exact path="/rc/login" component={LoginRC} />
        <AuthLayout exact path="/rc/register" component={SignupRecruiter} />

        {/* verify and resend email */}
        <AuthLayout exact path="/rc/register/verify/:token" component={EmailVerifyRC} />
        <AuthLayout exact path="/rc/register/resend/:email" component={ResendEmailRC} />

        {/* password reset */}
        <AuthLayout exact path="/rc/password/forgot" component={ForgotPasswordRC} />
        <AuthLayout exact path="/rc/password/reset/:token" component={ResetPasswordRC} />

        <Route path="/" render={(props) => <DefaultLayout {...props} />} />

        {/* ERROR */}
        <Route>
          <Redirect to="/error" />
        </Route>
      </Switch>
    </Suspense>
  )
}

// Redux
const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(App)
