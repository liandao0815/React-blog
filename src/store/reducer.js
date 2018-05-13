import * as types from './action-type'

const userInitialState = {
  username: '',
  introduction: '',
  avatar: '',
  collect: [],
  msg: '',
  isLogin: false
}

const categoryInitialState = []

const pageInitialState = {
  totalPage: 0,
  pageSize: 5,
  currentPage: 1,
  groupCount: 5
}

const userArticleInitialState = []

export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case types.SUCCESS_AUTHORIZE:
      const { username, introduction, avatar, collect } = action.payload
      let isLogin = true
      return { ...state, username, introduction, avatar, collect, isLogin }

    case types.CANCEL_AUTHORIZE:
      return { ...state, ...userInitialState }

    case types.OPERATE_MESSAGE:
      return { ...state, msg: action.payload }

    case types.INTRODUCTION:
      const introductionMsg = '修改个人信息成功'
      return { ...state, introduction: action.payload, msg: introductionMsg }

    case types.AVATAR:
      const avatarMsg = '上传个人头像成功'
      return { ...state, avatar: action.payload, msg: avatarMsg }

    case types.COLLECT:
      return { ...state, collect: action.payload }

    default:
      return state
  }
}

export const category = (state = categoryInitialState, action) => {
  switch (action.type) {
    case types.LOAD_CATEGORY:
      return [...action.payload]

    default:
      return state
  }
}

export const page = (state = pageInitialState, action) => {
  switch (action.type) {
    case types.INITIAL_PAGE:
      return { ...state, ...action.payload }

    case types.SWITCH_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }

    default:
      return state
  }
}

export const userArticle = (state = userArticleInitialState, action) => {
  switch (action.type) {
    case types.LOAD_USER_ARTICLE:
      return [...action.payload]

    default:
      return state
  }
}
