import { CREATE_SHORTEN_URL, GET_REDIRECTION_URL, CHECK_CUSTOM_URL_AVAILABILITY } from './types'
import cookie from 'react-cookies'

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_POSTS,
        payload: data
      })
    )
}

export const createShortenurlAction = (urlData) => dispatch => {
  console.log('calling url api')
  const csrfToken = cookie.load('csrftoken')
  let data = {
    'original_link': urlData.originalUrl,
    'redirection_link': urlData.customUrl
  }
  fetch('/api/shortenurl/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => dispatch({
      type: CREATE_SHORTEN_URL,
      payload: res
    })
    )
}

export const getRedirectionUrlAction = (slug) => dispatch => {
  console.log('getting url')
  const csrfToken = cookie.load('csrftoken')
  let data = {
    'redirection_link': slug
  }
  fetch(`/api/shortenurl/get-redirection-link/?slug=${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    }
  })
    .then(res => res.json())
    .then(res => dispatch({
      type: GET_REDIRECTION_URL,
      payload: res
    })
    )
}

export const checkCustomUrlAvailableAction = (link) => dispatch => {
  console.log('getting url')
  const csrfToken = cookie.load('csrftoken')
  fetch(`/api/shortenurl/custom-link-availability/?link=${link}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    }
  })
    .then(res => res.json())
    .then(res => dispatch({
      type: CHECK_CUSTOM_URL_AVAILABILITY,
      payload: res
    })
    )
}
