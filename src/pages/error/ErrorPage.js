import React from 'react'
import {Row, Col} from 'antd'

// CSS
import './ErrorPage.css'

// IMAGES

function ErrorPage() {
  return (
    <Row justify="center">
      <Col>
        <div className="error-txt">OPS! SEEM LIKE THIS PAGE DOESN&apos;T EXIST</div>
      </Col>
    </Row>
  )
}

export default ErrorPage
