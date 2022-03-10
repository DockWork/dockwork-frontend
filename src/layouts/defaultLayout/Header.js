import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Avatar, Dropdown, Badge} from 'antd'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {BellTwoTone} from '@ant-design/icons'
import {checkAvatar} from '../../utils/checkAvatar'

// IMAGES
import Logo from '../../assets/icons/TextLogo.svg'

// REDUX
import authActions from '../../redux/actions/authActions'
import recruiterActions from '../../redux/actions/recruiterActions'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'

const Header = ({
  getMeProfile,
  seekerProfileData,
  companyProfileData,
  logout,
  getCompanyProfile,
  jsNotificationCount,
  cNotificationCount,
}) => {
  const location = useLocation()
  const history = useHistory()

  const [type, setType] = useState('')

  useEffect(() => {
    if (location.pathname.includes('/js/')) {
      getMeProfile()
      setType('js')
    } else if (location.pathname.includes('/rc/')) {
      getCompanyProfile()
      setType('rc')
    }
  }, [])

  const handleLogout = () => {
    logout(history, type)
  }

  const menu = (
    <div className="header-avatar-menu">
      <div className="profile-info-container">
        <Avatar
          shape="square"
          icon={
            <img src={checkAvatar(type === 'js' ? seekerProfileData?.avatar : companyProfileData?.avatar)} alt="fish" />
          }
          size={40}
          style={{background: 'var(--orange)'}}
        />
        <div className="info-holder">
          <span className="font-bold font-16">
            {type === 'js' ? seekerProfileData?.name : companyProfileData?.name}
          </span>
        </div>
      </div>
      <ul className="profile-links">
        <li className="profile-links-item">
          <Link to={`/${type}/profile`}>User Profile Settings</Link>
        </li>
        <li className="profile-links-item">
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )

  return (
    <Row justify="center" className="main-header-row">
      <Col md={{span: 16}} xs={{span: 22}} className="header-container">
        <Row align="bottom" justify="space-between">
          <Col>
            <div className="header-logo">
              <img src={Logo} alt=".DockWork" onClick={() => history.push(`/${type}/dashboard`)} />
            </div>
          </Col>
          <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <div style={{marginRight: '20px'}}>
              <Badge count={type === 'js' ? jsNotificationCount : cNotificationCount}>
                <BellTwoTone
                  twoToneColor="#00478f"
                  style={{fontSize: '30px', cursor: 'pointer'}}
                  onClick={() => history.push(`/${type === 'js' ? 'js' : 'rc'}/notification/1`)}
                />
              </Badge>
            </div>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight" overlayStyle={{position: 'fixed'}}>
              <Avatar
                shape="square"
                icon={
                  <img
                    src={checkAvatar(type === 'js' ? seekerProfileData?.avatar : companyProfileData?.avatar)}
                    alt="fish"
                  />
                }
                size={40}
                style={{background: 'var(--orange)', cursor: 'pointer'}}
              />
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  seekerProfileData: state.jobSeeker.profileData,
  companyProfileData: state.recruiter.profileData,
  jsNotificationCount: state.jobSeeker.notificationCount,
  cNotificationCount: state.recruiter.notificationCount,
})

const mapDispatchToProps = (dispatch) => ({
  getMeProfile: () => dispatch(jobSeekerActions.getMeProfile()),
  getCompanyProfile: () => dispatch(recruiterActions.getCompanyProfile()),
  logout: (history) => dispatch(authActions.logout(history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
