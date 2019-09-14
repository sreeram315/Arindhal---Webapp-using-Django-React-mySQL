import { BLOG_LIST, BLOG_DETAIL, BLOG_CREATE } from './types'
import cookie from 'react-cookies'

export const blogListAction = (queries) => dispatch => {
  let q = queries.q; let author = queries.author; let genre = queries.genre
  console.log('GOT QUERY ', queries)
  const endpoint = `/api/blog/list/?q=${q}&author=${author}&genre=${genre}`
  const csrfToken = cookie.load('csrftoken')
  let lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: BLOG_LIST,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}

export const blogDetailAction = (slug) => dispatch => {
  const endpoint = `/api/blog/detail/${slug}/`
  const csrfToken = cookie.load('csrftoken')
  let lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: BLOG_DETAIL,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}

export const createBlogAction = (blogData) => dispatch => {
  const endpoint = '/api/blog/create/'
  let authToken = localStorage.getItem('authToken')
  if (authToken === undefined || authToken == null) { authToken = '0' }
  const csrfToken = cookie.load('csrftoken')
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
      'Authorization': `JWT ${authToken}`
    },
    body: JSON.stringify(blogData),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: BLOG_CREATE,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}
