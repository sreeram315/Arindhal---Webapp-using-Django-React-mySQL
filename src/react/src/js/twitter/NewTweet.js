import React from 'react'
import classNames from 'classnames'
import './css.css'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import RedirectTo from '../components/RedirectTo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createTweetAction, checkAuthAction} from '../actions/TwitterActions'

import { FormFeedback, Form, Row, Col, Container, Button, Card, CardBody, CardHeader, CardFooter, CardTitle, CardText, FormGroup, Label, Input } from 'reactstrap'

class NewTweet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vtweet: null, 
      tweet: ''
    }
  }

  handleInputChange = (e) => {
     this.textarea.focus();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    if(this.props.isAuthenticated === false){
        console.log('NOT LOGGED IN RE');
        window.location.href = '/user/register'
      }
    e.preventDefault()
    console.log('clicked')
    if(this.state.tweet.length===0){this.setState({vtweet: false})}
      else{
        this.setState({vtweet: true})
        this.submit()
      }
  }

  submit = () => {
    this.props.createTweetAction(this.state.tweet)
    this.refs.form.reset()
  }



  componentDidMount () {
  }

  render () {
    this.props.refresh()
    let {vtweet} = this.state
    return (
      <div className='new_tweet pb-5'>
        <Card>
          <CardHeader className='color_fav back_global lead ac_re'><strong>New tweet</strong></CardHeader>
          <CardBody>
            <Form ref="form">
              <FormGroup>
                <Input  ref={c=>this.textarea=c} valid={vtweet} invalid={vtweet!==null && vtweet!==null & !vtweet} type='textarea' name='tweet' id='tweet' value={this.state.tweet} name='tweet' onChange={this.handleInputChange} placeholder="What's on your mind?" />
                <FormFeedback invalid>type something re!</FormFeedback>
              </FormGroup>
              <Button block className="no_border" color='primary' onClick={this.handleSubmit}>tweet</Button>
            </Form>

          </CardBody>

        </Card>
      </div>
    )
  }
}

NewTweet.propTypes = {
  createTweetAction: PropTypes.func.isRequired,
  checkAuthAction: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.twitter.isAuthenticated
})

export default connect(mapStateToProps, { createTweetAction, checkAuthAction })(NewTweet)





