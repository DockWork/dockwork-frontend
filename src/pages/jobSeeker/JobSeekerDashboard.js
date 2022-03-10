import React, {useEffect, useState, useRef} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col, Progress, Tooltip, Skeleton, Modal} from 'antd'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'
import InfoCard from '../../components/card/InfoCard'
import ButtonControl from '../../components/button/ButtonControl'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'

import bronze from '../../assets/icons/medals/bronze.svg'
import silver from '../../assets/icons/medals/silver.svg'
import gold from '../../assets/icons/medals/gold.svg'

import './jobSeeker.css'

const JobSeekerDashboard = ({
  profileData,
  seekerDashboardData,
  seekerDashboardLoading,
  getJobSeekerDashboard,
  profileLoading,
}) => {
  const history = useHistory()
  const calendarRef = useRef(null)
  const linkRef = useRef(null)

  const [date, setDate] = useState(new Date())
  const [skills, setSkills] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('')

  const medals = [bronze, silver, gold]

  useEffect(() => {
    getJobSeekerDashboard()
  }, [])

  useEffect(() => {
    let data = []

    for (const key in seekerDashboardData?.skills?.skills) {
      const element = seekerDashboardData?.skills?.skills[key]

      data.push({name: key, value: element})
    }

    setSkills(data)
  }, [seekerDashboardData])

  const checkCompleted = () => {
    let x = 0

    if (seekerDashboardData?.extraInfo) x++
    if (seekerDashboardData?.personality) x++
    if (seekerDashboardData?.skills) x++

    switch (x) {
      case 0:
        return 10
      case 1:
        return 40
      case 2:
        return 70
      case 3:
        return 100
      default:
        return 0
    }
  }

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current
    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.prev()
      setDate(calendarApi.getDate())
    }
  }

  const handleDateNext = () => {
    const calendarEl = calendarRef.current

    if (calendarEl) {
      const calendarApi = calendarEl.getApi()

      calendarApi.next()
      setDate(calendarApi.getDate())
    }
  }

  const handleEventClick = (e) => {
    setIsModalVisible(true)
    setSelectedEvent(e?.event?._def)
  }

  const handleRedirect = (link) => {
    linkRef.current.href = link
    linkRef.current.click()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        {profileLoading || seekerDashboardLoading ? (
          <Skeleton active />
        ) : (
          <>
            <div className="main-title">Welcome, {profileData?.name}</div>
            <Row justify="center" style={{marginBottom: '30px'}}>
              <Col span={24}>
                <Progress
                  strokeColor={{
                    from: '#ff5d00',
                    to: '#00478f',
                  }}
                  percent={checkCompleted()}
                  status="active"
                  showInfo={false}
                />
                <div className="profile-complete">
                  Your profile is<span> {checkCompleted()}% </span>completed
                </div>
              </Col>
            </Row>
            <div className="my-dashboard-grid-holder">
              <div className="o-title">About you</div>
              <div className="my-dashboard-triple-grid">
                <div id="perso">
                  <InfoCard
                    height={'100%'}
                    title={'Personality test'}
                    description={
                      seekerDashboardData?.personality
                        ? `Done on ${moment(seekerDashboardData?.personality?.createdAt, 'YYYY-MM-DD').format(
                            'dddd, MMMM Do YYYY',
                          )}`
                        : 'There are no “right“ or “wrong” answers to the questions on this inventory. Your answers will help to show how you like to look at things and how you like to go about deciding things.'
                    }
                  >
                    {seekerDashboardData?.personality === null ? (
                      <ButtonControl
                        width={'max-content'}
                        value={'Take Test'}
                        height={'50px'}
                        type="primary"
                        htmlType="button"
                        isLoading={false}
                        handleClick={() => history.push('/js/presonality-test')}
                      />
                    ) : (
                      <div className="dash-perso-res">
                        <Tooltip
                          title={`${seekerDashboardData?.personality?.mind?.name}: ${seekerDashboardData?.personality?.mind?.description}`}
                        >
                          Mind: {seekerDashboardData?.personality?.mind?.letter}
                        </Tooltip>
                        <Tooltip
                          title={`${seekerDashboardData?.personality?.energy?.name}: ${seekerDashboardData?.personality?.energy?.description}`}
                        >
                          Energy: {seekerDashboardData?.personality?.energy?.letter}
                        </Tooltip>
                        <Tooltip
                          title={`${seekerDashboardData?.personality?.nature?.name}: ${seekerDashboardData?.personality?.nature?.description}`}
                        >
                          Nature: {seekerDashboardData?.personality?.nature?.letter}
                        </Tooltip>
                        <Tooltip
                          title={`${seekerDashboardData?.personality?.tactics?.name}: ${seekerDashboardData?.personality?.tactics?.description}`}
                        >
                          Tactics: {seekerDashboardData?.personality?.tactics?.letter}
                        </Tooltip>
                      </div>
                    )}
                  </InfoCard>
                </div>
                <div id="jscalendar">
                  <InfoCard title={'Meetings calendar'}>
                    <div className="meeting-calendar">
                      <div className="calendar-header">
                        <div className="current-month">
                          <div className="monthControlBtn" onClick={handleDatePrev}>
                            <LeftOutlined />
                          </div>
                          <div className="currentMonth">{moment(date).format('MMMM YYYY')}</div>
                          <div className="monthControlBtn" onClick={handleDateNext}>
                            <RightOutlined />
                          </div>
                        </div>
                      </div>
                      <FullCalendar
                        eventClick={handleEventClick}
                        displayEventTime={true}
                        eventDisplay="block"
                        events={seekerDashboardData?.calendar?.map((event) => {
                          return {
                            id: event?._id,
                            className: 'singleMeetingCal',
                            title: event?.name,
                            start: `${event?.date?.split('T')[0]}T${event?.time}:00`,
                            end: `${event?.date?.split('T')[0]}T${event?.time}:00`,
                            data: {
                              url: event?.link,
                              madeBy: event?.madeBy?.name,
                              message: event?.message[0],
                              location: event?.search?.location,
                              minSalary: event?.search?.minimumSalary,
                              maxSalary: event?.search?.maximumSalary,
                              companyName: event?.search?.name,
                              remote: event?.search?.remote,
                              role: event?.search?.role,
                              skills: event?.search?.skills,
                              date: `${event?.date?.split('T')[0]}`,
                              time: event?.time,
                            },
                          }
                        })}
                        headerToolbar={false}
                        height={400}
                        initialDate={moment().format('')}
                        initialView={'listMonth'}
                        selectable={true}
                        plugins={[momentPlugin, interactionPlugin, listPlugin]}
                        ref={calendarRef}
                        rerenderDelay={10}
                      />
                    </div>
                  </InfoCard>
                </div>
                <div id="experi">
                  <InfoCard
                    height={'100%'}
                    title={'Your experience'}
                    description={
                      seekerDashboardData?.extraInfo
                        ? `Last updated: ${moment(seekerDashboardData?.extraInfo, 'YYYY-MM-DD').format(
                            'dddd, MMMM Do YYYY',
                          )}`
                        : 'Upload your CV/Resume or fill out the form to let other see your experience and all your skills'
                    }
                  >
                    <ButtonControl
                      width={'max-content'}
                      value={seekerDashboardData?.extraInfo ? 'Edit experience' : 'Add experience'}
                      height={'50px'}
                      type="primary"
                      htmlType="button"
                      isLoading={false}
                      handleClick={() => history.push('/js/profile/experience')}
                    />
                  </InfoCard>
                </div>
              </div>
            </div>
            <div className="my-dashboard-grid-holder">
              <div className="o-title">Skills</div>
              <div className="my-dashboard-grid-double">
                <InfoCard
                  title={'Skills assesments'}
                  description={
                    'Take skills assesment to improve your skills and your chances to get matches with a job recruiter!'
                  }
                >
                  <ButtonControl
                    width={'max-content'}
                    value={'Take Test'}
                    height={'50px'}
                    type="primary"
                    htmlType="button"
                    isLoading={false}
                    handleClick={() => history.push('/js/skill-test/')}
                  />
                </InfoCard>
                {skills?.map((zone, i) => {
                  return (
                    <InfoCard key={i} title={zone.name}>
                      <div className="skills-card-medals">
                        <img
                          src={medals[0]}
                          alt="medals"
                          className={`medal-skill ${zone.value < 1 && 'is-disabled'}`}
                        />
                        <img
                          src={medals[1]}
                          alt="medals"
                          className={`medal-skill ${zone.value < 2 && 'is-disabled'}`}
                        />
                        <img
                          src={medals[2]}
                          alt="medals"
                          className={`medal-skill ${zone.value < 3 && 'is-disabled'}`}
                        />
                      </div>
                    </InfoCard>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </Col>
      <Modal title={`Meeting: ${selectedEvent?.title}`} visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <div className="modal-details">
          <div className="event-m-ttl">Title:</div>
          {selectedEvent?.title}
        </div>
        <div className="modal-details">
          <div className="event-m-ttl">date:</div>
          {selectedEvent?.extendedProps?.data?.date}
        </div>
        <div className="modal-details">
          <div className="event-m-ttl">time:</div>
          {selectedEvent?.extendedProps?.data?.time}
        </div>
        <div className="modal-details">
          <div className="event-m-ttl">Meeting link:</div>
          <div className="meeting-link" onClick={() => handleRedirect(selectedEvent?.extendedProps?.data?.url)}>
            {selectedEvent?.extendedProps?.data?.url}
          </div>
          <a href="" ref={linkRef} style={{display: 'none'}} target="_blank"></a>
        </div>
        <div className="modal-details">
          <div className="event-m-ttl">Created by:</div>
          {selectedEvent?.extendedProps?.data?.madeBy}
        </div>
        <div className="modal-details-dtl">
          <div className="event-m-ttl">Details:</div>
          <ul className="modal-meet-link">
            <li>Company name: {selectedEvent?.extendedProps?.data?.companyName}</li>
            <li>Location: {selectedEvent?.extendedProps?.data?.location}</li>
            <li>Role: {selectedEvent?.extendedProps?.data?.role}</li>
            <li>Remote: {selectedEvent?.extendedProps?.data?.remote}</li>
            <li>Skills: {selectedEvent?.extendedProps?.data?.skills.join(', ')}</li>
            <li>
              Salary: {selectedEvent?.extendedProps?.data?.minSalary} - {selectedEvent?.extendedProps?.data?.maxSalary}
            </li>
          </ul>
        </div>
      </Modal>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  profileData: state.jobSeeker.profileData,
  profileLoading: state.jobSeeker.profileLoading,
  seekerDashboardData: state.jobSeeker.seekerDashboardData,
  seekerDashboardLoading: state.jobSeeker.seekerDashboardLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getJobSeekerDashboard: () => dispatch(jobSeekerActions.getJobSeekerDashboard()),
})

export default connect(mapStateToProps, mapDispatchToProps)(JobSeekerDashboard)
