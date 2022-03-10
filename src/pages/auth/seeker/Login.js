import React from 'react'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import {TextInput} from '../../../components/FormInputs/CreateFormInput'
import ButtonControl from '../../../components/button/ButtonControl'
import authActions from '../../../redux/actions/authActions'

// CSS
import '../Auth.css'

const Login = ({login, loginLoading}) => {
  const history = useHistory()
  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })
  const values = {
    email: '',
    password: '',
  }

  const handleLogin = (values) => {
    login({email: values.email, password: values.password, type: 'JobSeeker'}, history, 'js')
  }

  return (
    <Row justify="center">
      <Col span={8}>
        <div className="main-title">Login as Job Seeker</div>
        <div className="login-card">
          <Formik initialValues={values} validationSchema={loginSchema} onSubmit={handleLogin}>
            {(formik) => (
              <Form>
                <Field
                  component={TextInput}
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  validate={formik}
                  height="50px"
                  outlined={false}
                  disabled={false}
                  readOnly={false}
                />
                <Field
                  component={TextInput}
                  name="password"
                  placeholder="Password"
                  type="password"
                  validate={formik}
                  height="50px"
                  outlined={false}
                  disabled={false}
                  readOnly={false}
                />
                <Row justify="end">
                  <Col>
                    <div className="auth-link-holder">
                      <Link to="/js/password/forgot">Forgot your password?</Link>
                    </div>
                  </Col>
                </Row>
                <Row justify="end">
                  <Col>
                    <ButtonControl
                      width={'max-content'}
                      value={'Login'}
                      height={'50px'}
                      type="primary"
                      htmlType="submit"
                      isLoading={loginLoading}
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        <div className="auth-link-holder">
          Looking for a job? <Link to="/js/register">Sign up as job seeker!</Link>
        </div>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  loginLoading: state.auth.loginLoading,
})

const mapDispatchToProps = (dispatch) => ({
  login: (data, history, type) => dispatch(authActions.login(data, history, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
