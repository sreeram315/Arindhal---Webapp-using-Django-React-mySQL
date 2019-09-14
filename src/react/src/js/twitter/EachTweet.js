import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import './css.css'

import HRline from '../components/HRline'
import HyperParse from '../components/HyperParse'
import RedirectTo from '../components/RedirectTo'
import ReplyTweet from './ReplyTweet'
import ReplyModel from './ReplyModel'
import DropdownCaret from './DropdownCaret'

import { Row, Col, Container, Button, Media } from 'reactstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeTweetAction } from '../actions/TwitterActions'

class EachTweet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      showReplies: true,
      noOfrepliesToShow: 0, 
      modelShow: false,
      localLike: null
    }
  }

  replyBut = (e) => {
    e.preventDefault()
    console.log('repliting')
    if(!this.props.isAuthenticated){alert("You need to be logged in to reply to a tweet!"); return}
    this.setState({modelShow: true})
  }

  closeModel = () => {
    this.setState({modelShow: false})
  }

  handleLike = () => {
    if(this.props.isAuthenticated){
      if(!this.state.localLike){
        this.props.likeTweetAction(this.props.tweet.slug)
        this.setState({localLike: true, noOfLikes: this.state.noOfLikes+1})
      }else{
        this.props.likeTweetAction(this.props.tweet.slug)
        this.setState({localLike: false, noOfLikes: this.state.noOfLikes-1})
      }

    }
    else{
      
      alert('Please login or register to like')
    }
  }

  handleSowMoreReplies = () => {
    this.setState({noOfrepliesToShow: this.state.noOfrepliesToShow+3})
  }



  componentDidMount () {
    this.setState({localLike: false})
    console.log('local like: ', this.props.tweet.liked)
    this.setState({localLike: this.props.tweet.liked, noOfLikes: this.props.tweet.likes.length})
  }


  render () {
    let { noOfrepliesToShow, modelShow } = this.state
    let likeButtonclasses = classNames('local_like_but', {
      'text_color_red': this.state.localLike,
      'text_color_blue': !this.state.localLike
    })
    let likeLoveClasses = classNames('fas fa-heart', 'pl-2', { 'not_liked': !this.state.localLike , 
                                                               'liked': this.state.localLike , 
                                                             })
    let {tweet, isAuthenticated} = this.props
    let date = this.props.tweet.date.split('T')[0]
    let time = this.props.tweet.date.split('T')[1].split('.')[0]
    return (
      <div>

      <div>{this.state.redirectLogin ? <RedirectTo path='/login/' /> : ''}</div>

      <div className='pt-2'>

        <div i={tweet.slug}>
          <div class='media'>
            <img src='https://i.ibb.co/Tv6cC4M/image-not-found.gif' class='mr-3 img-fluid' alt={`image of ${tweet.user_name}`} />
            <div class='media-body'>
              <div className="disp_inline">
                <Row>
                  <Col xs={{size:11}}>
                <h5 class='mt-0'><a className='nodec color_black' href={`/user/profile/${tweet.user_slug}`}>{tweet.user_name}</a>
                  <small className='pl-1 username_beside'>@{tweet.user_username} | <span className="ar_re">{date} at {time}</span> </small> </h5>
                  </Col>
                  <Col xs={{size:1}}>
                    <DropdownCaret className="ar_re" slug={tweet.slug} removeFromList={this.removeFromList} refresh={()=>{this.props.refresh()}}/>
                  </Col>
                </Row>
              </div>
              <HyperParse startswith='#' string={tweet.content} />

              <div className='pt-2'>
                <span className=''>{this.state.noOfLikes}</span>
                <i class={likeLoveClasses} />
                <button className={likeButtonclasses} onClick={this.handleLike} >Like</button> |
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
                <div className='py-1'><EachTweet tweet={twi} parent={tweet.slug} isAuthenticated={isAuthenticated} likeTweetAction={this.props.likeTweetAction}/></div>
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
      </div>
    )
  }
}


EachTweet.propTypes = {
  likeTweetAction: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
 
})

export default connect(mapStateToProps, { likeTweetAction })(EachTweet)









