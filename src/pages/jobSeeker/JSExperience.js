import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Checkbox, Spin, Switch} from 'antd'
import {PlusOutlined, UploadOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router-dom'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import ButtonControl from '../../components/button/ButtonControl'
import {TextInput, SelectInput, DatePickerInput} from '../../components/FormInputs/CreateFormInput'
import jobSeekerActions from '../../redux/actions/jobSeekerActions'
import {countriesCodeName} from '../../utils/countries'

import './jobSeeker.css'
import moment from 'moment'

const JSExperience = ({
  jobSeekerAddInfo,
  jobSeekerGetInfo,
  addInfoLoading,
  seekerExpInfoData,
  seekerExpInfoLoading,
  readPdf,
  pdfUploadData,
  pdfUploadLoading,
}) => {
  const history = useHistory()
  const ref = useRef(null)
  const [pdfData, setPdfData] = useState({})

  const experienceSchema = Yup.object().shape({
    activeForWork: Yup.string(),
    relocate: Yup.string(),
    location: Yup.string(),
    typeOfWork: Yup.string().required('Type of work is required'),
    expectedSalary: Yup.number().required('Expected salary is required'),
    roles: Yup.array().min(1).required('Roles are required'),
    experience: Yup.array().of(
      Yup.object()
        .shape({
          employerName: Yup.string().required('Employer name is required'),
          title: Yup.string().required('Title is required'),
          location: Yup.string(),
          workHere: Yup.boolean(),
          startDate: Yup.string().required('Start date is required'),
          endDate: Yup.string().when('workHere', {
            is: false,
            then: Yup.string().required('End date is required'),
          }),
          summary: Yup.string(),
        })
        .required(),
    ),
    skills: Yup.array().min(1).required('Skills are required'),
  })

  useEffect(() => {
    jobSeekerGetInfo()
  }, [])

  const typeOfWork = [
    {label: 'Full-time', value: 'fullTime'},
    {label: 'Part-time', value: 'pastTime'},
    {label: 'Freelance', value: 'freelance'},
  ]

  const roles = [
    {label: 'Andriod', value: 'android'},
    {label: 'Backend', value: 'backend'},
    {label: 'Data Science', value: 'dataScience'},
    {label: 'Devops', value: 'devops'},
    {label: 'Frontend', value: 'frontend'},
    {label: 'Full Stack', value: 'fullStack'},
    {label: 'iOS', value: 'ios'},
    {label: 'Machine Learning', value: 'ml'},
    {label: 'QA Engineer', value: 'qa'},
  ]

  const skills = [
    {label: '1C', value: '1C'},
    {label: 'ActionScript', value: 'ActionScript'},
    {label: 'C#', value: 'C#'},
    {label: 'Clarion', value: 'Clarion'},
    {label: 'Cobra', value: 'Cobra'},
    {label: 'ColdFusion', value: 'ColdFusion'},
    {label: 'Dart', value: 'Dart'},
    {label: 'Eiffel', value: 'Eiffel'},
    {label: 'Go', value: 'Go'},
    {label: 'Gosu', value: 'Gosu'},
    {label: 'Groovy', value: 'Groovy'},
    {label: 'Harbour', value: 'Harbour'},
    {label: 'Haxe', value: 'Haxe'},
    {label: 'Java', value: 'Java'},
    {label: 'Javascript', value: 'Javascript'},
    {label: 'Kotlin', value: 'Kotlin'},
    {label: 'Nim', value: 'Nim'},
    {label: 'ObjectPascal', value: 'ObjectPascal'},
    {label: 'Opa', value: 'Opa'},
    {label: 'Perl', value: 'Perl'},
    {label: 'PHP', value: 'PHP'},
    {label: 'Python', value: 'Python'},
    {label: 'Ruby', value: 'Ruby'},
    {label: 'Rust', value: 'Rust'},
    {label: 'Scala', value: 'Scala'},
    {label: 'Seed7', value: 'Seed7'},
    {label: 'SmallTalk', value: 'SmallTalk'},
    {label: 'Tcl', value: 'Tcl'},
    {label: '.net', value: '.net'},
    {label: 'Xojo', value: 'Xojo'},
  ]
  useEffect(() => {
    if (pdfUploadData) {
      let workHistory = {employerName: '', title: '', location: '', startDate: '', endDate: ''}
      let userSkills = []
      if (pdfUploadData?.experience) {
        let experience = pdfUploadData?.experience.split('\n')
        let title = -1
        for (let i = 0; i < experience.length; i++) {
          const element = experience[i]
          if (
            new RegExp(
              /junior\b|senior\b|midsenior\b|mid-senior\b|engineer\b|fullstack\b|frontend\b|backend\b|front end\b|back end\b|full stack\b/,
              'i',
            ).test(element) &&
            workHistory.title === ''
          ) {
            workHistory.title = element
            title = i
            break
          }
        }
        for (let i = 0; i < experience.length; i++) {
          const element = experience[i]
          if (new RegExp(/company\b|inc\b/, 'i').test(element) && workHistory.employerName === '' && i < 4) {
            workHistory.employerName = element
            break
          }
          if (title !== 0 && workHistory.employerName === '') {
            workHistory.employerName = experience[0]
            break
          }
        }
      }
      if (pdfUploadData?.skills?.length > 0) {
        for (let i = 0; i < pdfUploadData?.skills?.length; i++) {
          const element = pdfUploadData?.skills[i]
          if (skills.map((zone) => zone.value).includes(element)) userSkills.push(element)
        }
      }
      setPdfData({workHistory, userSkills})
    }
  }, [pdfUploadData])
  const handleSubmit = (values) => {
    jobSeekerAddInfo(
      {
        ...values,
        experience: values.experience?.map((zone) => {
          delete zone._id
          return {
            ...zone,
            startDate: zone.startDate ? moment(zone.startDate, 'MM/YYYY').format('YYYY-MM-DD') : '',
            endDate: zone.endDate ? moment(zone.endDate, 'MM/YYYY').format('YYYY-MM-DD') : '',
          }
        }),
      },
      history,
    )
  }

  const handleUploadInput = (e) => {
    const reg = new RegExp('.pdf')
    if (!reg.test(e.target.files[0].type)) {
      return
    }
    const formData = new FormData()
    formData.append('file', e.target.files[0])

    readPdf(formData)
  }

  const handleRemove = (formik, id) => {
    let data = [...formik.values.experience]

    data.splice(id, 1)

    formik.setFieldValue('experience', data)
  }
  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <div className="main-title">Your Experience</div>
        {!seekerExpInfoData && (
          <>
            <div className="exp-pdf-uplaod">
              <label htmlFor="relocate">You can upload your CV/Resume as PDF to fill your information!</label>
              <ButtonControl
                width={'max-content'}
                value={'Upload CV/Resume'}
                height={'50px'}
                type="primary"
                htmlType="button"
                isLoading={addInfoLoading}
                buttonIcon={<UploadOutlined />}
                handleClick={() => ref.current.click()}
              />
            </div>
            <input
              ref={ref}
              type="file"
              onChange={handleUploadInput}
              multiple={false}
              style={{display: 'none'}}
              accept={'.pdf'}
            />
          </>
        )}
        {seekerExpInfoLoading || pdfUploadLoading ? (
          <Row justify="center">
            <Col>
              <Spin size="large" />
            </Col>
          </Row>
        ) : (
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              activeForWork: seekerExpInfoData?.activeForWork || false,
              relocate: seekerExpInfoData?.relocate || false,
              location: seekerExpInfoData?.location || '',
              roles: seekerExpInfoData?.roles || [],
              typeOfWork: seekerExpInfoData?.typeOfWork || '',
              expectedSalary: seekerExpInfoData?.expectedSalary || '',
              experience: seekerExpInfoData?.experience?.map((exp) => {
                return {
                  ...exp,
                  startDate: exp.startDate ? moment(exp.startDate, 'YYYY-MM-DD').format('MM/YYYY') : '',
                  endDate: exp.endDate ? moment(exp.endDate, 'YYYY-MM-DD').format('MM/YYYY') : '',
                }
              }) || [
                {
                  employerName: pdfData?.workHistory?.employerName || '',
                  title: pdfData?.workHistory?.title || '',
                  location: '',
                  workHere: false,
                  startDate: '',
                  endDate: '',
                  summary: '',
                },
              ],
              skills: seekerExpInfoData?.skills || pdfData?.userSkills || [],
            }}
            enableReinitialize
            validationSchema={experienceSchema}
          >
            {(formik) => (
              <Form>
                <Row gutter={[30, 10]}>
                  {console.log(pdfData)}
                  <Col span={12}>
                    <label style={{marginRight: '5px'}} htmlFor="activeForWork">
                      Are you actively looking for a job?
                    </label>
                    <Switch
                      name="activeForWork"
                      checked={formik.values.activeForWork}
                      onChange={(e) => {
                        formik.setFieldValue('activeForWork', e)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <label style={{marginRight: '5px'}} htmlFor="relocate">
                      Are you willing to relocate?
                    </label>
                    <Switch
                      name="relocate"
                      checked={formik.values.relocate}
                      onChange={(e) => {
                        formik.setFieldValue('relocate', e)
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <label htmlFor="location">Location:</label>
                    <Field
                      component={SelectInput}
                      name="location"
                      placeholder="Location"
                      selectOptions={countriesCodeName()}
                      validate={formik}
                      height="50px"
                      disabled={false}
                      readOnly={false}
                    />
                  </Col>
                  <Col span={12}>
                    <label htmlFor="roles">Which roles are you most interested in?</label>
                    <Field
                      component={SelectInput}
                      name="roles"
                      placeholder="Select..."
                      selectOptions={roles}
                      validate={formik}
                      height="50px"
                      mode="multiple"
                      allowClear
                      disabled={false}
                      readOnly={false}
                    />
                  </Col>
                  <Col span={12}>
                    <label htmlFor="typeOfWork">Type of work:</label>
                    <Field
                      component={SelectInput}
                      name="typeOfWork"
                      placeholder="Select..."
                      selectOptions={typeOfWork}
                      validate={formik}
                      height="50px"
                      disabled={false}
                      readOnly={false}
                    />
                  </Col>
                  <Col span={12}>
                    <label htmlFor="expectedSalary">Expected salary:</label>
                    <Field
                      component={TextInput}
                      type="number"
                      name="expectedSalary"
                      placeholder="40000"
                      validate={formik}
                      height="50px"
                      disabled={false}
                      readOnly={false}
                      addonAfter="USD"
                      extra={'Per month earnings'}
                    />
                  </Col>
                  <Col span={24}>
                    <label>Your work history</label>
                    <Row gutter={[30, 0]}>
                      {formik.values.experience.map((exp, i) => {
                        return (
                          <Col span={12} key={`exp-${i}`}>
                            <Row justify="space-between">
                              <Col>{i + 1}&#41;</Col>
                              {formik.values.experience.length > 1 && (
                                <Col className="info-add-another" onClick={() => handleRemove(formik, i)}>
                                  Remove
                                </Col>
                              )}
                            </Row>
                            <Row gutter={[30, 0]}>
                              <Col span={24}>
                                <Field
                                  component={TextInput}
                                  name={`experience[${i}].employerName`}
                                  placeholder="Employer name"
                                  type="text"
                                  arrayTouched={
                                    (formik.touched?.experience && formik.touched?.experience[i]?.employerName) || ''
                                  }
                                  arrayError={
                                    (formik.errors?.experience && formik.errors?.experience[i]?.employerName) || ''
                                  }
                                  validate={formik}
                                  height="50px"
                                  outlined={false}
                                  disabled={false}
                                  readOnly={false}
                                />
                              </Col>
                            </Row>
                            <Row gutter={[30, 0]}>
                              <Col span={24}>
                                <Field
                                  component={TextInput}
                                  name={`experience[${i}].title`}
                                  placeholder="Title"
                                  type="text"
                                  validate={formik}
                                  arrayTouched={
                                    (formik.touched?.experience && formik.touched?.experience[i]?.title) || ''
                                  }
                                  arrayError={(formik.errors?.experience && formik.errors?.experience[i]?.title) || ''}
                                  height="50px"
                                  outlined={false}
                                  disabled={false}
                                  readOnly={false}
                                />
                              </Col>
                            </Row>
                            <Row gutter={[30, 0]}>
                              <Col span={24}>
                                <Field
                                  component={TextInput}
                                  name={`experience[${i}].location`}
                                  placeholder="Location (Optional)"
                                  type="text"
                                  arrayTouched={
                                    (formik.touched?.experience && formik.touched?.experience[i]?.location) || ''
                                  }
                                  arrayError={
                                    (formik.errors?.experience && formik.errors?.experience[i]?.location) || ''
                                  }
                                  validate={formik}
                                  height="50px"
                                  outlined={false}
                                  disabled={false}
                                  readOnly={false}
                                />
                              </Col>
                            </Row>
                            <Row gutter={[30, 0]}>
                              <Col span={24}>
                                <Checkbox
                                  onChange={(e) => formik.setFieldValue(`experience[${i}].workHere`, e.target.checked)}
                                >
                                  I currently work here
                                </Checkbox>
                              </Col>
                            </Row>
                            <Row gutter={[30, 0]}>
                              <Col span={24}>
                                <Row>
                                  <Col span={!formik.values.experience[i].workHere ? 12 : 24}>
                                    <Field
                                      component={DatePickerInput}
                                      name={`experience[${i}].startDate`}
                                      maxDate={formik.values.experience[i].endDate}
                                      placeholder="Start date"
                                      validate={formik}
                                      picker="month"
                                      arrayTouched={
                                        (formik.touched?.experience && formik.touched?.experience[i]?.startDate) || ''
                                      }
                                      arrayError={
                                        (formik.errors?.experience && formik.errors?.experience[i]?.startDate) || ''
                                      }
                                      format={'MM/YYYY'}
                                      allowClear={false}
                                      isOutlined={true}
                                      disabled={false}
                                      height="50px"
                                    />
                                  </Col>
                                  {!formik.values.experience[i].workHere && (
                                    <Col span={12}>
                                      <Field
                                        component={DatePickerInput}
                                        name={`experience[${i}].endDate`}
                                        minDate={formik.values.experience[i].startDate}
                                        placeholder="End date"
                                        arrayTouched={
                                          (formik.touched?.experience && formik.touched?.experience[i]?.endDate) || ''
                                        }
                                        arrayError={
                                          (formik.errors?.experience && formik.errors?.experience[i]?.endDate) || ''
                                        }
                                        validate={formik}
                                        picker="month"
                                        format={'MM/YYYY'}
                                        allowClear={false}
                                        isOutlined={true}
                                        disabled={false}
                                        height="50px"
                                      />
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                            </Row>
                            <Row gutter={[30, 0]}>
                              <Col span={24}>
                                <Field
                                  component={TextInput}
                                  name={`experience[${i}].summary`}
                                  placeholder="Summary (Optional)"
                                  type="textarea"
                                  rows={4}
                                  arrayTouched={
                                    (formik.touched?.experience && formik.touched?.experience[i]?.summary) || ''
                                  }
                                  arrayError={
                                    (formik.errors?.experience && formik.errors?.experience[i]?.summary) || ''
                                  }
                                  validate={formik}
                                  outlined={false}
                                  disabled={false}
                                  readOnly={false}
                                />
                              </Col>
                            </Row>
                          </Col>
                        )
                      })}
                    </Row>
                    <div
                      className="info-add-another"
                      onClick={() =>
                        formik.setFieldValue('experience', [
                          ...formik.values.experience,
                          {
                            employerName: '',
                            title: '',
                            location: '',
                            workHere: false,
                            startDate: '',
                            endDate: '',
                            summary: '',
                          },
                        ])
                      }
                    >
                      <PlusOutlined />
                      Add another
                    </div>
                  </Col>
                  <Col span={12}>
                    <label htmlFor="location">
                      Which technologies/skills are you most experienced and interested in working with?
                    </label>
                    <Field
                      component={SelectInput}
                      name="skills"
                      placeholder="Select..."
                      selectOptions={skills}
                      validate={formik}
                      height="50px"
                      mode="multiple"
                      allowClear
                      disabled={false}
                      readOnly={false}
                    />
                  </Col>
                  <Col span={24}>
                    <ButtonControl
                      width={'max-content'}
                      value={'Save'}
                      height={'50px'}
                      type="primary"
                      htmlType="submit"
                      isLoading={addInfoLoading}
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        )}
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  addInfoLoading: state.jobSeeker.addInfoLoading,

  seekerExpInfoData: state.jobSeeker.seekerExpInfoData,
  seekerExpInfoLoading: state.jobSeeker.seekerExpInfoLoading,

  pdfUploadData: state.jobSeeker.pdfUploadData,
  pdfUploadLoading: state.jobSeeker.pdfUploadLoading,
})

const mapDispatchToProps = (dispatch) => ({
  jobSeekerAddInfo: (data, history) => dispatch(jobSeekerActions.jobSeekerAddInfo(data, history)),
  jobSeekerGetInfo: () => dispatch(jobSeekerActions.jobSeekerGetInfo()),
  readPdf: (data) => dispatch(jobSeekerActions.readPdf(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(JSExperience)
