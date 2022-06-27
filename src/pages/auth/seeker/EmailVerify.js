import React from 'react'
import {Row, Col} from 'antd'
import {connect} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'
import ButtonControl from '../../../components/button/ButtonControl'
import authActions from '../../../redux/actions/authActions'

import '../Auth.css'

const EmailVerify = ({verifyEmailLoading, verify}) => {
  const history = useHistory()
  const params = useParams()

  const handleVerify = () => {
    verify({validateToken: params.token}, history, 'js')
  }

  return (
    <Row justify="center">
      <Col xl={{span: 8}} md={{span: 12}} xs={{span: 22}}>
        <div className="main-title">Verify your email</div>
        <div className="auth-sub-title">Click on the &ldquo;Verify&rdquo; button to verify your email</div>
        <Row justify="center" style={{marginTop: '50px'}}>
          <Col>
            <ButtonControl
              width={'max-content'}
              value={'Verify'}
              height={'50px'}
              type="primary"
              htmlType="button"
              isLoading={verifyEmailLoading}
              handleClick={handleVerify}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  verifyEmailLoading: state.auth.verifyEmailLoading,
})

const mapDispatchToProps = (dispatch) => ({
  verify: (data, history, type) => dispatch(authActions.verify(data, history, type)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify)
