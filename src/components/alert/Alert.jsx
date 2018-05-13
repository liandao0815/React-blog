import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

class Alert extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
    type: PropTypes.string
  }

  static defaultProps = {
    toggle: null
  }

  closeAlert = () => {
    this.props.toggle()
  }

  render() {
    const { children, show, type, toggle } = this.props

    let theme = ''
    switch (type) {
      case 'success':
        theme = '#27ae60'
        break
      case 'info':
        theme = '#00a2d3'
        break
      case 'warn':
        theme = '#f1c40f'
        break
      case 'error':
        theme = '#e74c3c'
        break
      default:
        theme = '#27ae60'
    }

    const render = show ? (
      <div className={style.mask}>
        <div className={style.alert} style={{ backgroundColor: theme }}>
          {toggle ? (
            <span className={style.close} onClick={this.closeAlert}>
              &times;
            </span>
          ) : null}
          {children}
        </div>
      </div>
    ) : null

    return render
  }
}

export default Alert
