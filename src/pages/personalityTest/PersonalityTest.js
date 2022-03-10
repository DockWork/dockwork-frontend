import React, {useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col, Steps} from 'antd'
import {Formik, Form} from 'formik'
import ButtonControl from '../../components/button/ButtonControl'

const {Step} = Steps

import SectionOne from './SectionOne'
import SectionTwo from './SectionTwo'

import personalityActions from '../../redux/actions/personalityActions'

const PersonalityTest = ({fillPersonalityTest, personalityTestLoading}) => {
  const history = useHistory()

  const steps = [<SectionOne key={0} />, <SectionTwo key={1} />]

  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const values = {
    1: 'A',
    2: 'A',
    3: 'A',
    4: 'A',
    5: 'A',
    6: 'A',
    7: 'A',
    8: 'A',
    9: 'A',
    10: 'A',
    11: 'A',
    12: 'A',
    13: 'A',
    14: 'A',
    15: 'A',
    16: 'A',
    17: 'A',
    18: 'A',
    19: 'A',
    20: 'A',
    21: 'A',
    22: 'A',
    23: 'A',
    24: 'A',
    25: 'A',
    26: 'A',
    27: 'A',
    28: 'A',
    29: 'A',
    30: 'A',
    31: 'A',
    32: 'A',
    33: 'A',
    34: 'A',
    35: 'A',
    36: 'A',
    37: 'A',
    38: 'A',
    39: 'A',
    41: 'A',
    42: 'A',
    43: 'A',
    44: 'A',
    45: 'A',
    46: 'A',
    47: 'A',
    48: 'A',
    49: 'A',
    50: 'A',
  }

  const handleSubmit = (values) => {
    fillPersonalityTest({answers: [values]}, history)
  }

  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <Row justify="center">
          <Col md={{span: 8}}>
            <Steps current={current}>
              {steps.map((_, i) => {
                return <Step key={i} />
              })}
            </Steps>
          </Col>
        </Row>
        <Formik initialValues={values} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              {current === 0 && <SectionOne formik={formik} />}
              {current === 1 && <SectionTwo formik={formik} />}

              <Row justify="space-between" style={{marginTop: '40px'}}>
                {current < steps.length - 1 && (
                  <ButtonControl
                    width={'max-content'}
                    value={'Next'}
                    height={'50px'}
                    htmlType="button"
                    isLoading={false}
                    handleClick={() => next()}
                  />
                )}
                {current > 0 && (
                  <ButtonControl
                    width={'max-content'}
                    value={'Previous'}
                    height={'50px'}
                    htmlType="button"
                    isLoading={false}
                    handleClick={() => prev()}
                  />
                )}
                {current === steps.length - 1 && (
                  <ButtonControl
                    width={'max-content'}
                    value={'Complete Test'}
                    height={'50px'}
                    type="primary"
                    htmlType="submit"
                    isLoading={personalityTestLoading}
                  />
                )}
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  personalityTestData: state.personality.personalityTestData,
  personalityTestLoading: state.personality.personalityTestLoading,
})

const mapDispatchToProps = (dispatch) => ({
  fillPersonalityTest: (data, history) => dispatch(personalityActions.fillPersonalityTest(data, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalityTest)
