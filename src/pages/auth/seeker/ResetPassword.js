import React from 'react'
import {connect} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import {TextInput} from '../../../components/FormInputs/CreateFormInput'
import ButtonControl from '../../../components/button/ButtonControl'
import authActions from '../../../redux/actions/authActions'

// CSS
import '../Auth.css'

const ResetPassword = ({passwordSubmitLoading, passwordResetSubmit}) => {
  const history = useHistory()
  const params = useParams()

  const resetPassSchema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Invalid password')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match with your new password')
      .required('Confirm password is required'),
  })
  const values = {
    newPassword: '',
    confirmPassword: '',
  }

  const handleResetPass = (values) => {
    passwordResetSubmit({validateToken: params.token, newPassword: values.newPassword}, history, 'js')
  }

  return (
    <Row justify="center">
      <Col span={8}>
        <div className="main-title">Reset Password</div>
        <div className="auth-sub-title">Enter your new password and confirm it</div>
        <div className="login-card">
          <Formik initialValues={values} validationSchema={resetPassSchema} onSubmit={handleResetPass}>
            {(formik) => (
              <Form>
                <Field
                  component={TextInput}
                  name="newPassword"
                  placeholder="New password"
                  type="password"
                  validate={formik}
                  height="50px"
                  outlined={false}
                  disabled={false}
                  readOnly={false}
                  extra="Use 8 or more characters with a mix of letters, numbers and
                  symbols."
                />
                <Field
                  component={TextInput}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  validate={formik}
                  height="50px"
                  outlined={false}
                  disabled={false}
                  readOnly={false}
                  extra="Password should be identical to the new password."
                />
                <Row justify="end">
                  <Col>
                    <ButtonControl
                      width={'max-width'}
                      value={'Reset password'}
                      height={'50px'}
                      type="primary"
                      htmlType="submit"
                      isLoading={passwordSubmitLoading}
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
  passwordSubmitLoading: state.auth.passwordSubmitLoading,
})

const mapDispatchToProps = (dispatch) => ({
  passwordResetSubmit: (data, history, type) => dispatch(authActions.passwordResetSubmit(data, history, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
