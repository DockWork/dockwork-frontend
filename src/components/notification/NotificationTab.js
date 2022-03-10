import React, {useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router'
import {connect} from 'react-redux'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'
import recruiterActions from '../../redux/actions/recruiterActions'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import moment from 'moment'
import {Collapse, Button} from 'antd'

import './notification.css'

const {Panel} = Collapse

export const NotificationTab = ({
  jsNotificationData,
  jsNotificationLoading,
  getJSNotifications,
  cNotificationData,
  cNotificationLoading,
  getCNotifications,
}) => {
  const history = useHistory()
  const location = useLocation()
  const [notificationData, setNotificationData] = useState({loading: false, data: []})

  useEffect(() => {
    if (/\/js\/\b/.test(location.pathname)) {
      getJSNotifications(true)
    } else {
      getCNotifications(true)
    }
  }, [])

  useDidMountEffect(() => {
    if (/\/js\/\b/.test(location.pathname)) {
      if (location.pathname.slice(-1) === '1') getJSNotifications(false)
    } else {
      if (location.pathname.slice(-1) === '1') getCNotifications(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (/\/js\/\b/.test(location.pathname)) {
      if (location.pathname.slice(-1) === '1') {
        setNotificationData({loading: jsNotificationLoading, data: jsNotificationData})
      }
    } else {
      if (location.pathname.slice(-1) === '1') {
        if (location.pathname.slice(-1) === '1') {
          setNotificationData({loading: cNotificationLoading, data: cNotificationData})
        }
      }
    }
  }, [jsNotificationData, cNotificationData])

  const BodyContent = ({notification}) => {
    return (
      <div className="notif-body">
        <div className="part">
          <div className="ttl">Meeting Info:</div>
          <div>
            <div className="sm-ttl">Name:</div> {notification.details.meeting.search.name}
          </div>
          <div>
            <div className="sm-ttl">Requested By:</div>
            {notification.details.madeBy.name}
          </div>
          <div>
            <div className="sm-ttl">Meeting On:</div>
            {moment(notification.details.meeting.date, 'YYYY-MM-DD').format('dddd, MMMM Do YYYY')}
          </div>
          <div>
            <div className="sm-ttl">Meeting At:</div> {notification.details.meeting.time}
          </div>
          <div>
            <div className="sm-ttl">Message:</div>
            {notification.details.meeting.message[notification.details.meeting.message.length - 1]}
          </div>
          {notification.details.meeting.message?.length > 1 && (
            <div>
              <div className="sm-ttl">Replying To:</div>
              {notification.details.meeting.message[notification.details.meeting.message.length - 2]}
            </div>
          )}
        </div>
        <div className="part">
          <div className="ttl">Job Info:</div>
          <div>
            <div className="sm-ttl">Location:</div> {notification.details.meeting.search.location}
          </div>
          <div>
            <div className="sm-ttl">Remote:</div> {notification.details.meeting.search.remote ? 'Yes' : 'No'}
          </div>
          <div>
            <div className="sm-ttl">Role:</div>
            {notification.details.meeting.search.role[0].toUpperCase() +
              notification.details.meeting.search.role.slice(1)}
          </div>
          <div>
            <div className="sm-ttl">Skills:</div> {notification.details.meeting.search.skills.join(', ')}
          </div>
          <div>
            <div className="sm-ttl">Salary Range:</div>
            {notification.details.meeting.search.minimumSalary} - {notification.details.meeting.search.maximumSalary}
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      {notificationData.loading ? (
        'loading...'
      ) : notificationData?.data?.length < 1 ? (
        'no data'
      ) : (
        <Collapse bordered={true} accordion>
          {notificationData?.data?.map((notification, i) => {
            let color
            let body = () => {}
            switch (notification.details?.type) {
              case 'Request': {
                color = 'blue'
                body = () => (
                  <div>
                    <BodyContent notification={notification} />
                    <Button
                      key="Respond"
                      type="primary"
                      style={{marginTop: '10px'}}
                      onClick={() => history.push(`${location.pathname.slice(0, -2)}/2`)}
                    >
                      Accept meeting
                    </Button>
                  </div>
                )
                break
              }
              case 'Accept': {
                color = 'green'
                body = () => (
                  <div>
                    <BodyContent notification={notification} />
                  </div>
                )
                break
              }
              case 'Decline': {
                color = 'red'
                body = () => (
                  <div>
                    <BodyContent notification={notification} />
                  </div>
                )
                break
              }
              case 'Update': {
                color = 'yellow'
                body = () => (
                  <div>
                    <BodyContent notification={notification} />
                    <Button
                      key="Respond"
                      type="primary"
                      style={{marginTop: '10px'}}
                      onClick={() => history.push(`${location.pathname.slice(0, -2)}/2`)}
                    >
                      Accept meeting
                    </Button>
                  </div>
                )
                break
              }
            }
            return (
              <Panel
                key={i}
                className={`notif-col ${color}`}
                header={
                  <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                    <span>{notification.message}</span>
                    <span>{moment(notification.details?.createdAt).fromNow()}</span>
                  </div>
                }
              >
                {body()}
              </Panel>
            )
          })}
        </Collapse>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  jsNotificationData: state.jobSeeker.notificationData,
  jsNotificationLoading: state.jobSeeker.notificationLoading,

  cNotificationData: state.recruiter.notificationData,
  cNotificationLoading: state.recruiter.notificationLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getJSNotifications: (withLoading) => {
    dispatch(jobSeekerActions.getNotifications(withLoading))
  },
  getCNotifications: (withLoading) => {
    dispatch(recruiterActions.getNotifications(withLoading))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTab)
