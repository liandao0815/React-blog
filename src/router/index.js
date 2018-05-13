import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserInfo, getAllCategory } from 'store/action'
import AuthorizeRoute from './AuthorizeRoute'
import asyncComponent from './asyncComponent'

const Home = asyncComponent(() => import('../containers/home/Home'))
const Login = asyncComponent(() => import('../containers/login/Login'))
const Detail = asyncComponent(() => import('../containers/detail/Detail'))
const User = asyncComponent(() => import('../containers/user/User'))
const Publish = asyncComponent(() => import('../containers/publish/Publish'))

@connect(null, { getUserInfo, getAllCategory })
class RouterComponent extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    getAllCategory: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { getUserInfo, getAllCategory } = this.props
    getUserInfo()
    getAllCategory()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <AuthorizeRoute path="/user" component={User} />
          <AuthorizeRoute path="/detail" component={Detail} />
          <AuthorizeRoute path="/publish" component={Publish} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}

export default RouterComponent
