import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { cancelAuthorize, clearCategory, initialPage } from 'store/action'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import Collapse, { Panel } from 'rc-collapse'
import * as http from '../../api'
import 'rc-collapse/assets/index.css'
import style from './style.scss'

@withRouter
@connect(
  state => ({
    user: state.user,
    category: state.category
  }),
  { cancelAuthorize, clearCategory, initialPage }
)
class Sidebar extends PureComponent {
  static proptypes = {
    user: PropTypes.object.isRequired,
    category: PropTypes.array.isRequired,
    cancelAuthorize: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      item: []
    }
  }

  hideSidebar = () => {
    this.setState({
      show: false
    })
  }

  showSidebar = () => {
    this.setState({
      show: true
    })
  }

  changeUrl = e => {
    const history = this.props.history
    const toUrl = e.currentTarget.dataset.url
    history.push(toUrl)
  }

  toCollect = () => {
    const { user, history } = this.props
    const location = {
      pathname: '/',
      state: {
        articleData: user.collect,
        title: '我的收藏'
      }
    }
    history.push(location)
  }

  toCategory = e => {
    const categoryid = e.target.dataset.categoryid
    const title = e.target.innerHTML
    const history = this.props.history

    http.queryOneCategory(categoryid).then(res => {
      if (res.data.code === 0) {
        const location = {
          pathname: '/',
          state: {
            articleData: res.data.data,
            title: title
          }
        }
        history.push(location)
      }
    })
  }

  logout = () => {
    const { cancelAuthorize, clearCategory, initialPage, history } = this.props

    window.localStorage.removeItem('token')
    cancelAuthorize()
    clearCategory()
    initialPage({})
    history.push('/')
  }

  render() {
    const { show } = this.state
    const { user, category } = this.props
    const hideSidebarStyle = classNames('icon-sort', style['hide-sidebar'])
    const showSidebarStyle = classNames('icon-sort', style['show-sidebar'])

    return (
      <main>
        <CSSTransition in={show} timeout={500} classNames="sidebar">
          <div className={style.content}>
            <div className={style.top} />
            <span className={hideSidebarStyle} onClick={this.hideSidebar} />
            {user.isLogin ? (
              <React.Fragment>
                <div className={style.info}>
                  <img
                    src={`http://localhost:8080${user.avatar}`}
                    alt="用户头像"
                    className={style.avatar}
                    width="40"
                    height="40"
                  />
                  <span className={style['user-info']}>{user.username}</span>
                </div>
                <Collapse accordion={true} defaultActiveKey="0">
                  <Panel header="栏目">
                    <ul className={style['category-list']}>
                      <li onClick={this.changeUrl} data-url="/">
                        博客主页
                      </li>
                      <li onClick={this.changeUrl} data-url="/user">
                        用户中心
                      </li>
                      <li onClick={this.changeUrl} data-url="/publish">
                        发布文章
                      </li>
                      <li onClick={this.toCollect}>我的收藏</li>
                      <li onClick={this.logout}>退出登录</li>
                    </ul>
                  </Panel>
                  <Panel header="分类">
                    <ul className={style['category-list']}>
                      {category.map(item => {
                        return (
                          <li data-categoryid={item._id} key={item._id} onClick={this.toCategory}>
                            {item.categoryname}
                          </li>
                        )
                      })}
                    </ul>
                  </Panel>
                  <Panel header="简介">
                    <p className={style.introduction}>{user.introduction}</p>
                  </Panel>
                </Collapse>
              </React.Fragment>
            ) : (
              <div className={style['sign-in']}>
                <span onClick={this.changeUrl} data-url="/login">
                  Sign In?
                </span>
              </div>
            )}
          </div>
        </CSSTransition>
        <span className={showSidebarStyle} onClick={this.showSidebar} />
      </main>
    )
  }
}

export default Sidebar
