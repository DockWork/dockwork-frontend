import React from 'react'
import {connect} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {Row, Col, Radio} from 'antd'
import moment from 'moment'
import * as Yup from 'yup'
import {Formik, Field, Form} from 'formik'
import {TextInput, DatePickerInput} from '../../../components/FormInputs/CreateFormInput'
import ButtonControl from '../../../components/button/ButtonControl'
import {dateFormat} from '../../../utils/InputFormats'
import authActions from '../../../redux/actions/authActions'

import '../Auth.css'

export const SignupJobSeeker = ({register, registerLoading}) => {
  const history = useHistory()
  const signupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Invalid password')
      .required('Password is required'),
    gender: Yup.string().ensure().required('Gender is required'),
    dob: Yup.string().required('Date of birth is required'),
  })
  const values = {
    name: '',
    email: '',
    password: '',
    gender: 'male',
    dob: '',
  }

  const handleSignupJobseeker = (values) => {
    register(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        dob: moment(values.dob, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        type: 'JobSeeker',
      },
      history,
      'js',
    )
  }

  return (
    <Row justify="center">
      <Col span={8}>
        <div className="main-title">Sign up</div>
        <div className="auth-sub-title">For Job Seeker</div>
        <div className="login-card">
          <Formik initialValues={values} validationSchema={signupSchema} onSubmit={handleSignupJobseeker}>
            {(formik) => (
              <Form>
                <Field
                  component={TextInput}
                  name="name"
                  placeholder="Name"
                  type="text"
                  validate={formik}
                  height="50px"
                  outlined={false}
                  disabled={false}
                  readOnly={false}
                />
                <Field
                  component={DatePickerInput}
                  name="dob"
                  validate={formik}
                  height="50px"
                  outlined={false}
                  disabled={false}
                  readOnly={false}
                  width="100%"
                  maxDate={moment()}
                  format={dateFormat}
                />
                <Radio.Group
                  onChange={(e) => formik.setFieldValue('gender', e.target.value)}
                  defaultValue={'male'}
                  style={{height: '50px'}}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
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
                  extra="Use 8 or more characters with a mix of letters, numbers and
                                    symbols."
                />
                <Row justify="end">
                  <Col>
                    <ButtonControl
                      width={'max-content'}
                      value={'Sign up'}
                      height={'50px'}
                      type="primary"
                      htmlType="submit"
                      isLoading={registerLoading}
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        <div className="auth-link-holder">
          Already have an account? <Link to="/js/login">Log in!</Link>
        </div>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  registerLoading: state.auth.registerLoading,
})

const mapDispatchToProps = (dispatch) => ({
  register: (data, history, type) => dispatch(authActions.register(data, history, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupJobSeeker)
