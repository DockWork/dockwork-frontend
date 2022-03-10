import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'

// Images
import Logo from '../../assets/icons/TextLogo.svg'

// Components
// import ButtonControl from '../../components/button/ButtonControl'

export const Header = () => {
  const history = useHistory()

  return (
    <Row justify="center" className="main-header-row">
      <Col md={{span: 16}} xs={{span: 22}} className="header-container">
        <Row align="middle">
          <Col span={12}>
            <div className="header-logo">
              <img src={Logo} alt=".DockWork" onClick={() => history.push('/')} />
            </div>
          </Col>
          {/* <Col span={12}>
                        <Row align="middle" justify="end" gutter={[5, 0]}>
                            <Col>
                                <ButtonControl
                                    value={'Login'}
                                    handleClick={() => history.push('/login')}
                                    height={'40px'}
                                    width={'150px'}
                                    type="primary"
                                    bold={false}
                                    htmlType="button"
                                />
                            </Col>
                            <Col>
                                <ButtonControl
                                    value={'Sign up'}
                                    handleClick={() => history.push('/register')}
                                    height={'40px'}
                                    width={'150px'}
                                    bold={false}
                                    htmlType="button"
                                />
                            </Col>
                        </Row>
                    </Col> */}
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
