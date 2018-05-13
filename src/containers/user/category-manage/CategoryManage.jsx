import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllCategory } from 'store/action'
import * as http from '../../../api'
import style from './style.scss'

@connect(state => ({ category: state.category }), { getAllCategory })
class CategoryManage extends PureComponent {
  static propTypes = {
    category: PropTypes.array.isRequired,
    getAllCategory: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      createCategoryname: '',
      modifyCategoryName: ''
    }
  }

  handleInputChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  handleCreateCategory = () => {
    const categoryname = this.state.createCategoryName
    if (categoryname === '') return

    http.createCategory(categoryname).then(res => {
      if (res.data.code === 0) {
        this.props.getAllCategory()
      }
    })
    this.setState({
      createCategoryName: ''
    })
  }

  handleModifyCategory = e => {
    const categoryid = e.target.dataset.categoryid
    const categoryname = this.state.modifyCategoryName
    if (categoryname === '') return

    http.modifyCategory(categoryid, categoryname).then(res => {
      if (res.data.code === 0) {
        this.props.getAllCategory()
      }
    })
    this.setState({
      modifyCategoryName: ''
    })
  }

  handleDeleteCategory = e => {
    const categoryid = e.target.dataset.categoryid
    http.deleteCategory(categoryid).then(res => {
      if (res.data.code === 0) {
        this.props.getAllCategory()
      }
    })
  }

  render() {
    const { category } = this.props
    const { createCategoryName, modifyCategoryName } = this.state

    return (
      <div className={style.container}>
        <div className={style['option-category']}>
          <input
            type="text"
            value={createCategoryName}
            name="createCategoryName"
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleCreateCategory}>添加分类</button>
        </div>
        {category.length !== 0 ? (
          <div className={style['option-category']}>
            <input
              type="text"
              placeholder="请点击对应的修改按钮"
              value={modifyCategoryName}
              name="modifyCategoryName"
              onChange={this.handleInputChange}
            />
            <button style={{ cursor: 'not-allowed' }}>修改分类</button>
          </div>
        ) : null}
        <ul className={style['category-list']}>
          {category.length !== 0 ? (
            category.map((item, index) => {
              return (
                <li key={index}>
                  <div className={style['category-name']}>{item.categoryname}</div>
                  <div className={style['category-manage']}>
                    <button onClick={this.handleModifyCategory} data-categoryid={item._id}>
                      修改
                    </button>
                    <button onClick={this.handleDeleteCategory} data-categoryid={item._id}>
                      删除
                    </button>
                  </div>
                </li>
              )
            })
          ) : (
            <div className={style['no-category']}>暂无标签可操作</div>
          )}
        </ul>
      </div>
    )
  }
}

export default CategoryManage
