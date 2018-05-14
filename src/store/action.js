import * as types from './action-type'
import * as http from '../api'

// user action
export const successAuthorize = userInfo => {
  return {
    type: types.SUCCESS_AUTHORIZE,
    payload: userInfo
  }
}

export const cancelAuthorize = () => {
  return { type: types.CANCEL_AUTHORIZE }
}

export const operateMessage = msg => {
  return {
    type: types.OPERATE_MESSAGE,
    payload: msg
  }
}
export const introduction = introduction => {
  return {
    type: types.INTRODUCTION,
    payload: introduction
  }
}

export const avatar = avatar => {
  return {
    type: types.AVATAR,
    payload: avatar
  }
}

export const collect = articles => {
  return {
    type: types.COLLECT,
    payload: articles
  }
}

export const getUserInfo = () => {
  return dispatch => {
    http.getUserInfo().then(res => {
      if (res.data.code === 0) {
        dispatch(successAuthorize(res.data.data))
      }
    })
  }
}

export const login = (username, password) => {
  if (!username || !password) {
    const msg = '用户名或者密码不能为空'
    return operateMessage(msg)
  }

  return dispatch => {
    http.login(username, password).then(res => {
      if (res.data.code === 0) {
        window.localStorage.setItem('token', res.data.data.token)
        dispatch(successAuthorize(res.data.data))
        dispatch(getUserInfo())
        dispatch(getAllCategory())
      } else {
        dispatch(operateMessage(res.data.msg))
      }
    })
  }
}

export const register = (username, password) => {
  if (!username || !password) {
    const msg = '用户名或者密码不能为空'
    return operateMessage(msg)
  }

  return dispatch => {
    http.register(username, password).then(res => {
      if (res.data.code === 0) {
        window.localStorage.setItem('token', res.data.data.token)
        dispatch(successAuthorize(res.data.data))
      } else {
        dispatch(operateMessage(res.data.msg))
      }
    })
  }
}

export const uploadIntroduction = data => {
  return dispatch => {
    http.uploadIntroduction(data).then(res => {
      if (res.data.code === 0) {
        dispatch(introduction(res.data.data.introduction))
      } else {
        dispatch(operateMessage(res.data.msg))
      }
    })
  }
}

export const uploadAvatar = data => {
  return dispatch => {
    http.uploadAvatar(data).then(res => {
      if (res.data.code === 0) {
        dispatch(avatar(res.data.data.avatar))
      } else {
        dispatch(operateMessage(res.data.msg))
      }
    })
  }
}

export const collectArticle = (articleid, cancelCollect) => {
  return dispatch => {
    http.collectArticle(articleid, cancelCollect).then(res => {
      if (res.data.code === 0) {
        dispatch(collect(res.data.data.collect))
      } else {
        dispatch(operateMessage(res.data.msg))
      }
    })
  }
}

// category action
export const loadCategory = categoryList => {
  return {
    type: types.LOAD_CATEGORY,
    payload: categoryList
  }
}

export const getAllCategory = () => {
  return dispatch => {
    http.queryAllCategory().then(res => {
      if (res.data.code === 0) {
        dispatch(loadCategory(res.data.data))
      }
    })
  }
}

export const clearCategory = () => {
  return { type: types.CLEAR_CATEGORY }
}

// page action
export const initialPage = pageConfig => {
  return {
    type: types.INITIAL_PAGE,
    payload: pageConfig
  }
}

export const switchCurrentPage = currentPage => {
  return {
    type: types.SWITCH_CURRENT_PAGE,
    payload: currentPage
  }
}

// user-article action
export const loadUserArticle = userArticleList => {
  return {
    type: types.LOAD_USER_ARTICLE,
    payload: userArticleList
  }
}

export const getUserArticle = () => {
  return dispatch => {
    http.getUserArticle().then(res => {
      if (res.data.code === 0) {
        dispatch(loadUserArticle(res.data.data))
      }
    })
  }
}
