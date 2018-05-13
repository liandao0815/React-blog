import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { operateMessage, getUserArticle } from 'store/action'
import Alert from '@/alert/Alert'
import Sidebar from '@/sidebar/Sidebar'
import Footer from '@/footer/Footer'
import InfoModify from './info-modify/InfoModify'
import ArticleManage from './article-manage/ArticleManage'
import CategoryManage from './category-manage/CategoryManage'
import style from './style.scss'

@connect(state => ({ user: state.user }), { operateMessage, getUserArticle })
class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    operateMessage: PropTypes.func.isRequired,
    getUserArticle: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      userArticle: ''
    }
  }

  componentDidMount() {
    this.props.getUserArticle()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  closeAlert = () => {
    this.props.operateMessage('')
  }

  render() {
    const { location, match, user } = this.props

    return (
      <React.Fragment>
        <Sidebar />
        <Footer />
        <Alert show={!!user.msg} type="info">
          {user.msg}
          <button className={style['alert-button']} onClick={this.closeAlert}>
            关闭
          </button>
        </Alert>
        <div className={style['user-center']}>
          <ul className={style.tabs}>
            <li>
              <NavLink to={`${match.path}/infoModify`}>信息修改</NavLink>
            </li>
            <li>
              <NavLink to={`${match.path}/articleManage`}>文章管理</NavLink>
            </li>
            <li>
              <NavLink to={`${match.path}/categoryManage`}>标签管理</NavLink>
            </li>
          </ul>
          <TransitionGroup component="main">
            <CSSTransition key={location.pathname} classNames="fade" timeout={500} exit={false}>
              <section className={style['page-main']}>
                <Switch>
                  <Route path={`${match.path}/infoModify`} component={InfoModify} />
                  <Route path={`${match.path}/articleManage`} component={ArticleManage} />
                  <Route path={`${match.path}/categoryManage`} component={CategoryManage} />
                  <Redirect from={`${match.path}`} to={`${match.path}/infoModify`} />
                </Switch>
              </section>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </React.Fragment>
    )
  }
}

export default User
