import axios from './config'

export const getUserInfo = async () => {
  return await axios.get('/user/info')
}

export const login = async (username, password) => {
  return await axios.post('/user/login', { username, password })
}

export const register = async (username, password) => {
  return await axios.post('/user/register', { username, password })
}

export const uploadIntroduction = async introduction => {
  return await axios.post('/user/introduction', { introduction })
}

export const uploadAvatar = async avatarFile => {
  return await axios.post('/user/avatar', avatarFile, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const collectArticle = async (articleid, cancelCollect) => {
  return await axios.post('/user/collect', { articleid, cancelCollect })
}

export const createCategory = async categoryname => {
  return await axios.post('/category/create', { categoryname })
}

export const queryOneCategory = async categoryid => {
  return await axios.get('/category/query', { params: { categoryid } })
}

export const queryAllCategory = async () => {
  return await axios.get('/category/query')
}

export const deleteCategory = async categoryid => {
  return await axios.post('/category/delete', { categoryid })
}

export const modifyCategory = async (categoryid, categoryname) => {
  return await axios.post('/category/modify', { categoryid, categoryname })
}

export const publishArticle = async (categoryid, title, content, privated) => {
  return await axios.post('/article/publish', {
    categoryid,
    title,
    content,
    privated
  })
}

export const searchArticle = async q => {
  return await axios.get('/article/search', { params: { q } })
}

export const deleteArticle = async articleid => {
  return await axios.post('/article/delete', { articleid })
}

export const updateArticle = async (articleid, categoryid, title, content, privated) => {
  return await axios.post('/article/update', {
    articleid,
    categoryid,
    title,
    content,
    privated
  })
}

export const selectArticle = async (articleid, commit) => {
  return await axios.get('/article/select', { params: { articleid, commit } })
}

export const queryArticle = async (pageSize, currentPage) => {
  return await axios.get('/article/query', {
    params: { pageSize, currentPage }
  })
}

export const getUserArticle = async () => {
  return await axios.get('/article/userArticle')
}

export const commitComment = async (articleid, content) => {
  return await axios.post('/comment/commit', { articleid, content })
}
