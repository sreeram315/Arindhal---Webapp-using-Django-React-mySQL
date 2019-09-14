import { CONTRIBUTER_ADD } from '../actions/types'

const initialState = {
  contributerData: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTRIBUTER_ADD:
      console.log(action.payload)
      return {
        ...state,
        contributerData: action.payload
      }
    default:
      return state
  }
  return state
}
