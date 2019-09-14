import React from 'react'
import classNames from 'classnames'
import './css.css'

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
  	e.preventDefault()
  	console.log('clicked')
  	if(this.state.tweet.length===0){this.setState({vtweet: false})}
  		else{
  			this.setState({vtweet: true})
  			this.submit()
  		}
  }

  submit = () => {
  	console.log('submiting form')
  }

  componentDidMount () {
  }

  render () {
  	let {vtweet} = this.state
    return (
      <div className='new_tweet pb-5'>
        <Card>
          <CardHeader className='color_fav back_global lead ac_re'><strong>New tweet</strong></CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <Input  ref={c=>this.textarea=c} valid={vtweet} invalid={vtweet!==null && vtweet!==null & !vtweet} type='textarea' name='tweet' id='tweet' value={this.state.tweet} name='tweet' onChange={this.handleInputChange} />
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

export default NewTweet
