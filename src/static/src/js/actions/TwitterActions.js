import { TWEET_HOME_INFO, LIKE_TWEET, NEW_TWEET, DELETE_TWEET } from './types'
import cookie from 'react-cookies'

export const tweetHomeInfoAction = (noOfTweets) => dispatch => {
  console.log('fetching tweets:', noOfTweets)
  const endpoint = `/api/twitter/list/?limit=${noOfTweets}`
  const csrfToken = cookie.load('csrftoken')
  let authToken = localStorage.getItem('authToken')
  let headerData = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken
  }
  if (!(authToken === undefined || authToken == null || authToken === '')) { headerData['Authorization'] = `JWT ${authToken}` }

  let lookupOptions = {
    method: 'GET',
    headers: headerData
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: TWEET_HOME_INFO,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}

export const likeTweetAction = (parentSlug) => dispatch => {
  console.log('liking tweet', parentSlug)
  const endpoint = `/api/twitter/like/comment/`
  const csrfToken = cookie.load('csrftoken')
  let authToken = localStorage.getItem('authToken')
  if (authToken === undefined || authToken == null) { authToken = '0' }
  let data = {
    'parent': parentSlug
  }
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${authToken}`,
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: LIKE_TWEET,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}

export const createTweetAction = (content, parentSlug = null) => dispatch => {
  console.log('tweeting ', content)
  const endpoint = `/api/twitter/create/`
  const csrfToken = cookie.load('csrftoken')
  let authToken = localStorage.getItem('authToken')
  if (authToken === undefined || authToken == null) { authToken = '0' }
  let data = {
    'data': {
      'parent': parentSlug,
      'content': content
    }
  }
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${authToken}`,
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: NEW_TWEET,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}

export const tweetDeleteAction = (slug) => dispatch => {
  console.log('deleting ', slug)
  const endpoint = `/api/twitter/delete/`
  const csrfToken = cookie.load('csrftoken')
  let authToken = localStorage.getItem('authToken')
  if (authToken === undefined || authToken == null) { authToken = '0' }
  let data = {
    'slug': slug
  }
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${authToken}`,
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: DELETE_TWEET,
      payload: res
    }))
    .catch(function (error) {
      console.log(error)
    })
}
