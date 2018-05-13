import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import classNames from 'classnames'
import { getUserInfo } from 'store/action'
import Sidebar from '@/sidebar/Sidebar'
import Footer from '@/footer/Footer'
import BackTop from '@/back-top/BackTop'
import UserInfo from './user-info/UserInfo'
import * as http from '../../api'
import { formatDate } from '../../utils/format'
import style from './style.scss'

@connect(state => ({ user: state.user }), { getUserInfo })
class Detail extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    getUserInfo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      articleDetail: null,
      collectStatus: false,
      commentContent: ''
    }
  }
  componentDidMount() {
    const articleid = this.props.location.state.articleid
    this._getArticleDetail(articleid)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  handleTextareaChange = e => {
    this.setState({
      commentContent: e.target.value
    })
  }

  handleCollectArticle = () => {
    const articleid = this.props.location.state.articleid
    const collectStatus = this.state.collectStatus

    http.collectArticle(articleid, collectStatus).then(res => {
      if (res.data.code === 0) {
        this.props.getUserInfo()
        this._getArticleDetail(articleid, true)
      }
    })
  }

  commitComment = () => {
    const articleid = this.props.location.state.articleid
    const content = this.state.commentContent

    http.commitComment(articleid, content).then(res => {
      if (res.data.code === 0) {
        this._getArticleDetail(articleid, true)
        this.setState({
          commentContent: ''
        })
      }
    })
  }

  _getArticleDetail(articleid, commit = false) {
    http.selectArticle(articleid, commit).then(res => {
      if (res.data.code === 0) {
        const data = res.data.data
        const collect = this.props.user.collect || []

        this.setState({
          articleDetail: data,
          collectStatus: collect.some(item => item._id === data._id)
        })
      }
    })
  }

  render() {
    const { articleDetail, commentContent, collectStatus } = this.state
    const comment = articleDetail ? articleDetail.comment : []
    const collectIconStyle = classNames(
      collectStatus ? 'icon-like_fill' : 'icon-like',
      style['collect-icon']
    )

    return (
      <React.Fragment>
        <Sidebar />
        <Footer />
        <BackTop />
        {articleDetail ? (
          <main className={style.container}>
            <h1 className={style.title}>{articleDetail.title}</h1>
            <div className={style.userInfo}>
              <UserInfo
                avatar={`http://localhost:8080${articleDetail.author.avatar}`}
                userName={articleDetail.author.username}
                dateTime={formatDate(articleDetail.createTime, 'yyyy/MM/dd hh:mm:ss')}
              />
              <i className={collectIconStyle} onClick={this.handleCollectArticle} />
            </div>
            <article className={style.article}>
              <p>{articleDetail.content}</p>
              <div className={style['read-count']}>
                阅读次数：<span>{articleDetail.readCount}</span>
              </div>
              <div className={style['update-time']}>
                最近更新于：{formatDate(articleDetail.updateTime, 'yyyy/MM/dd hh:mm:ss')}
              </div>
            </article>
            <div className={style.comment}>
              <div className={style['comment-textarea']}>
                <div className={style['comment-textarea-title']}>文章评论</div>
                <textarea value={commentContent} onChange={this.handleTextareaChange} />
                <button className={style['commit-comment']} onClick={this.commitComment}>
                  提交评论
                </button>
              </div>
              <div className={style['comment-list-container']}>
                <div className={style['comment-list-title']}>
                  <span>评论列表</span>
                  <span>共 {comment.length} 条评论</span>
                </div>
                {comment.length ? (
                  <ul className={style['comment-list']}>
                    {comment.map(item => {
                      return (
                        <li key={item._id}>
                          <UserInfo
                            infoStyle={{ marginBottom: '10px', marginTop: 0 }}
                            avatar={`http://localhost:8080${item.user.avatar}`}
                            userName={item.user.username}
                            dateTime={formatDate(item.time, 'yyyy/MM/dd hh:mm:ss')}
                          />
                          <div className={style['comment-content']}>{item.content}</div>
                          <hr />
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className={style['no-comment']}>暂无评论，抢个沙发吧？</div>
                )}
              </div>
            </div>
          </main>
        ) : null}
      </React.Fragment>
    )
  }
}

export default Detail
