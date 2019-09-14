import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import classNames from 'classnames'
import './css.css'

import HRline from '../components/HRline'
import HyperParse from '../components/HyperParse'

import { Row, Col, Container, Button, Media } from 'reactstrap'

class ReplyTweet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      notLiked: false,
      Liked: true
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <HRline cn='padx-5' />
      </div>
    )
  }
}

export default ReplyTweet
