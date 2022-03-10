import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {Row, Col, Select, Alert} from 'antd'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'
import AceEditor from 'react-ace'
import ButtonControl from '../../components/button/ButtonControl'
import {CodeBlock, monokai, tomorrow} from 'react-code-blocks'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'

import './editor.css'

const {Option} = Select

const Editor = ({
  getTestDetails,
  testDetailsData,
  testDetailsLoading,
  submitSkillTest,
  skillTestResult,
  skillTestLoading,
}) => {
  const [codeValue, setCodeValue] = useState('')
  const [readOnlyValue, setReadOnlyValue] = useState(true)
  const [editorTheme, setEditorTheme] = useState('monokai')
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    getTestDetails(params.testId, history)
    if (localStorage.getItem('editor_theme')) {
      setEditorTheme(localStorage.getItem('editor_theme'))
    }
  }, [])

  useEffect(() => {
    setReadOnlyValue(Boolean(!testDetailsData.language))
  }, [testDetailsData])

  const handleChangeTheme = (e) => {
    setEditorTheme(e)
    localStorage.setItem('editor_theme', e)
  }

  const renderErrors = () => {
    if (skillTestResult.status === -1) {
      return (
        <div style={{backgroundColor: 'red', color: 'white'}}>
          <div>Error!</div>
          <div>Message:-{skillTestResult.message}</div>
        </div>
      )
    } else if (skillTestResult.status === 2) {
      return (
        <div>
          {skillTestResult?.message?.map((test, i) => {
            return (
              <Alert
                style={{marginTop: '20px'}}
                key={i}
                message={`Case ${i}`}
                description={
                  <div>
                    <div>Expected: {test.expected}</div>
                    <div>Output: {test.actual}</div>
                  </div>
                }
                type={test?.success ? 'success' : 'error'}
                showIcon
              />
            )
          })}
        </div>
      )
    } else {
      return <></>
    }
  }

  return (
    <Row>
      <Col md={{span: 16, offset: 4}} xs={{span: 22, offset: 1}} style={{marginBottom: '30px'}}>
        <Row justify="space-between">
          <Col>
            <div className="main-title">
              {testDetailsData?.language} Level: {testDetailsData?.level}
            </div>
          </Col>
          <Col>
            <Select defaultValue="monokai" style={{width: 120}} onChange={handleChangeTheme}>
              <Option value="monokai">Monokai</Option>
              <Option value="tomorrow">Tomorrow</Option>
            </Select>
          </Col>
        </Row>
      </Col>
      <Col md={{span: 7, offset: 4}} xs={{span: 22, offset: 1}}>
        <div className="skill-test">
          {testDetailsData?.question?.map((section, i) => {
            return (
              <div key={`section-${i}`}>
                <div dangerouslySetInnerHTML={{__html: section.title}} />
                <div dangerouslySetInnerHTML={{__html: section.body}} />
              </div>
            )
          })}
          <div className="input">Input:</div>
          <CodeBlock
            language="javascript"
            text={testDetailsData?.input ? JSON.parse(testDetailsData?.input)[0] : ''}
            showLineNumbers={true}
            theme={editorTheme === 'monokai' ? monokai : tomorrow}
            wrapLines={true}
            codeBlock
          />
          <div className="input">Result:</div>
          <CodeBlock
            language="javascript"
            text={testDetailsData?.input ? JSON.parse(testDetailsData?.result)[0] : ''}
            showLineNumbers={true}
            theme={editorTheme === 'monokai' ? monokai : tomorrow}
            wrapLines={true}
            codeBlock
          />

          <div className="input">Description:</div>
          <div className="">{testDetailsData?.description}</div>
          <ButtonControl
            width={'max-content'}
            value={'Submit'}
            height={'50px'}
            type="primary"
            htmlType="button"
            isLoading={skillTestLoading}
            handleClick={() => {
              submitSkillTest(
                params.testId,
                {lang: testDetailsData?.language, code: codeValue},
                testDetailsData?.level,
                history,
              )
            }}
          />
        </div>
      </Col>
      <Col md={{span: 12, offset: 1}} xs={{span: 22, offset: 1}}>
        <AceEditor
          className="skill-editor"
          placeholder="// Code goes here"
          mode="javascript"
          theme={editorTheme}
          name="editor"
          // onLoad={() => {}}
          readOnly={testDetailsLoading || readOnlyValue}
          onChange={(e) => {
            setCodeValue(e)
          }}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={codeValue}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Col>
      <Col md={{span: 16, offset: 4}} xs={{span: 22, offset: 1}}>
        <div>{renderErrors()}</div>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  testDetailsData: state.jobSeeker.testDetailsData,
  testDetailsLoading: state.jobSeeker.testDetailsLoading,
  skillTestResult: state.jobSeeker.skillTestResult,
  skillTestLoading: state.jobSeeker.skillTestLoading,
})

const mapDispatchToProps = (dispatch) => ({
  getTestDetails: (testId, history) => {
    dispatch(jobSeekerActions.getTestDetails(testId, history))
  },
  submitSkillTest: (testId, data, lvl, history) => {
    dispatch(jobSeekerActions.submitSkillTest(testId, data, lvl, history))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
