import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Avatar, Modal, Button} from 'antd'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

import {checkAvatar} from '../../utils/checkAvatar'
import ButtonControl from '../../components/button/ButtonControl'
import {dateFormat} from '../../utils/InputFormats'
import {TextInput, DatePickerInput} from '../../components/FormInputs/CreateFormInput'

import './Profile.css'

// REDUX
import recruiterActions from '../../redux/actions/recruiterActions'

export const RCProfile = ({
  profileData,
  recruiterChangePassword,
  changePasswordLoading,
  recruiterEditProfile,
  editProfileLoading,
}) => {
  const changePassSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, 'Invalid password')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match with your new password')
      .required('Confirm password is required'),
  })

  const [isModalVisible, setIsModalVisible] = useState(false)

  const values = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  const editSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    dob: Yup.string().required('Date of birth is required'),
  })

  const editValues = {
    name: profileData?.name || '',
    dob: moment(profileData?.dob).format(dateFormat) || '',
  }

  const handleChangePass = (values) => {
    if (profileData?.type === 'JobSeeker')
      recruiterChangePassword({oldPassword: values.oldPassword, newPassword: values.newPassword}, setIsModalVisible)
  }

  const handleEdit = (values) => {
    recruiterEditProfile(values)
  }

  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <Row>
          <Col span={24}>
            <div className="top-profile-info">
              <Avatar
                shape="square"
                icon={<img src={checkAvatar(profileData?.avatar)} alt="blue fish" />}
                size={70}
                style={{background: 'var(--orange)'}}
              />
              <div className="profile-info">
                <span className="profile-name">{profileData?.name}</span>
                <span className="profile-email">
                  {profileData?.email}
                  <span className="profile-spliter">/</span>
                  {profileData?.gender?.charAt(0).toUpperCase() + profileData?.gender?.slice(1)}
                </span>
              </div>
            </div>
          </Col>
        </Row>

        <Formik initialValues={editValues} validationSchema={editSchema} enableReinitialize onSubmit={handleEdit}>
          {(formik) => (
            <Form>
              <Row gutter={[20, 10]}>
                <Col span={8}>
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
                </Col>
                <Col span={8}>
                  <Field
                    component={DatePickerInput}
                    name="dob"
                    validate={formik}
                    height="50px"
                    outlined={false}
                    disabled={false}
                    readOnly={false}
                    width="100%"
                    maxDate={moment().endOf('day')}
                    format={dateFormat}
                  />
                </Col>
              </Row>
              <Row gutter={[20, 10]}>
                <Col>
                  <ButtonControl
                    width={'max-content'}
                    value={'Save'}
                    type="primary"
                    height={'50px'}
                    htmlType="submit"
                    isLoading={editProfileLoading}
                    isDisabled={!formik.dirty}
                  />
                </Col>
                <Col>
                  <ButtonControl
                    width={'max-content'}
                    value={'Change password'}
                    height={'50px'}
                    htmlType="button"
                    isLoading={false}
                    handleClick={() => setIsModalVisible(true)}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <Formik initialValues={values} validationSchema={changePassSchema} onSubmit={handleChangePass}>
          {(formik) => (
            <>
              <Modal
                title="Change Password"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose={true}
                maskClosable={false}
                footer={[
                  <Button key="back" onClick={() => setIsModalVisible(false)}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" loading={changePasswordLoading} onClick={formik.handleSubmit}>
                    Submit
                  </Button>,
                ]}
              >
                <Form>
                  <Field
                    component={TextInput}
                    name="oldPassword"
                    placeholder="Old password"
                    type="password"
                    validate={formik}
                    height="50px"
                    outlined={false}
                    disabled={false}
                    readOnly={false}
                  />
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
                </Form>
              </Modal>
            </>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  profileData: state.recruiter.profileData,

  changePasswordLoading: state.recruiter.changePasswordLoading,
  editProfileLoading: state.recruiter.editProfileLoading,
})
const mapDispatchToProps = (dispatch) => ({
  recruiterChangePassword: (data, state) => dispatch(recruiterActions.recruiterChangePassword(data, state)),
  recruiterEditProfile: (data) => dispatch(recruiterActions.recruiterEditProfile(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RCProfile)
