import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './css.css'

import HRline from '../components/HRline'
import HyperParse from '../components/HyperParse'
import EachTweet from './EachTweet'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {checkAuthAction} from '../actions/CamperActions'


import { Row, Col, Container, Button, Media } from 'reactstrap'

class TweetList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      noOfTweetsToShow: 999999999
    }
  }

  showMoreTweet = () => {
    console.log('moring')
    this.props.fetchMoreTweets()
  }

  refresh = () => {
  }


  componentDidMount () {
    this.setState({ data: this.props.tweets })
  }

  render () {
    let { noOfTweetsToShow } = this.state
    let {tweets, noMoreTweets, isAuthenticated} = this.props
    return (
      <div>
        
              <div className='headname_local'>Recent Tweets</div><div className='pb-1' />
              <div className='px-3 pb-5 local_list' >
                {tweets !== undefined && tweets.length > 0
                  ? <div>
                    {tweets.slice(0, noOfTweetsToShow).map((tweet, index) => {
                      return (
                        <EachTweet refresh={this.refresh} tweet={tweet} isAuthenticated={isAuthenticated} refresh={()=>{this.props.refresh()}} hr />
                      )
                    })}


                    <div className='ac_re'><Button outline color='primary' className='width_20 loadmore_but' onClick={this.showMoreTweet}>
                     {noMoreTweets ? 'No more tweets' : 'Load more...'} 
                    </Button>
                    </div>
                  </div>

                  : ''}
              </div>
           
      </div>
    )
  }
}

TweetList.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  checkAuthAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.camper.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthAction })(TweetList)




