import { combineReducers } from 'redux'
import postReducer from './postReducer'
import CamperReducer from './CamperReducer'
import TwitterReducers from './TwitterReducers'
import ShortenedUrlReducer from './ShortenedUrlReducer'

export default combineReducers({
  posts: postReducer,
  camper: CamperReducer,
  twitter: TwitterReducers,
  shortenurl: ShortenedUrlReducer
})
