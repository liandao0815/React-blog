import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import debounce from '../../../utils/debounce'
import * as http from '../../../api'
import style from './style.scss'

@withRouter
class Header extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.searchInput = React.createRef()
  }

  componentDidMount() {
    this.searchInput.current.addEventListener('keydown', debounce(this._searchArticle, 1000))
  }

  componentWillUnmount() {
    this.searchInput.current.removeEventListener('keydown', () => {})
  }

  _searchArticle = e => {
    const value = e.target.value
    if (!value) return

    http.searchArticle(value).then(res => {
      if (res.data.code === 0) {
        const history = this.props.history
        const location = {
          pathname: '/',
          state: {
            articleData: res.data.data,
            title: '搜索结果'
          }
        }
        history.push(location)
      }
    })
  }

  render() {
    const searchIconStyle = classNames('icon-search', style['search-item'])
    const { title } = this.props

    return (
      <main className={style.header}>
        <h3 className={style['article-list-title']}>{title}</h3>
        <div className={style['search-content']}>
          <input type="text" className={style.input} defaultValue="" ref={this.searchInput} />
          <span className={searchIconStyle} />
        </div>
      </main>
    )
  }
}

export default Header
