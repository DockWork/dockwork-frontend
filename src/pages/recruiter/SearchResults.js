import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import moment from 'moment'
import {Row, Col, Spin, Avatar, Tooltip, Modal, Button} from 'antd'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {ArrowLeftOutlined} from '@ant-design/icons'
import {TextInput, DatePickerInput, TimePickerInput} from '../../components/FormInputs/CreateFormInput'
import recruiterActions from '../../redux/actions/recruiterActions'
import ButtonControl from '../../components/button/ButtonControl'
import {checkAvatar} from '../../utils/checkAvatar'
import {dateFormat} from '../../utils/InputFormats'

import bronze from '../../assets/icons/medals/bronze.svg'
import silver from '../../assets/icons/medals/silver.svg'
import gold from '../../assets/icons/medals/gold.svg'

import './recruiter.css'

const SearchResults = ({searchResData, searchResLoading, getSearchById, requestMeetingLoading, requestMeeting}) => {
  const params = useParams()
  const history = useHistory()

  const medals = [bronze, silver, gold]

  const [modalState, setModalState] = useState({
    open: false,
    data: '',
  })

  const values = {
    message: '',
    date: '',
    time: '',
    link: '',
    name: '',
  }

  const meetingSchema = Yup.object().shape({
    madeTo: Yup.string(),
    message: Yup.string().required('Message is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    link: Yup.string().required('Meeting link is required'),
    search: Yup.string(),
    name: Yup.string().required('Name is required'),
  })

  const handleMeetingReq = (values) => {
    requestMeeting(
      {
        ...values,
        madeTo: modalState.data.user._id,
        search: params.searchId,
        date: moment(values.date, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      },
      setModalState,
    )
  }

  useEffect(() => {
    getSearchById(params.searchId)
  }, [])

  const renderSkills = (skills) => {
    let arr = []
    for (const key in skills) {
      if (Object.hasOwnProperty.call(skills, key)) {
        const element = skills[key]
        if (element !== 0) {
          arr.push({
            name: key,
            level: element,
          })
        }
      }
    }
    return arr
  }
  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <div className="main-title">Your Search Matches</div>
        {searchResLoading ? (
          <Row justify="center">
            <Col>
              <Spin size="large" />
            </Col>
          </Row>
        ) : (
          <Row gutter={[0, 20]} style={{marginTop: '20px'}} wrap>
            {searchResData?.result?.map((zone, i) => {
              return (
                <Col key={i} span={24}>
                  <div className="match-card">
                    <div className="match-num">#{i + 1}</div>
                    <div>
                      <Avatar
                        shape="square"
                        icon={<img src={checkAvatar(zone.user.avatar)} alt="fish" />}
                        size={40}
                        style={{background: 'var(--orange)', cursor: 'pointer'}}
                      />
                    </div>
                    <div className="perso-test-res">
                      <Tooltip
                        title={`${zone.user?.personality?.mind?.name}: ${zone.user?.personality?.mind?.description}`}
                      >
                        <div className="bold-t" style={{marginRight: '5px'}}>
                          Mind:
                        </div>
                        {zone.user?.personality?.mind?.letter}
                      </Tooltip>
                      <Tooltip
                        title={`${zone.user?.personality?.energy?.name}: ${zone.user?.personality?.energy?.description}`}
                      >
                        <div className="bold-t" style={{marginRight: '5px'}}>
                          Energy:
                        </div>
                        {zone.user?.personality?.energy?.letter}
                      </Tooltip>
                      <Tooltip
                        title={`${zone.user?.personality?.nature?.name}: ${zone.user?.personality?.nature?.description}`}
                      >
                        <div className="bold-t" style={{marginRight: '5px'}}>
                          Nature:
                        </div>
                        {zone.user?.personality?.nature?.letter}
                      </Tooltip>
                      <Tooltip
                        title={`${zone.user?.personality?.tactics?.name}: ${zone.user?.personality?.tactics?.description}`}
                      >
                        <div className="bold-t" style={{marginRight: '5px'}}>
                          Tactics:
                        </div>
                        {zone.user?.personality?.tactics?.letter}
                      </Tooltip>
                    </div>
                    <div>
                      {renderSkills(zone.user?.skills?.skills)?.map((skill, i) => {
                        return (
                          <div key={`skill-${i}`} className="single-skill">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <div className="bold-t">{skill?.name}</div>: level {skill?.level}
                            </div>
                            <img src={medals[+skill?.level - 1]} alt="medal" />
                          </div>
                        )
                      })}
                    </div>
                    <div>
                      <div>Location: {zone?.user?.extraInfo?.location}</div>
                      <div>Work type: {zone?.user?.extraInfo?.typeOfWork}</div>
                      <div>Roles: {zone?.user?.extraInfo?.roles.join(', ')}</div>
                      <div>Skills: {zone?.user?.extraInfo?.skills.join(', ')}</div>
                      <div>Salary: {zone?.user?.extraInfo?.expectedSalary}$</div>
                    </div>
                    <div>
                      <div className="bold-t">Recent experience:</div>
                      <div>
                        Employer name:{' '}
                        {zone?.user?.extraInfo?.experience[zone?.user?.extraInfo?.experience.length - 1].employerName}
                      </div>
                      <div>
                        Location:{' '}
                        {zone?.user?.extraInfo?.experience[zone?.user?.extraInfo?.experience.length - 1].location}
                      </div>
                      <div>
                        Position title:{' '}
                        {zone?.user?.extraInfo?.experience[zone?.user?.extraInfo?.experience.length - 1].title}
                      </div>
                      <div style={{color: 'var(--orange)'}}>
                        {zone?.user?.extraInfo?.experience[zone?.user?.extraInfo?.experience.length - 1].workHere
                          ? 'Currently works here'
                          : `Does't work there anymore`}
                      </div>
                    </div>
                    <ButtonControl
                      width={'max-content'}
                      value={'Request meeting'}
                      height={'50px'}
                      type="primary"
                      htmlType="button"
                      isLoading={false}
                      handleClick={() => setModalState({data: zone, open: true})}
                    />
                  </div>
                </Col>
              )
            })}
            <Col>
              <div onClick={() => history.push('/rc/dashboard')} className="back-link">
                <ArrowLeftOutlined /> Back to dashboard
              </div>
            </Col>
          </Row>
        )}
      </Col>
      <Formik initialValues={values} onSubmit={handleMeetingReq} validationSchema={meetingSchema}>
        {(formik) => (
          <Form>
            <Modal
              title="Request meeting"
              visible={modalState.open}
              onCancel={() => setModalState({...modalState, open: false})}
              destroyOnClose
              maskClosable={false}
              footer={[
                <Button key="back" onClick={() => setModalState({...modalState, open: false})}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" loading={requestMeetingLoading} onClick={formik.handleSubmit}>
                  Submit
                </Button>,
              ]}
            >
              <Field
                component={TextInput}
                name="name"
                placeholder="Reference of the candidate"
                type="text"
                validate={formik}
                outlined={false}
                disabled={false}
                height="50px"
                readOnly={false}
              />
              <Field
                component={TextInput}
                name="link"
                placeholder="Meeting Link"
                height="50px"
                type="text"
                validate={formik}
                outlined={false}
                disabled={false}
                readOnly={false}
              />
              <Field
                component={DatePickerInput}
                name="date"
                validate={formik}
                height="50px"
                outlined={false}
                disabled={false}
                readOnly={false}
                width="100%"
                minDate={moment().startOf('day')}
                format={dateFormat}
              />
              <Field
                component={TimePickerInput}
                name="time"
                validate={formik}
                height="50px"
                width="100%"
                outlined={false}
                disabled={false}
                readOnly={false}
              />
              <Field
                component={TextInput}
                name="message"
                placeholder="Message"
                type="textarea"
                rows={4}
                validate={formik}
                outlined={false}
                disabled={false}
                readOnly={false}
              />
            </Modal>
          </Form>
        )}
      </Formik>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  searchResData: state.recruiter.searchResData,
  searchResLoading: state.recruiter.searchResLoading,

  requestMeetingData: state.recruiter.requestMeetingData,
  requestMeetingLoading: state.recruiter.requestMeetingLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getSearchById: (id) => dispatch(recruiterActions.getSearchById(id)),
  requestMeeting: (data, state) => dispatch(recruiterActions.requestMeeting(data, state)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
