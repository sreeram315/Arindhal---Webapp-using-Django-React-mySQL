import { CREATE_SHORTEN_URL, GET_REDIRECTION_URL, CHECK_CUSTOM_URL_AVAILABILITY } from '../actions/types'

const initialState = {
  shortenedUrl: '',
  redirectionLink: '',
  wait: true,
  customUrlAvailable: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_SHORTEN_URL:
      console.log(action.payload)
      return {
        ...state,
        shortenedUrl: action.payload.redirection_link
      }
    case GET_REDIRECTION_URL:
      console.log(action.payload)
      return {
        ...state,
        redirectionLink: action.payload.redirection_link,
        wait: false
      }
    case CHECK_CUSTOM_URL_AVAILABILITY:
      console.log(action.payload)
      return {
        ...state,
        customUrlAvailable: action.payload
      }
    default:
      return state
  }
  return state
}
