import React from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Row, Col} from 'antd'
import ButtonControl from '../../components/button/ButtonControl'

import bronze from '../../assets/icons/medals/bronze.svg'
import silver from '../../assets/icons/medals/silver.svg'
import gold from '../../assets/icons/medals/gold.svg'

import './editor.css'

function Congratulation() {
  const history = useHistory()
  const params = useParams()

  const medals = [bronze, silver, gold]
  return (
    <Row justify="center">
      <Col span={16}>
        <div className="skill-congrats">Congratulation for completing</div>
        <div className="skill-pass-info">
          {params.language} level {params.level}
        </div>
        <div className="skill-medal-cong">
          <img src={medals[params.level - 1]} alt="medal" />
          <ButtonControl
            width={'max-content'}
            value={'Back to Dashboard'}
            height={'50px'}
            type="primary"
            htmlType="button"
            isLoading={false}
            handleClick={() => history.push('/js/dashboard')}
          />
        </div>
      </Col>
    </Row>
  )
}

export default Congratulation
