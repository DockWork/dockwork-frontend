import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import {TextInput} from '../../../components/FormInputs/CreateFormInput'
import ButtonControl from '../../../components/button/ButtonControl'
import authActions from '../../../redux/actions/authActions'

import '../Auth.css'

const ForgotPassword = ({passwordResetRequest, passwordResetLoading}) => {
  const history = useHistory()
  const forgotPassSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
  })
  const values = {
    email: '',
  }

  const handleForgotPass = (values) => {
    passwordResetRequest({email: values.email, type: 'JobSeeker'}, history, 'js')
  }

  return (
    <Row justify="center">
      <Col xl={{span: 8}} md={{span: 12}} xs={{span: 22}}>
        <div className="main-title">Forgot Password</div>
        <div className="auth-sub-title">Enter your account email to reset your password</div>
        <div className="login-card">
          <Formik initialValues={values} validationSchema={forgotPassSchema} onSubmit={handleForgotPass}>
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
                <Row justify="end">
                  <Col>
                    <ButtonControl
                      width={'max-width'}
                      value="Send email"
                      height={'50px'}
                      type="primary"
                      htmlType="submit"
                      isLoading={passwordResetLoading}
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  passwordResetLoading: state.auth.passwordResetLoading,
})

const mapDispatchToProps = (dispatch) => ({
  passwordResetRequest: (data, history, type) => dispatch(authActions.passwordResetRequest(data, history, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
