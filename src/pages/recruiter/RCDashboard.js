import React, {useEffect, useState, useRef} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col, Skeleton, Modal, Alert} from 'antd'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import InfoCard from '../../components/card/InfoCard'
import ButtonControl from '../../components/button/ButtonControl'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import recruiterActions from '../../redux/actions/recruiterActions'
import useDidMountEffect from '../../hooks/useDidMountEffect'

import './recruiter.css'

const RCDashboard = ({
  profileData,
  profileLoading,
  recruiterDashboardData,
  recruiterDashboardLoading,
  getRecruiterDashboard,
}) => {
  const history = useHistory()
  const calendarRef = useRef(null)
  const linkRef = useRef(null)

  const [date, setDate] = useState(new Date())
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState('')

  useEffect(() => {
    getRecruiterDashboard()
  }, [])

  useDidMountEffect(() => {
    getRecruiterDashboard(date ? getRecruiterDashboard(moment(date).format('MM-YYYY')) : '')
  }, [date])

  // useEffect(()=>{
  //   if(recruiterDashboardData?.calendar){

  //   }
  // },[recruiterDashboardData])

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
        {profileLoading || recruiterDashboardLoading ? (
          <Skeleton active />
        ) : (
          <>
            <div className="main-title">Welcome, {profileData?.name}</div>
            <div className="my-dashboard-grid-holder">
              <div className="recruiter-dashboard">
                <div className="search">
                  <InfoCard
                    title={'Search job seekers'}
                    description={'Find the best matching job seekers that meets your requirements!'}
                    height="100%"
                  >
                    <ButtonControl
                      width={'max-content'}
                      value={'Find seekers'}
                      height={'50px'}
                      type="primary"
                      htmlType="button"
                      isLoading={false}
                      handleClick={() => history.push('/rc/search')}
                    />
                  </InfoCard>
                </div>
                <div className="history">
                  <InfoCard
                    title={'Matches history'}
                    description={'List of the your last five searches.'}
                    height="100%"
                  >
                    {recruiterDashboardData?.history.length > 0 ? (
                      recruiterDashboardData?.history?.map((zone, i) => {
                        return (
                          <div key={`history-${i}`} className="history-holder">
                            <div className="single-seach-match" onClick={() => history.push(`/rc/search/${zone._id}`)}>
                              <div>{zone.name}</div>
                              <div className="date">{moment(zone.createdAt, 'YYYY-MM-DD').format('DD/MM/YYYY')}</div>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                      <Alert message="You have no recent searches." type="warning" showIcon />
                    )}
                  </InfoCard>
                </div>
                <div className="calendar">
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
                        events={recruiterDashboardData?.calendar?.map((event) => {
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
  profileData: state.recruiter.profileData,
  profileLoading: state.recruiter.profileLoading,
  recruiterDashboardData: state.recruiter.recruiterDashboardData,
  recruiterDashboardLoading: state.recruiter.recruiterDashboardLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getRecruiterDashboard: (date) => {
    dispatch(recruiterActions.getRecruiterDashboard(date))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RCDashboard)
