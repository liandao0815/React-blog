import React, { Component } from 'react'
import { is, fromJS } from 'immutable'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sidebar from '@/sidebar/Sidebar'
import Footer from '@/footer/Footer'
import Alert from '@/alert/Alert'
import * as http from '../../api'
import style from './style.scss'

@connect(state => ({ category: state.category }))
class Publish extends Component {
  static propTypes = {
    category: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)

    const { state = {} } = this.props.location
    const { articleData = {}, update = false } = state
    this.state = {
      articleContent: update ? articleData.content : '',
      articleTitle: update ? articleData.title : '',
      isPrivated: update ? articleData.privated : false,
      categoryid: update ? articleData.category : '',
      showCategory: false,
      showAlert: false,
      alertMsg: '',
      alertType: 'success'
    }
    this.categoryUl = React.createRef()
    this.titleInput = React.createRef()
  }

  componentDidMount() {
    this.titleInput.current.focus()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.location.state !== this.props.location.state) {
      this.setState({
        articleContent: '',
        articleTitle: '',
        isPrivated: false,
        categoryid: ''
      })
    }
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  handleFormChange = e => {
    const target = e.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      [name]: value
    })
  }

  showCategory = () => {
    this.setState({
      showCategory: !this.state.showCategory
    })
  }

  selectCategory = e => {
    const categoryid = e.currentTarget.dataset.categoryid
    this.setState({ categoryid })
  }

  publishArticle = () => {
    const { categoryid, articleTitle, articleContent, isPrivated } = this.state
    if (!this._verifyState(articleTitle, articleContent, categoryid)) return

    http.publishArticle(categoryid, articleTitle, articleContent, isPrivated).then(res => {
      if (res.data.code === 0) {
        this.setState({
          categoryid: '',
          articleTitle: '',
          articleContent: '',
          isPrivated: false,
          showAlert: true,
          alertMsg: '发布成功！'
        })
      }
    })
  }

  updateArticle = e => {
    const { categoryid, articleTitle, articleContent, isPrivated } = this.state
    const articleid = e.target.dataset.articleid
    if (!this._verifyState(articleTitle, articleContent, categoryid)) return

    http
      .updateArticle(articleid, categoryid, articleTitle, articleContent, isPrivated)
      .then(res => {
        if (res.data.code === 0) {
          this.setState({
            showAlert: true,
            alertMsg: '修改成功！'
          })
        }
      })
  }

  closeAlert = () => {
    this.setState({
      showAlert: false,
      alertMsg: '',
      alertType: 'success'
    })
  }

  _verifyState(title, content, categoryid) {
    if (!title || !content) {
      this.setState({
        showAlert: true,
        alertMsg: '标题或者正文不能为空！',
        alertType: 'warn'
      })
      return false
    }

    if (!categoryid) {
      this.setState({
        showAlert: true,
        alertMsg: '请选择分类！',
        alertType: 'warn'
      })
      return false
    }
    return true
  }

  render() {
    const {
      articleContent,
      articleTitle,
      isPrivated,
      showCategory,
      categoryid,
      showAlert,
      alertMsg,
      alertType
    } = this.state
    const { category, location } = this.props
    const { state = {} } = location
    const { articleData = {}, update = false } = state

    return (
      <React.Fragment>
        <Sidebar />
        <Footer />
        <Alert toggle={this.closeAlert} show={showAlert} type={alertType}>
          {alertMsg}
        </Alert>
        <main className={style.container}>
          <nav className={style['nav-tab']}>
            <div className={style.nav}>
              <label htmlFor="checkbox">私有</label>
              <input
                id="checkbox"
                className={style['checkbox']}
                type="checkbox"
                checked={isPrivated}
                name="isPrivated"
                onChange={this.handleFormChange}
              />
              <div className={style['checkbox-flag']} />
            </div>
            <div className={style['category-select-container']}>
              <span className={style['category-select']} onClick={this.showCategory}>
                分类&nbsp;{showCategory ? '▲' : '▼'}
              </span>
              <CSSTransition
                in={showCategory}
                timeout={300}
                classNames="show-category"
                unmountOnExit
              >
                <ul className={style['category-select-option']} ref={this.categoryUl}>
                  {category.map(item => {
                    return (
                      <li
                        className={categoryid === item._id ? style['selected-category'] : null}
                        onClick={this.selectCategory}
                        data-categoryid={item._id}
                        key={item._id}
                      >
                        {item.categoryname}
                      </li>
                    )
                  })}
                </ul>
              </CSSTransition>
            </div>
            {update ? (
              <span
                className={style['article-update']}
                onClick={this.updateArticle}
                data-articleid={articleData._id}
              >
                修改文章
              </span>
            ) : (
              <span className={style['article-publish']} onClick={this.publishArticle}>
                发布文章
              </span>
            )}
          </nav>
          <div className={style.title}>
            <input
              type="text"
              placeholder="输入标题..."
              value={articleTitle}
              name="articleTitle"
              onChange={this.handleFormChange}
              ref={this.titleInput}
            />
          </div>
          <article className={style.article}>
            <textarea
              placeholder="输入正文..."
              spellCheck="false"
              value={articleContent}
              name="articleContent"
              onChange={this.handleFormChange}
            />
          </article>
        </main>
      </React.Fragment>
    )
  }
}

export default Publish
