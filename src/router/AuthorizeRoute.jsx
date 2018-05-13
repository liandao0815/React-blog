import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

@connect(state => ({ user: state.user }))
class AuthorizeRoute extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user, ...rest } = this.props
    return user.isLogin ? <Route {...rest} /> : <Route render={props => <Redirect to="/login" />} />
  }
}

export default AuthorizeRoute
