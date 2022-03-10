import React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Radio} from 'antd'

import './PersonalityTest.css'

export const SectionOne = ({formik}) => {
  return (
    <Row justify="center">
      <Col span={24}>
        <div className="personality-test-title">Section 1</div>
        <div className="personality-test-section-type">
          Which answer comes closer to telling how you usually feel or act?
        </div>
        <div className="question-holder">
          <div className="question">
            <span>1 -</span> When you go somewhere for the day, would you rather
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(1, e.target.value)}
          >
            <Radio value="A">Plan what you will do and when</Radio>
            <Radio value="B">Just go!</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>2 -</span> If you were a teacher, would you rather teach
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(2, e.target.value)}
          >
            <Radio value="A">Facts-based courses</Radio>
            <Radio value="B">Courses involving opinion or theory</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>3 -</span> Are you usually
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(3, e.target.value)}
          >
            <Radio value="A">A &quot;Good mixer&quot; with groups of people</Radio>
            <Radio value="B">Rather quite and reserved</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>4 -</span> Do you more often let
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(4, e.target.value)}
          >
            <Radio value="A">Your heart rule your head</Radio>
            <Radio value="B">Your head rule your heart</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>5 -</span> In doing something that many other people do
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(5, e.target.value)}
          >
            <Radio value="A">Invent a way of your own</Radio>
            <Radio value="B">Do it in the accepted way</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>6 -</span> Amongs your friends are you
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(6, e.target.value)}
          >
            <Radio value="A">Full of news about everybody</Radio>
            <Radio value="B">One of the last to hear what is going on</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>7 -</span> Does the idea of making a list of what you should get done over a weekend
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(7, e.target.value)}
          >
            <Radio value="A">Help you</Radio>
            <Radio value="B">Stress you</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>8 -</span> When you have a special job to do, do you like to
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(8, e.target.value)}
          >
            <Radio value="A">organize it carefully before you start</Radio>
            <Radio value="B">Find out what is necessary as you go along</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>9 -</span> Do you tend to have
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(9, e.target.value)}
          >
            <Radio value="A">Broad friendship with many different people</Radio>
            <Radio value="B">Deep friendship with very few people</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>10 -</span> Do you admire more the people who are
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(10, e.target.value)}
          >
            <Radio value="A">Normal-acting to never make themselves the center of attention</Radio>
            <Radio value="B">Too original and individual to care whether they are the center of attention or not</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>11 -</span> Do you prefer to
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(11, e.target.value)}
          >
            <Radio value="A">Arrange picnics, parties ect, well in advance</Radio>
            <Radio value="B">Be free to do whatever to looks like fun when the time comes</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>12 -</span> Do you usually get along better with
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(12, e.target.value)}
          >
            <Radio value="A">Realistic people</Radio>
            <Radio value="B">Imaginative people</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>13 -</span> When you are with the group of people, would you usually rather
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(13, e.target.value)}
          >
            <Radio value="A">Join in the talk of the group</Radio>
            <Radio value="B">Stand back and listen first</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>14 -</span> Is it a higher compliment to be called
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(14, e.target.value)}
          >
            <Radio value="A">A person of real feelings</Radio>
            <Radio value="B">A consistently reasonable person</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>15 -</span> In reading for pleasure, do you
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(15, e.target.value)}
          >
            <Radio value="A">Enjoy odd or original ways of saying things</Radio>
            <Radio value="B">Like writters to say exactly what they mean</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>16 -</span> Do you
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(16, e.target.value)}
          >
            <Radio value="A">Talk easily to almost anyone for as long as you have to</Radio>
            <Radio value="B">Find a lot to say only to certain poeple or under certain conditions</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>17 -</span> Does following a schedule
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(17, e.target.value)}
          >
            <Radio value="A">Appeal to you</Radio>
            <Radio value="B">Cramp you</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>18 -</span> When it is settled well in advance that you will do a certain thing at a certain time, do
            you find it
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(18, e.target.value)}
          >
            <Radio value="A">Nice to be able to plan accordingly</Radio>
            <Radio value="B">A little unpleasant to be tied down</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>19 -</span> Are you more successful
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(19, e.target.value)}
          >
            <Radio value="A">At following a carefully worked out plan</Radio>
            <Radio value="B">At dealing with the unexpected and seeing quickly what should be done</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>20 -</span> Would you rather be considered
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(20, e.target.value)}
          >
            <Radio value="A">A partial person</Radio>
            <Radio value="B">An out-of-the-box-thinking person</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>21 -</span> In a large group, do you more often
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(21, e.target.value)}
          >
            <Radio value="A">Introduce others</Radio>
            <Radio value="B">Get introduced</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>22 -</span> Do you usually
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(22, e.target.value)}
          >
            <Radio value="A">Value emotion more than logic</Radio>
            <Radio value="B">Value logic more than feelings</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>23 -</span> Would you rather have as a friend
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(23, e.target.value)}
          >
            <Radio value="A">Someone who is always coming up with new ideas</Radio>
            <Radio value="B">Someone who has both feet on the ground</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>24 -</span> Can the new poeple you meet tell what you are interested in
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(24, e.target.value)}
          >
            <Radio value="A">Right away</Radio>
            <Radio value="B">Only after they really get to know you</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>25 -</span> In your daily work do you
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(25, e.target.value)}
          >
            <Radio value="A">Usually plan your work so you won&apos;t need to work under pressure</Radio>
            <Radio value="B">Rather enjoy an emergency that makes you work against time</Radio>
          </Radio.Group>
        </div>
        <div className="question-holder">
          <div className="question">
            <span>26 -</span> Do you usually
          </div>
          <Radio.Group
            className="quest-group"
            defaultValue={'A'}
            onChange={(e) => formik.setFieldValue(26, e.target.value)}
          >
            <Radio value="A">Show your feelings freely</Radio>
            <Radio value="B">Kepp your feelings to yourself</Radio>
          </Radio.Group>
        </div>
      </Col>
    </Row>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SectionOne)
