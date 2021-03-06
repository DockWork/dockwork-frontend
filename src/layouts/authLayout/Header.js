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
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
