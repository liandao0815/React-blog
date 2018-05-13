import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { formatDate } from '../../utils/format'
import style from './style.scss'

@withRouter
class ArtilceList extends PureComponent {
  static propTypes = {
    articleData: PropTypes.array.isRequired
  }

  handleDetailClick = e => {
    const articleid = e.target.dataset.articleid
    const location = {
      pathname: '/detail',
      state: { articleid }
    }
    this.props.history.push(location)
  }

  render() {
    const dateIcon = classNames('icon-calendar', style['date-icon'])
    const { articleData } = this.props

    return (
      <ul className={style.list}>
        {articleData.length
          ? articleData.map(item => {
              return (
                <li className={style.content} key={item._id}>
                  <div className={style.info}>
                    <img
                      src={`http://localhost:8080${item.author.avatar}`}
                      alt="用户头像"
                      className={style.avatar}
                      width="40"
                      height="40"
                    />
                    <span className={style['user-info']}>{item.author.username}</span>
                    <div className={style['icon-group']}>
                      <span className={dateIcon}>&nbsp;{formatDate(item.createTime)}</span>
                    </div>
                  </div>
                  <div className={style.brief}>
                    <h2 className={style['article-title']}>{item.title}</h2>
                    {item.content}
                  </div>
                  <div className={style.footer}>
                    <span data-articleid={item._id} onClick={this.handleDetailClick}>
                      >>>
                    </span>
                  </div>
                </li>
              )
            })
          : null}
      </ul>
    )
  }
}

export default ArtilceList
