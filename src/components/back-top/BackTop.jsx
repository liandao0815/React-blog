import React, { PureComponent } from 'react'
import throttle from '../../utils/throttle'
import style from './style.scss'

class BackTop extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      stepping: false
    }
    this.backTopElement = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this._showBackScrollBtn, 250))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', () => {})
  }

  backTop = () => {
    const { stepping } = this.state
    if (stepping) return

    this.setState(() => {
      return { stepping: true }
    })

    const step = () => {
      const speed = window.pageYOffset / 7

      document.documentElement.scrollTop -= speed
      if (document.documentElement.scrollTop === 0) {
        this.setState(() => {
          return { stepping: false }
        })
        return
      }
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  _showBackScrollBtn = () => {
    let cssText
    const backTopElement = this.backTopElement.current

    if (!backTopElement) return

    if (window.pageYOffset > 500) {
      cssText = 'right: 50px; opacity: 1;'
      backTopElement.style.cssText = cssText
    } else {
      cssText = 'right: -50px; opacity: 0;'
      backTopElement.style.cssText = cssText
    }
  }

  render() {
    return (
      <div className={style['back-top']} onClick={this.backTop} ref={this.backTopElement}>
        <span className="icon-top" />
      </div>
    )
  }
}

export default BackTop
