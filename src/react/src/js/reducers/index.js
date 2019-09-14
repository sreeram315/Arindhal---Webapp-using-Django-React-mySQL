import { combineReducers } from 'redux'
import postReducer from './postReducer'
import CamperReducer from './CamperReducer'
import TwitterReducers from './TwitterReducers'
import ShortenedUrlReducer from './ShortenedUrlReducer'
import ArindhalReducer from './ArindhalReducer'
import BlogReducer from './BlogReducer'

export default combineReducers({
  posts: postReducer,
  camper: CamperReducer,
  twitter: TwitterReducers,
  shortenurl: ShortenedUrlReducer,
  arindhal: ArindhalReducer,
  blog: BlogReducer
})
