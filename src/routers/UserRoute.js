import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const UserRoute = ({component: Component, accessToken, ...rest}) => {
  try {
    return (
      <Route
        {...rest}
        render={(props) =>
          !accessToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: props.location},
              }}
            />
          )
        }
      />
    )
  } catch (error) {
    return console.log('USER ERROR', error)
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
})

export default connect(mapStateToProps)(UserRoute)
