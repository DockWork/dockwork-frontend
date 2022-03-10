import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Row, Col, Checkbox} from 'antd'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {TextInput, SelectInput} from '../../components/FormInputs/CreateFormInput'
import recruiterActions from '../../redux/actions/recruiterActions'
import {countriesCodeName} from '../../utils/countries'
import ButtonControl from '../../components/button/ButtonControl'

const AdvancedSearch = ({matchSearchLoading, matchSearch}) => {
  const history = useHistory()

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

  const badges = [
    {label: '1C level 1', value: '1C|1'},
    {label: '1C level 2', value: '1C|2'},
    {label: '1C level 3', value: '1C|3'},
    {label: 'ActionScript level 1', value: 'ActionScript|1'},
    {label: 'ActionScript level 2', value: 'ActionScript|2'},
    {label: 'ActionScript level 3', value: 'ActionScript|3'},
    {label: 'C# level 1', value: 'C#|1'},
    {label: 'C# level 2', value: 'C#|2'},
    {label: 'C# level 3', value: 'C#|3'},
    {label: 'Clarion level 1', value: 'Clarion|1'},
    {label: 'Clarion level 2', value: 'Clarion|2'},
    {label: 'Clarion level 3', value: 'Clarion|3'},
    {label: 'Cobra level 1', value: 'Cobra|1'},
    {label: 'Cobra level 2', value: 'Cobra|2'},
    {label: 'Cobra level 3', value: 'Cobra|3'},
    {label: 'ColdFusion level 1', value: 'ColdFusion|1'},
    {label: 'ColdFusion level 2', value: 'ColdFusion|2'},
    {label: 'ColdFusion level 3', value: 'ColdFusion|3'},
    {label: 'Dart level 1', value: 'Dart|1'},
    {label: 'Dart level 2', value: 'Dart|2'},
    {label: 'Dart level 3', value: 'Dart|3'},
    {label: 'Eiffel level 1', value: 'Eiffel|1'},
    {label: 'Eiffel level 2', value: 'Eiffel|2'},
    {label: 'Eiffel level 3', value: 'Eiffel|3'},
    {label: 'Go level 1', value: 'Go|1'},
    {label: 'Go level 2', value: 'Go|2'},
    {label: 'Go level 3', value: 'Go|3'},
    {label: 'Gosu level 1', value: 'Gosu|1'},
    {label: 'Gosu level 2', value: 'Gosu|2'},
    {label: 'Gosu level 3', value: 'Gosu|3'},
    {label: 'Groovy level 1', value: 'Groovy|1'},
    {label: 'Groovy level 2', value: 'Groovy|2'},
    {label: 'Groovy level 3', value: 'Groovy|3'},
    {label: 'Harbour level 1', value: 'Harbour|1'},
    {label: 'Harbour level 2', value: 'Harbour|2'},
    {label: 'Harbour level 3', value: 'Harbour|3'},
    {label: 'Haxe level 1', value: 'Haxe|1'},
    {label: 'Haxe level 2', value: 'Haxe|2'},
    {label: 'Haxe level 3', value: 'Haxe|3'},
    {label: 'Java level 1', value: 'Java|1'},
    {label: 'Java level 2', value: 'Java|2'},
    {label: 'Java level 3', value: 'Java|3'},
    {label: 'Javascript level 1', value: 'Javascript|1'},
    {label: 'Javascript level 2', value: 'Javascript|2'},
    {label: 'Javascript level 3', value: 'Javascript|3'},
    {label: 'Kotlin level 1', value: 'Kotlin|1'},
    {label: 'Kotlin level 2', value: 'Kotlin|2'},
    {label: 'Kotlin level 3', value: 'Kotlin|3'},
    {label: 'Nim level 1', value: 'Nim|1'},
    {label: 'Nim level 2', value: 'Nim|2'},
    {label: 'Nim level 3', value: 'Nim|3'},
    {label: 'ObjectPascal level 1', value: 'ObjectPascal|1'},
    {label: 'ObjectPascal level 2', value: 'ObjectPascal|2'},
    {label: 'ObjectPascal level 3', value: 'ObjectPascal|3'},
    {label: 'Opa level 1', value: 'Opa|1'},
    {label: 'Opa level 2', value: 'Opa|2'},
    {label: 'Opa level 3', value: 'Opa|3'},
    {label: 'Perl level 1', value: 'Perl|1'},
    {label: 'Perl level 2', value: 'Perl|2'},
    {label: 'Perl level 3', value: 'Perl|3'},
    {label: 'PHP level 1', value: 'PHP|1'},
    {label: 'PHP level 2', value: 'PHP|2'},
    {label: 'PHP level 3', value: 'PHP|3'},
    {label: 'Python level 1', value: 'Python|1'},
    {label: 'Python level 2', value: 'Python|2'},
    {label: 'Python level 3', value: 'Python|3'},
    {label: 'Ruby level 1', value: 'Ruby|1'},
    {label: 'Ruby level 2', value: 'Ruby|2'},
    {label: 'Ruby level 3', value: 'Ruby|3'},
    {label: 'Rust level 1', value: 'Rust|1'},
    {label: 'Rust level 2', value: 'Rust|2'},
    {label: 'Rust level 3', value: 'Rust|3'},
    {label: 'Scala level 1', value: 'Scala|1'},
    {label: 'Scala level 2', value: 'Scala|2'},
    {label: 'Scala level 3', value: 'Scala|3'},
    {label: 'Seed7 level 1', value: 'Seed7|1'},
    {label: 'Seed7 level 2', value: 'Seed7|2'},
    {label: 'Seed7 level 3', value: 'Seed7|3'},
    {label: 'SmallTalk level 1', value: 'SmallTalk|1'},
    {label: 'SmallTalk level 2', value: 'SmallTalk|2'},
    {label: 'SmallTalk level 3', value: 'SmallTalk|3'},
    {label: 'Tcl level 1', value: 'Tcl|1'},
    {label: 'Tcl level 2', value: 'Tcl|2'},
    {label: 'Tcl level 3', value: 'Tcl|3'},
    {label: '.net level 1', value: '.net|1'},
    {label: '.net level 2', value: '.net|2'},
    {label: '.net level 3', value: '.net|3'},
    {label: 'Xojo level 1', value: 'Xojo|1'},
    {label: 'Xojo level 2', value: 'Xojo|2'},
    {label: 'Xojo level 3', value: 'Xojo|3'},
  ]

  const values = {
    name: '',
    location: '',
    remote: false,
    role: '',
    skills: [],
    preferedBadge: [],
    minimumSalary: '',
    maximumSalary: '',
  }

  const searchSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required'),
    remote: Yup.boolean(),
    role: Yup.string().required('Role is required'),
    skills: Yup.array().of(Yup.string()).min(1).required('Skills is required'),
    preferedBadge: Yup.array().of(Yup.string()),
    minimumSalary: Yup.number().required('Minimum salary is required'),
    // .lessThan('maximumSalary', 'Cannot be bigger than maximum salary'),
    maximumSalary: Yup.number().required('Maximum salary is required'),
    // .moreThan('minimumSalary', 'Cannot be smaller than minimum salary'),
  })

  const handleSearch = (values) => {
    let badge = values.preferedBadge
    let finalVal = {...values}

    let data = []

    for (let i = 0; i < badge.length; i++) {
      const element = badge[i]

      let d = element.split('|')

      data.push({name: d[0], level: d[1]})
    }

    finalVal.preferedBadge = data
    matchSearch({...finalVal, minimumSalary: +finalVal.minimumSalary, maximumSalary: +finalVal.maximumSalary}, history)
  }

  return (
    <Row justify="center">
      <Col md={{span: 16}} xs={{span: 22}}>
        <div className="main-title">Search for a job seeker</div>

        <Formik initialValues={values} validationSchema={searchSchema} onSubmit={handleSearch}>
          {(formik) => (
            <Form>
              <Row gutter={[30, 20]} style={{marginTop: '40px'}}>
                <Col span={12}>
                  <label htmlFor="name">Company name:</label>
                  <Field
                    component={TextInput}
                    name="name"
                    placeholder="Company name"
                    type="text"
                    validate={formik}
                    height="50px"
                    outlined={false}
                    disabled={false}
                    readOnly={false}
                  />
                </Col>
                <Col span={12}>
                  <label htmlFor="location">Company location country:</label>
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
                  <label htmlFor="role">Role you are looking for:</label>
                  <Field
                    component={SelectInput}
                    name="role"
                    placeholder="Select role"
                    selectOptions={roles}
                    validate={formik}
                    height="50px"
                    disabled={false}
                    readOnly={false}
                  />
                </Col>
                <Col span={12}>
                  <label htmlFor="skills">Sets of skills you are looking for:</label>
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
                <Col span={12}>
                  <label htmlFor="preferedBadge">Prefered skills badges:</label>
                  <Field
                    component={SelectInput}
                    name="preferedBadge"
                    placeholder="Select..."
                    selectOptions={badges}
                    validate={formik}
                    height="50px"
                    mode="multiple"
                    allowClear
                    disabled={false}
                    readOnly={false}
                  />
                </Col>
                <Col span={12}>
                  <label htmlFor="salary">Salary range:</label>
                  <Row gutter={[10, 0]}>
                    <Col span={12}>
                      <Field
                        component={TextInput}
                        name="minimumSalary"
                        placeholder="minimum"
                        type="number"
                        validate={formik}
                        height="50px"
                        outlined={false}
                        disabled={false}
                        readOnly={false}
                      />
                    </Col>
                    <Col span={12}>
                      <Field
                        component={TextInput}
                        name="maximumSalary"
                        placeholder="maximum"
                        type="number"
                        validate={formik}
                        height="50px"
                        outlined={false}
                        disabled={false}
                        readOnly={false}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Checkbox onChange={(e) => formik.setFieldValue(`remote`, e.target.checked)}>
                    Willing to work remotely
                  </Checkbox>
                </Col>
                <Col span={24}>
                  <ButtonControl
                    width={'max-content'}
                    value={'Search'}
                    type="primary"
                    height={'50px'}
                    htmlType="submit"
                    isLoading={matchSearchLoading}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({
  matchSearchLoading: state.recruiter.matchSearchLoading,
})

const mapDispatchToProps = (dispatch) => ({
  matchSearch: (data, history) => dispatch(recruiterActions.matchSearch(data, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
