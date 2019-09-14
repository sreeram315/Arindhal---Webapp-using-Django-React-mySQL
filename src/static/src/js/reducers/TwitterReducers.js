import { TWEET_HOME_INFO, LIKE_TWEET, NEW_TWEET, DELETE_TWEET } from '../actions/types'

const initialState = {
  tweets: null,
  response: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // HOME TWEETS //
    case TWEET_HOME_INFO:
      console.log(action.payload)
      return {
        ...state,
        tweets: action.payload
      }

    case NEW_TWEET:
      console.log('dissyyyy')
      console.log(action.payload)
      return {
        response: action.payload
      }

    case DELETE_TWEET:
      console.log(action.payload)

    default:
      return state
  }
  return state
}
