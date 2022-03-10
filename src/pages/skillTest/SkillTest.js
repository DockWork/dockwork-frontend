import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'
import {Col, Row, Card} from 'antd'
import {StarFilled, StarOutlined, CheckOutlined, LockOutlined} from '@ant-design/icons'
import JavascriptLogo from '../../assets/images/programmingLogos/JSlogo.png'

const {Meta} = Card

const pageData = [
  {name: 'Javascript', image: JavascriptLogo, level: 1, description: 'Some Description about this level'},
  {name: 'Javascript', image: JavascriptLogo, level: 2, description: 'Some Description about this level'},
  {name: 'Javascript', image: JavascriptLogo, level: 3, description: 'Some Description about this level'},
]

const SkillTest = ({getUserSkills, userSkillsData = {}, getRandomSkillTest}) => {
  useEffect(() => {
    getUserSkills()
  }, [])
  const history = useHistory()
  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <div className="main-title">Skill Tests</div>
      </Col>
      <Col md={{span: 16}} xs={{span: 22}}>
        <Row gutter={[30, 30]}>
          {pageData.map((zone, i) => {
            let coloredArr = []
            let uncoloredArr = []
            for (let i = 0; i < zone.level; i++) {
              coloredArr.push(1)
            }
            for (let i = 0; i < 3 - zone.level; i++) {
              uncoloredArr.push(1)
            }
            return (
              <Col xs={24} lg={8} key={`test-${i}`}>
                <Card
                  hoverable={
                    Object.prototype.hasOwnProperty.call(userSkillsData || {}, zone.name)
                      ? userSkillsData[zone.name] < zone.level
                      : 0 < zone.level
                  }
                  onClick={() => {
                    if (Object.prototype.hasOwnProperty.call(userSkillsData || {}, zone.name)) {
                      if (userSkillsData[zone.name] + 1 === zone.level) {
                        getRandomSkillTest(zone.name, zone.level, history)
                      }
                    } else {
                      if (zone.level === 1) {
                        getRandomSkillTest(zone.name, zone.level, history)
                      }
                    }
                  }}
                  cover={
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                      <img alt={zone.name} width="100%" src={zone.image} />
                      {(Object.prototype.hasOwnProperty.call(userSkillsData || {}, zone.name)
                        ? userSkillsData[zone.name] + 1 < zone.level
                        : 1 < zone.level) && (
                        <div
                          style={{
                            position: 'absolute',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 2,
                            backgroundColor: '#000000B4',
                          }}
                        >
                          <LockOutlined
                            style={{
                              color: '#fff',
                              fontSize: '40px',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        </div>
                      )}
                      {(Object.prototype.hasOwnProperty.call(userSkillsData || {}, zone.name)
                        ? userSkillsData[zone.name] >= zone.level
                        : false) && (
                        <div
                          style={{
                            position: 'absolute',
                            width: '100%',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 2,
                            backgroundColor: '#000000B4',
                          }}
                        >
                          <CheckOutlined
                            style={{
                              color: '#fff',
                              fontSize: '40px',
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  }
                >
                  <Meta
                    title={
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{zone.name}</span>
                        <span>
                          {coloredArr.map((_, j) => {
                            return (
                              <span key={`cs-${j}-${zone.name}-${zone.level}`}>
                                <StarFilled style={{color: 'var(--orange)'}} />
                              </span>
                            )
                          })}
                          {uncoloredArr.map((_, j) => {
                            return (
                              <span key={`ucs-${j}-${zone.name}-${zone.level}`}>
                                <StarOutlined />
                              </span>
                            )
                          })}
                        </span>
                      </div>
                    }
                    description={zone.description}
                  />
                </Card>
              </Col>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  userSkillsData: state.jobSeeker.getMeSkillsData,
})

const mapDispatchToProps = (dispatch) => ({
  getUserSkills: () => {
    dispatch(jobSeekerActions.getMeSkills())
  },
  getRandomSkillTest: (language, level, history) => {
    dispatch(jobSeekerActions.getRandomSkillTest(language, level, history))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillTest)
