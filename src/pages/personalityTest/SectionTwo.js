import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Radio} from 'antd'

export const SectionTwo = ({formik}) => {
  return (
    <Row justify="center">
      <Col span={24}>
        <div className="personality-test-title">Section 2</div>
        <div className="personality-test-section-type">Which word in each paid appeals to you more?</div>
        <Row gutter={[0, 20]}>
          <Col span={8}>
            <Row justify="center">
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>27 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(27, e.target.value)}
                  >
                    <Radio value="A">SCHEDULED</Radio>
                    <Radio value="B">UNPLANNED</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>28 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(28, e.target.value)}
                  >
                    <Radio value="A">FACTS</Radio>
                    <Radio value="B">IDEAS</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>29 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(29, e.target.value)}
                  >
                    <Radio value="A">QUITE</Radio>
                    <Radio value="B">HEARTY</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>30 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(30, e.target.value)}
                  >
                    <Radio value="A">CONVINCING</Radio>
                    <Radio value="B">TOUCHING</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>31 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(31, e.target.value)}
                  >
                    <Radio value="A">IMAGINATIVE</Radio>
                    <Radio value="B">MATTER-OF-FACT</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>32 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(32, e.target.value)}
                  >
                    <Radio value="A">BENEFITS</Radio>
                    <Radio value="B">BLESSINGS</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>33 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(33, e.target.value)}
                  >
                    <Radio value="A">PEACEMAKER</Radio>
                    <Radio value="B">JUDGE</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>34 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(34, e.target.value)}
                  >
                    <Radio value="A">SYSTEMATIC</Radio>
                    <Radio value="B">SPOUNTANEOUS</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row justify="center">
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>35 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(35, e.target.value)}
                  >
                    <Radio value="A">STATEMENT</Radio>
                    <Radio value="B">CONCEPT</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>36 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(36, e.target.value)}
                  >
                    <Radio value="A">RESERVED</Radio>
                    <Radio value="B">TALKATIVE</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>37 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(37, e.target.value)}
                  >
                    <Radio value="A">ANALYZE</Radio>
                    <Radio value="B">SYMPATHIZE</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>38 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(38, e.target.value)}
                  >
                    <Radio value="A">CREATE</Radio>
                    <Radio value="B">MAKE</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>39 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(39, e.target.value)}
                  >
                    <Radio value="A">DETERMINED</Radio>
                    <Radio value="B">DEVOTED</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>40 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(40, e.target.value)}
                  >
                    <Radio value="A">GENTLE</Radio>
                    <Radio value="B">FIRM</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>41 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(41, e.target.value)}
                  >
                    <Radio value="A">SYSTEMATIC</Radio>
                    <Radio value="B">CASUAL</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>42 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(42, e.target.value)}
                  >
                    <Radio value="A">CERTAINTY</Radio>
                    <Radio value="B">THEORY</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row justify="center">
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>43 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(43, e.target.value)}
                  >
                    <Radio value="A">CALM</Radio>
                    <Radio value="B">LIVELY</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>44 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(44, e.target.value)}
                  >
                    <Radio value="A">JUSTICE</Radio>
                    <Radio value="B">MERCY</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>45 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(45, e.target.value)}
                  >
                    <Radio value="A">FASCINATING</Radio>
                    <Radio value="B">SENSIBLE</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>46 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(46, e.target.value)}
                  >
                    <Radio value="A">FIRM-MINDED</Radio>
                    <Radio value="B">WARM HEARTED</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>47 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(47, e.target.value)}
                  >
                    <Radio value="A">FEELING</Radio>
                    <Radio value="B">THINKING</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>48 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(48, e.target.value)}
                  >
                    <Radio value="A">LITERAL</Radio>
                    <Radio value="B">FIGURATIVE</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>49 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(49, e.target.value)}
                  >
                    <Radio value="A">ANTICIPATION</Radio>
                    <Radio value="B">COMPASSION</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={24}>
                <div className="question-holder-sec2">
                  <div className="question">
                    <span>50 -</span>
                  </div>
                  <Radio.Group
                    className="quest-group"
                    defaultValue={'A'}
                    onChange={(e) => formik.setFieldValue(50, e.target.value)}
                  >
                    <Radio value="A">HARD</Radio>
                    <Radio value="B">SOFT</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SectionTwo)
