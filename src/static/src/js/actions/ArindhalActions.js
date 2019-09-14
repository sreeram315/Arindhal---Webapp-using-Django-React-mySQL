import { CONTRIBUTER_ADD } from './types'
import cookie from 'react-cookies'

export const contributerAddAction = (data) => dispatch => {
  const endpoint = `/api/arindhal/contributers/create/`
  const csrfToken = cookie.load('csrftoken')
  let lookupOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }

  fetch(endpoint, lookupOptions)
    .then(function (res) {
      return res.json()
    }).then(res => dispatch({
      type: CONTRIBUTER_ADD,
      payload: res
    })).catch(function (error) {
      console.log(error)
    })
}
