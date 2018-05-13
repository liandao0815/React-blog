import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

class UserInfo extends PureComponent {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    infoStyle: PropTypes.object
  }

  static defaultProps = {
    infoStyle: {}
  }

  render() {
    const { avatar, userName, dateTime, infoStyle } = this.props

    return (
      <div className={style.info} style={infoStyle}>
        <div className={style['avatar']}>
          <img src={avatar} alt="用户头像" width="40" height="40" />
        </div>
        <div className={style['user-info']}>
          <span className={style['user-name']}>{userName}</span>
          <span className={style['create-date']}>{dateTime}</span>
        </div>
      </div>
    )
  }
}

export default UserInfo
