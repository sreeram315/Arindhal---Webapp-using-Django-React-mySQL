import { BLOG_LIST, BLOG_DETAIL, BLOG_CREATE } from '../actions/types'

const initialState = {
  blog_list: {},
  blog_detail: {},
  blog_created: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    // BLOG LIST //
    case BLOG_LIST:
      console.log(action.payload)
      return {
        ...state,
        blog_list: action.payload
      }

    case BLOG_DETAIL:
      console.log(action.payload)
      return {
        ...state,
        blog_detail: action.payload
      }

    case BLOG_CREATE:
      console.log(action.payload)
      return {
        ...state,
        blog_created: true,
        blog_detail: action.payload
      }

    default:
      return state
  }
  return state
}
