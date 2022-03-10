import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'
import ButtonControl from '../../components/button/ButtonControl'
import InfoCard from '../../components/card/InfoCard'

import coolSeeker from '../../assets/images/cool-businessman.svg'

export const LandingPage = () => {
  const history = useHistory()

  return (
    <Row>
      <Col lg={{span: 20, offset: 4}} xs={{span: 22, offset: 1}}>
        <Row align="middle">
          <Col xl={{span: 10, offset: 0}} lg={{span: 12, offset: 0}} xs={{span: 22, offset: 1}}>
            <Row gutter={[0, 50]}>
              <Col span={24}>
                <InfoCard
                  title={'Login as Job Seeker'}
                  description={
                    'Login as a job seeker! Improve your profile to get matched with recruiters looking for candidates as skilled as you!'
                  }
                >
                  <ButtonControl
                    width={'max-content'}
                    value={'Login'}
                    height={'50px'}
                    type="primary"
                    htmlType="button"
                    isLoading={false}
                    handleClick={() => history.push('/js/login')}
                  />
                </InfoCard>
              </Col>
              <Col span={24}>
                <InfoCard
                  title={'Login as Job Recruiter'}
                  description={
                    'Login as a job recruiter! Search, match and meet with candidate that will match all you needs.'
                  }
                >
                  <ButtonControl
                    width={'max-content'}
                    value={'Login'}
                    height={'50px'}
                    type="primary"
                    htmlType="button"
                    isLoading={false}
                    handleClick={() => history.push('/rc/login')}
                  />
                </InfoCard>
              </Col>
            </Row>
          </Col>
          <Col xl={{span: 14, offset: 0}} lg={{span: 12, offset: 0}} xs={{span: 22, offset: 1}}>
            <div className="cool-seeker">
              <img src={coolSeeker} alt="cool seeker" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
