import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import './css.css'

import HRline from '../components/HRline'
import HyperParse from '../components/HyperParse'
import ReplyTweet from './ReplyTweet'
import ReplyModel from './ReplyModel'

import { Row, Col, Container, Button, Media } from 'reactstrap'

class EachTweet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      notLiked: false,
      Liked: true,
      showReplies: true,
      noOfrepliesToShow: 0, 
      modelShow: false
    }
  }

  replyBut = (e) => {
    e.preventDefault()
    console.log('repliting')
    this.setState({modelShow: true})
  }

  closeModel = () => {
    this.setState({modelShow: false})
  }

  handleSowMoreReplies = () => {
    this.setState({noOfrepliesToShow: this.state.noOfrepliesToShow+1})
  }

  componentDidMount () {
  }
  render () {
    let { noOfrepliesToShow, modelShow } = this.state
    let likeButtonclasses = classNames('local_like_but', {
      'text_color_red': this.props.tweet.liked,
      'text_color_blue': !this.props.tweet.liked
    })
    let likeLoveClasses = classNames('fas fa-heart', 'pl-2', { 'not_liked': !this.props.tweet.liked, 'liked': this.props.tweet.liked })
    let tweet = this.props.tweet
    return (
      <div className='pt-2'>

        <div i={tweet.slug}>
          <div class='media'>
            <img src='https://i.ibb.co/Tv6cC4M/image-not-found.gif' class='mr-3 img-fluid' alt={`image of ${tweet.user_name}`} />
            <div class='media-body'>
              <h5 class='mt-0'><a className='nodec color_black' href={`/user/profile/${tweet.user_slug}`}>{tweet.user_name}</a>
                <small className='pl-1 username_beside'>@{tweet.user_username}</small></h5>
              <HyperParse startswith='#' string={tweet.content} />

              <div className='pt-2'>
                <span className=''>{tweet.likes.length}</span>
                <i class={likeLoveClasses} />
                <button className={likeButtonclasses} >Like</button> |
                <span className='pl-2'>{tweet.children.length}</span>
                <button className='local_like_but text_color_grey' onClick={this.replyBut}>Reply</button>

              </div>

            </div>
          </div>
        </div>

        {this.state.showReplies && tweet.children.length > 0
          ? <div className='padl-10'>

            {tweet.children.slice(0, noOfrepliesToShow).map((twi, index) => {
              return (
                <div className='py-1'><EachTweet tweet={twi} parent={tweet.slug}/></div>
              )
            })}
            {tweet.children.length > noOfrepliesToShow ?
            <div className='ar_re pointer' onClick={this.handleSowMoreReplies}>
                  <small>show {noOfrepliesToShow>0 ? 'more' : '' }replies</small>
                </div>
            : ''}
          </div>

          : '' }
        {this.props.hr ? <HRline cn='padl-5' /> : ''}

        <div>{modelShow ? <ReplyModel show parent={tweet} close={this.closeModel}/> : ''}</div>
      </div>
    )
  }
}
export default EachTweet
