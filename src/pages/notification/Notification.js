import React, {useEffect, useState} from 'react'
import {useParams, useHistory, useLocation} from 'react-router-dom'
import {Tabs, Row, Col} from 'antd'
import NotificationTab from '../../components/notification/NotificationTab'
import PendingTab from '../../components/notification/PendingTab'

const {TabPane} = Tabs

export const Notification = () => {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const [currentTab, setCurrentTab] = useState('1')

  useEffect(() => {
    if (params.page === '1') {
      setCurrentTab('1')
    } else if (params.page === '2') {
      setCurrentTab('2')
    } else {
      history.push('/error')
    }
  }, [params])
  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <Tabs
          activeKey={currentTab}
          centered
          onChange={(e) => {
            history.push(`${location.pathname.slice(0, -2)}/${e}`)
          }}
        >
          <TabPane tab="Notification" key="1">
            <NotificationTab />
          </TabPane>
          <TabPane tab="Pending Requests" key="2">
            <PendingTab />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default Notification
