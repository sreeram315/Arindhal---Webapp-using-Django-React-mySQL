import React from 'react'
import { Row, Col, Container, Button, Media } from 'reactstrap'

import NavbarMain from '../navbar/NavbarMain'

import TweetList from './TweetList'
import NewTweet from './NewTweet'
import TwitterNav from './TwitterNav'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { tweetHomeInfoAction } from '../actions/TwitterActions'

class TwitterHomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      noOfTweetstToFetch: 17
    }
  }

   fetchMoreTweets = () =>{
    this.setState({noOfTweetstToFetch: this.state.noOfTweetstToFetch+20}, function(){
      this.props.tweetHomeInfoAction(this.state.noOfTweetstToFetch)
    })
    
  }

  refresh = () => {
    this.props.tweetHomeInfoAction(this.state.noOfTweetstToFetch)
  }

  componentDidMount () {
    this.props.tweetHomeInfoAction(this.state.noOfTweetstToFetch)
  }

  render () {
    console.log('rendering againg')
    console.log(this.props.tweets)
    let { tweets } = this.props
    let {noMoreTweets}  = this.state
    return (
      <div>
        <NavbarMain active='twitter' />
        <div>

          <div className='container-fluid px-5'>
            <div className='pt-4 pl-4'><TwitterNav active='home' /></div>
            <Row className='py-5'>

              <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }} sm={{ size: 12, order: 2 }} className='px-5'>

                {tweets !== undefined && tweets !== null && tweets.results !== undefined ? <TweetList tweets={tweets.results} fetchMoreTweets={this.fetchMoreTweets} noMoreTweets={noMoreTweets} refresh={this.refresh}/> : 'Loading' }
              </Col>
              <Col md={{ size: 4, order: 2 }} xs={{ size: 12, order: 1 }} sm={{ size: 12, order: 1 }}>
                <NewTweet refresh={this.refresh} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

TwitterHomeView.propTypes = {
  tweets: PropTypes.object,
  tweetHomeInfoAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tweets: state.twitter.tweets
})

export default connect(mapStateToProps, { tweetHomeInfoAction })(TwitterHomeView)
