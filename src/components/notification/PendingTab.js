import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router'
import {connect} from 'react-redux'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'
import recruiterActions from '../../redux/actions/recruiterActions'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import moment from 'moment'
import {Button, Col, Collapse, Modal, Row} from 'antd'
import {Field, Formik, Form} from 'formik'
import * as Yup from 'yup'
import {DatePickerInput, SelectInput, TextInput, TimePickerInput} from '../FormInputs/CreateFormInput'
import {dateFormat} from '../../utils/InputFormats'

const {Panel} = Collapse

import './notification.css'

export const PendingTab = ({
  jsPendingsData,
  jsPendingsLoading,
  cPendingsData,
  cPendingsLoading,
  getJSPendings,
  getCPendings,
  jsRespondToRequest,
  cRespondToRequest,
  jsRespondLoading,
  cRespondLoading,
}) => {
  const location = useLocation()
  const [pendingsData, setPendingsData] = useState({loading: false, data: []})

  useEffect(() => {
    if (/\/js\/\b/.test(location.pathname)) {
      getJSPendings(true)
    } else {
      getCPendings(true)
    }
  }, [])

  useDidMountEffect(() => {
    if (/\/js\/\b/.test(location.pathname)) {
      if (location.pathname.slice(-1) === '2') getJSPendings(false)
    } else {
      if (location.pathname.slice(-1) === '2') getCPendings(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (/\/js\/\b/.test(location.pathname)) {
      if (location.pathname.slice(-1) === '2') {
        setPendingsData({loading: jsPendingsLoading, data: jsPendingsData})
      }
    } else {
      if (location.pathname.slice(-1) === '2') {
        setPendingsData({loading: cPendingsLoading, data: cPendingsData})
      }
    }
  }, [jsPendingsData, cPendingsData])

  const GetPanelHeader = ({pending}) => {
    if (/\/js\/\b/.test(location.pathname)) {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <span>{`Request from ${pending?.madeBy?.name} to ${pending?.search?.name}`}</span>
          <span>{moment(pending?.createdAt).fromNow()}</span>
        </div>
      )
    } else {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <span>{`Update on ${pending?.search?.name} from ${pending?.name}`}</span>
          <span>{moment(pending?.createdAt).fromNow()}</span>
        </div>
      )
    }
  }

  const GetBodyContent = ({pending}) => {
    const [modalState, setModalState] = useState(false)
    return (
      <div className="notif-body">
        <div className="part">
          <div className="ttl">Meeting Info:</div>
          <div>
            <div className="sm-ttl">Name:</div>
            {pending.search.name}
          </div>
          <div>
            <div className="sm-ttl">Requested By:</div>
            {pending.madeBy.name}
          </div>
          <div>
            <div className="sm-ttl">Meeting On:</div>
            {moment(pending.date, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY')}
          </div>
          <div>
            <div className="sm-ttl">Meeting At:</div>
            {pending.time}
          </div>
          <div>
            <div className="sm-ttl">Message:</div>
            {pending.message[pending.message.length - 1]}
          </div>
          {pending.message?.length > 1 && (
            <div>
              <div className="sm-ttl">Replying To:</div>
              {pending.message[pending.message.length - 2]}
            </div>
          )}
          <Button key="Respond" type="primary" style={{marginTop: '10px'}} onClick={() => setModalState(true)}>
            Respond
          </Button>
        </div>
        <div className="part">
          <div className="ttl">Job Info:</div>
          <div>
            <div className="sm-ttl">Location:</div> {pending.search.location}
          </div>
          <div>
            <div className="sm-ttl">Remote:</div>
            {pending.search.remote ? 'Yes' : 'No'}
          </div>
          <div>
            <div className="sm-ttl">Role:</div> {pending.search.role[0].toUpperCase() + pending.search.role.slice(1)}
          </div>
          <div>
            <div className="sm-ttl">Skills:</div>
            {pending.search.skills.join(', ')}
          </div>
          <div>
            <div className="sm-ttl">Salary Range:</div>
            {pending.search.minimumSalary} - {pending.search.maximumSalary}
          </div>
        </div>

        {modalState && (
          <Formik
            initialValues={{response: '', message: '', date: '', time: '', meetingId: pending._id}}
            validationSchema={Yup.object().shape({
              response: Yup.string().required('Response is required'),
              message: Yup.string().required('Message is required'),
              date: Yup.string().when('response', {
                is: 'Update',
                then: Yup.string().required('Date is required'),
              }),
              time: Yup.string()
                .matches(/^([0-3]?[0-9]){2}:([0-5]?[0-9]){2}$/, 'Invalid time')
                .when('response', {
                  is: 'Update',
                  then: Yup.string()
                    .matches(/^([0-3]?[0-9]){2}:([0-5]?[0-9]){2}$/, 'Invalid time')
                    .required('Time is required'),
                }),
              meetingId: Yup.string(),
            })}
            onSubmit={(values) => {
              if (/\/js\/\b/.test(location.pathname)) {
                jsRespondToRequest({
                  response: values.response,
                  meetingId: values.meetingId,
                  date: values?.date ? moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD') : '',
                  time: values.time,
                  message: values.message,
                })
              } else {
                cRespondToRequest({
                  response: values.response,
                  meetingId: values.meetingId,
                  date: values?.date ? moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD') : '',
                  time: values.time,
                  message: values.message,
                })
              }
            }}
          >
            {(formik) => (
              <Modal
                title="Respond to invitation"
                visible={modalState}
                onCancel={() => setModalState(false)}
                destroyOnClose
                maskClosable={false}
                footer={[
                  <Button key="back" onClick={() => setModalState(false)}>
                    Cancel
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    loading={jsRespondLoading || cRespondLoading}
                    onClick={formik.handleSubmit}
                  >
                    Submit
                  </Button>,
                ]}
              >
                <Form>
                  <Field
                    component={SelectInput}
                    name="response"
                    placeholder="Response"
                    selectOptions={[
                      {key: 'Accept', value: 'Accept'},
                      {key: 'Decline', value: 'Decline'},
                      {key: 'Update', value: 'Update'},
                    ]}
                    validate={formik}
                    height="50px"
                    disabled={false}
                    readOnly={false}
                  />
                  <Field
                    component={TextInput}
                    type="textarea"
                    name="message"
                    placeholder="Message goes here..."
                    autoSize={{minRows: 3, maxRows: 5}}
                    validate={formik}
                    height="50px"
                    outlined={false}
                    disabled={false}
                    readOnly={false}
                  />
                  {formik.values.response === 'Update' && (
                    <Row gutter={[24, 0]}>
                      <Col sm={18} xs={16}>
                        <Field
                          component={DatePickerInput}
                          name="date"
                          validate={formik}
                          height="50px"
                          outlined={false}
                          disabled={false}
                          readOnly={false}
                          width="100%"
                          // minDate={moment().format('')}
                          format={dateFormat}
                        />
                      </Col>
                      <Col sm={6} xs={8}>
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
                      </Col>
                    </Row>
                  )}
                </Form>
              </Modal>
            )}
          </Formik>
        )}
      </div>
    )
  }

  return (
    <>
      {pendingsData.loading ? (
        'loading...'
      ) : pendingsData?.data?.length < 1 ? (
        'no data'
      ) : (
        <Collapse bordered={true} accordion>
          {pendingsData?.data?.map((pending, i) => {
            return (
              <Panel header={<GetPanelHeader pending={pending} />} key={i}>
                <GetBodyContent pending={pending} />
              </Panel>
            )
          })}
        </Collapse>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  jsPendingsData: state.jobSeeker.pendingsData,
  jsPendingsLoading: state.jobSeeker.pendingsLoading,

  cPendingsData: state.recruiter.pendingsData,
  cPendingsLoading: state.recruiter.pendingsLoading,

  jsRespondLoading: state.jobSeeker.jsRespondLoading,
  cRespondLoading: state.recruiter.cRespondLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getJSPendings: (withLoading) => {
    dispatch(jobSeekerActions.getPendings(withLoading))
  },
  getCPendings: (withLoading) => {
    dispatch(recruiterActions.getPendings(withLoading))
  },
  jsRespondToRequest: (data) => {
    dispatch(jobSeekerActions.respondToRequest(data))
  },
  cRespondToRequest: (data) => {
    dispatch(recruiterActions.respondToRequest(data))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingTab)
