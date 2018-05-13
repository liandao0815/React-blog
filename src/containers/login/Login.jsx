import React, { Component } from 'react'
import { is, fromJS } from 'immutable'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login, register, operateMessage } from 'store/action'
import Alert from '@/alert/Alert'
import style from './style.scss'

@connect(state => ({ user: state.user }), { login, register, operateMessage })
class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    operateMessage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.textInput.current && this.textInput.current.focus()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  componentDidUpdate() {
    const { user, history } = this.props
    user.isLogin && history.push('/')
  }

  handleInputChange = e => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  login = () => {
    const { username, password } = this.state
    const { login } = this.props
    login(username, password)
  }

  register = () => {
    const { username, password } = this.state
    const { register } = this.props
    register(username, password)
  }

  closeAlert = () => {
    this.props.operateMessage('')
  }

  render() {
    const { username, password } = this.state
    const { user, history } = this.props

    return (
      <React.Fragment>
        <Alert show={!!user.msg} type="error">
          {user.msg}
          <button className={style['alert-button']} onClick={this.closeAlert}>
            关闭
          </button>
        </Alert>
        <main className={style.container}>
          {user.isLogin ? (
            <div
              className={style['logined']}
              onClick={() => {
                history.push('/')
              }}
            >
              你已经登录。前往主页？
            </div>
          ) : (
            <div>
              <div className={style.title}>你好呀，很高兴见到你</div>
              <div className={style.body}>
                <div>
                  <label htmlFor="username">用户：</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="告诉你吧~~"
                    autoComplete="off"
                    value={username}
                    onChange={this.handleInputChange}
                    ref={this.textInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">密码：</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="不许偷看！！"
                    value={password}
                    onChange={this.handleInputChange}
                  />
                </div>
                <button className={style['login-btn']} onClick={this.login}>
                  我进来咯~
                </button>
              </div>
              <div className={style.footer}>
                <span>我们好像是第一次见面吧？</span>
                <button className={style['register-btn']} onClick={this.register}>
                  欢迎你加入
                </button>
              </div>
            </div>
          )}
        </main>
      </React.Fragment>
    )
  }
}

export default Login
