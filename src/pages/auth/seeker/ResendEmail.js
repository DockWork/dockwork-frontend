import React from 'react'
import {Row, Col} from 'antd'
import {connect} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import ButtonControl from '../../../components/button/ButtonControl'
import authActions from '../../../redux/actions/authActions'

import '../Auth.css'

const ResendEmail = ({resendVerifyEmailLoading, resendVerify}) => {
  const history = useHistory()
  const params = useParams()

  const handleResendVerify = () => {
    resendVerify({email: params.email, type: 'JobSeeker'}, history, 'js')
  }

  return (
    <Row justify="center">
      <Col span={8}>
        <div className="main-title">Resend email</div>
        <div className="auth-sub-title">
          Click on the &ldquo;Resend email&rdquo; button to resend a verification email
        </div>
        <Row justify="center" style={{marginTop: '50px'}}>
          <Col>
            <ButtonControl
              width={'max-content'}
              value={'Verify'}
              height={'50px'}
              type="primary"
              htmlType="button"
              isLoading={resendVerifyEmailLoading}
              handleClick={handleResendVerify}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  resendVerifyEmailLoading: state.auth.resendVerifyEmailLoading,
})

const mapDispatchToProps = (dispatch) => ({
  resendVerify: (data, history, type) => dispatch(authActions.resendVerify(data, history, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResendEmail)
