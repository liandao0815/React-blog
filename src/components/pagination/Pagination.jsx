import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { switchCurrentPage } from 'store/action'
import classNames from 'classnames'
import style from './style.scss'

@connect(state => ({ page: state.page }), { switchCurrentPage })
class Pagination extends PureComponent {
  static propTypes = {
    page: PropTypes.object.isRequired,
    switchCurrentPage: PropTypes.func.isRequired
  }

  generatePagination() {
    const { totalPage, groupCount, currentPage } = this.props.page
    let pagination = [],
      previousPageStyle,
      nextPageStyle

    previousPageStyle = classNames('icon-left', {
      [style['not-allow']]: currentPage === 1
    })

    nextPageStyle = classNames('icon-right', {
      [style['not-allow']]: currentPage === totalPage
    })

    pagination.push(
      <li key={0}>
        <span className={previousPageStyle} onClick={this.previousPage} />
      </li>
    )

    if (totalPage <= groupCount) {
      for (let i = 1; i <= totalPage; i++) {
        pagination.push(
          <li key={i}>
            <span
              className={currentPage === i ? style['active-page'] : null}
              onClick={this.pageClick.bind(this, i)}
            >
              {i}
            </span>
          </li>
        )
      }
    } else {
      const middlePage = Math.ceil(groupCount / 2)
      let startPage, pageLength

      if (currentPage <= middlePage) {
        startPage = 1
        pageLength = groupCount
      } else if (currentPage > totalPage - middlePage) {
        startPage = totalPage - groupCount + 1
        pageLength = totalPage
      } else {
        startPage = currentPage - middlePage + 1
        pageLength = groupCount % 2 === 0 ? currentPage + middlePage : currentPage + middlePage - 1
      }

      for (let i = startPage; i <= pageLength; i++) {
        pagination.push(
          <li key={i}>
            <span
              className={currentPage === i ? style['active-page'] : null}
              onClick={this.pageClick.bind(this, i)}
            >
              {i}
            </span>
          </li>
        )
      }
    }

    pagination.push(
      <li key={-1}>
        <span className={nextPageStyle} onClick={this.nextPage} />
      </li>
    )

    return pagination
  }

  pageClick(currentPage) {
    this.props.switchCurrentPage(currentPage)
  }

  previousPage = () => {
    let { currentPage } = this.props.page
    if (--currentPage < 1) {
      return
    }
    this.props.switchCurrentPage(currentPage)
  }

  nextPage = () => {
    let { currentPage, totalPage } = this.props.page
    if (++currentPage > totalPage) {
      return
    }
    this.props.switchCurrentPage(currentPage)
  }

  render() {
    return <ul className={style.container}>{this.generatePagination()}</ul>
  }
}

export default Pagination
