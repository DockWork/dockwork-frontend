import React from 'react'
import {connect} from 'react-redux'

export const home = () => {
  return <div>hi</div>
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(home)
