import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './css.css'

import HRline from '../components/HRline'
import HyperParse from '../components/HyperParse'
import EachTweet from './EachTweet'

import { Row, Col, Container, Button, Media } from 'reactstrap'

class TweetList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      noOfTweetsToShow: 1
    }
  }

  showMoreTweet = () => {
    console.log('moring')
    this.setState({noOfTweetsToShow: this.state.noOfTweetsToShow + 1})
  }

  componentDidMount () {
    var data = { 'count': 3, 'next': null, 'previous': null, 'results': [{ 'content': 'Virat Kohli will be rested for the final two ODIs and T20I series against New Zealand. Rohit Sharma will lead the team.', 'slug': '-the-first-ever-tweet', 'user_username': 'srm', 'user_name': 'Sreeram Maram', 'user_slug': 'sreeram-maram', 'likes': [], 'liked': false, 'children': [{ 'id': 4, 'content': 'This is reply to a comment on Virat kohli', 'slug': 'this-is-reply-to-a-comment-on-virat-kohli', 'user_username': 'hrk', 'user_name': 'Hritik Roshan', 'user_slug': 'none-2uji', 'liked': false, 'likes': [{ 'username': 'srmdd', 'name': 'sdd', 'slug': 'none-uv9q' }, { 'username': 'srmasdad', 'name': 'addd', 'slug': 'none-hmdg' }, { 'username': 'srma', 'name': 'dad', 'slug': 'none-bdpm' }], 'children': [{ 'id': 5, 'content': 'This is another reply to to a reply', 'slug': 'this-is-another-reply-to-to-a-reply', 'user_username': 'srm', 'user_name': 'Sreeram Maram', 'user_slug': 'sreeram-maram', 'liked': false, 'likes': [], 'children': [{ 'id': 6, 'content': 're to re to re', 'slug': 're-to-re-to-re', 'user_username': 'dan', 'user_name': 'Daniel', 'user_slug': 'none-cp3u', 'liked': false, 'likes': [{ 'username': 'rjj', 'name': null, 'slug': 'none-gi0e' }, { 'username': 'dan', 'name': 'Daniel', 'slug': 'none-cp3u' }], 'children': [] }] }] }, { 'id': 7, 'content': '-somemnewn dms', 'slug': '-somemnewn-dms', 'user_username': 'aksjbdajkskjnnjkasdnjsadk', 'user_name': null, 'user_slug': 'none-vxp8', 'liked': false, 'likes': [], 'children': [] }, { 'id': 8, 'content': '-somenew one', 'slug': '-somenew-one', 'user_username': 'rrr', 'user_name': 'Rakesh Roshan', 'user_slug': 'none-bijv', 'liked': false, 'likes': [{ 'username': 'some_user', 'name': null, 'slug': 'none-y634' }, { 'username': 'aksjbdajkskjnnjkasdnjsadk', 'name': null, 'slug': 'none-vxp8' }, { 'username': 'test', 'name': null, 'slug': 'none-yy3v' }], 'children': [] }] }, { 'content': 'We allow comparisons to affect our current creative ideas. We begin closing off potential executions and helpful thoughts because we deem them “not useful enough” in accomplishing our expectations. Doing this too early in the creative process can derail brilliant ideas', 'slug': 'first-tweet', 'user_username': 'username', 'user_name': 'HELLO re', 'user_slug': 'none', 'likes': [], 'liked': false, 'children': [] }, { 'content': '#PriyankaGandhi officially enters active politics. Appointed as General Secretary of UP East by Congress Chief Rahul Gandhi who was coronated by then Congress Chief Sonia Gandhi. Heights of Dynasty Politics. 😂 #PriyankaInPolitics #PriyankaEntersPolitics', 'slug': 'first-tweet-gt62', 'user_username': 'srm', 'user_name': 'Sreeram Maram', 'user_slug': 'sreeram-maram', 'likes': [], 'liked': false, 'children': [] }] }
    this.setState({ data: data })
  }
  render () {
    let { noOfTweetsToShow } = this.state
    let tweets = this.state.data.results
    return (
      <div>
        
              <div className='headname_local'>Recent Tweets</div><div className='pb-1' />
              <div className='px-3 pb-5 local_list' >
                {tweets !== undefined && tweets.length > 0
                  ? <div>
                    {tweets.slice(0, noOfTweetsToShow).map((tweet, index) => {
                      return (
                        <EachTweet tweet={tweet} hr />
                      )
                    })}
                    <div className='ac_re'><Button outline color='primary' className='width_20 loadmore_but' onClick={this.showMoreTweet}>
                      Load more...
                    </Button>
                    </div>
                  </div>

                  : ''}
              </div>
           
      </div>
    )
  }
}
export default TweetList
