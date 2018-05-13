import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { uploadIntroduction, uploadAvatar } from 'store/action'
import style from './style.scss'

@connect(state => ({ user: state.user }), {
  uploadIntroduction,
  uploadAvatar
})
class InfoModify extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    uploadIntroduction: PropTypes.func.isRequired,
    uploadAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      introduction: this.props.user.introduction,
      avatar: null,
      selected: false
    }
    this.fileInput = React.createRef()
  }

  handTextareaChange = e => {
    this.setState({
      introduction: e.target.value
    })
  }

  handleFileInputChange = e => {
    e.target.files.length > 0
      ? this.setState({ selected: true })
      : this.setState({ selected: false })
  }

  handleIntroductionClick = () => {
    this.props.uploadIntroduction(this.state.introduction)
  }

  handleAvatarClick = () => {
    if (this.fileInput.current.files.length === 0) return

    const fileData = this.fileInput.current.files[0]
    const { uploadAvatar } = this.props
    const formData = new FormData()

    formData.append('avatar', fileData)
    uploadAvatar(formData)

    this.fileInput.current.value = null
    this.setState({ selected: false })
  }

  render() {
    const { introduction, selected } = this.state

    return (
      <div className={style.container}>
        <div className={style.introduction}>
          <textarea
            className={style.textarea}
            value={introduction}
            onChange={this.handTextareaChange}
          />
          <button
            className={style['modify-introdution-btn']}
            onClick={this.handleIntroductionClick}
          >
            修改简介
          </button>
        </div>
        <div className={style['upload-avatar']}>
          <div className={style['file-div']}>
            <span>{selected ? '已选择' : '选择文件'}</span>
            <input
              type="file"
              className={style.file}
              accept="image/png, image/jpeg"
              onChange={this.handleFileInputChange}
              ref={this.fileInput}
            />
          </div>
          <button className={style['upload-avatar-btn']} onClick={this.handleAvatarClick}>
            上传头像
          </button>
        </div>
      </div>
    )
  }
}

export default InfoModify
