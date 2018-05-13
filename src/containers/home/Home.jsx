import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { is, fromJS } from 'immutable'
import { connect } from 'react-redux'
import { initialPage } from 'store/action'
import ArticleList from '@/article-list/ArticleList'
import Pagination from '@/pagination/Pagination'
import Sidebar from '@/sidebar/Sidebar'
import Footer from '@/footer/Footer'
import BackTop from '@/back-top/BackTop'
import Header from './header/Header'
import * as http from '../../api'

@connect(state => ({ page: state.page }), { initialPage })
class Home extends Component {
  static propTypes = {
    page: PropTypes.object.isRequired,
    initialPage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      articleData: [],
      title: ''
    }
  }

  componentDidMount() {
    const locationState = this.props.location.state
    if (!locationState) {
      const { pageSize, currentPage } = this.props.page
      this._initalData(pageSize, currentPage)
    } else {
      const { articleData, title } = locationState
      this.setState({ articleData, title })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldLocationState = this.props.location.state
    const newLocationState = nextProps.location.state

    if (!newLocationState) {
      const { pageSize, currentPage } = nextProps.page

      newLocationState !== oldLocationState && this._initalData(pageSize, currentPage)
      currentPage !== this.props.page.currentPage && this._initalData(pageSize, currentPage)
    } else if (newLocationState !== oldLocationState) {
      const { articleData, title } = newLocationState

      this.setState({ articleData, title })
    }

    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  _initalData(pageSize, currentPage) {
    http.queryArticle(pageSize, currentPage).then(res => {
      if (res.data.code === 0) {
        const data = res.data.data
        const { initialPage } = this.props
        const pageConfig = {
          totalPage: Math.ceil(data.totalCount / pageSize)
        }

        initialPage(pageConfig)
        this.setState({
          articleData: data.articleData,
          title: '全部文章'
        })
      }
    })
  }

  render() {
    const { articleData, title } = this.state
    const locationState = this.props.location.state

    return (
      <React.Fragment>
        <main style={{marginBottom: '60px'}}>
          <Header title={title} />
          <ArticleList articleData={articleData} />
          {!locationState && articleData.length ? <Pagination /> : null}
        </main>
        <Sidebar />
        <BackTop />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Home
