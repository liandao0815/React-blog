import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserArticle } from 'store/action'
import * as http from '../../../api'
import style from './style.scss'

@connect(state => ({ userArticle: state.userArticle }), { getUserArticle })
class ArticleManage extends PureComponent {
  static propTypes = {
    userArticle: PropTypes.array.isRequired,
    getUserArticle: PropTypes.func.isRequired
  }

  deleteArticle = e => {
    const articleid = e.target.dataset.articleid
    http.deleteArticle(articleid).then(res => {
      if (res.data.code === 0) {
        this.props.getUserArticle()
      }
    })
  }

  updateArticle = e => {
    const articleid = e.target.dataset.articleid
    const articleData = this.props.userArticle.filter(item => item._id === articleid)[0]

    const location = {
      pathname: '/publish',
      state: { articleData, update: true }
    }
    this.props.history.push(location)
  }

  render() {
    const { userArticle } = this.props

    return (
      <ul className={style['article-list']}>
        {userArticle.map(item => {
          return (
            <li key={item._id}>
              <h3 className={style['article-title']}>{item.title}</h3>
              <section className={style['article-brief']}>{item.content}</section>
              <div className={style['article-manage']}>
                <button data-articleid={item._id} onClick={this.updateArticle}>
                  修改
                </button>
                <button data-articleid={item._id} onClick={this.deleteArticle}>
                  删除
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default ArticleManage
