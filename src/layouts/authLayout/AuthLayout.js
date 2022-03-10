import React from 'react'
import {Route} from 'react-router-dom'

import Header from './Header'

const AuthLayout = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <div>
        <Header />

        <Component {...matchProps} />

        {/* AUTH FOOTER IF ANY */}
      </div>
    )}
  />
)
export default AuthLayout
