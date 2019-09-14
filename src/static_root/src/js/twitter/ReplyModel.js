import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, Form, Row, Col, Container, Button, Card, CardBody, CardHeader, CardFooter, CardTitle, CardText, FormGroup, Label, Input } from 'reactstrap'

import HyperParse from '../components/HyperParse'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {createTweetAction} from '../actions/TwitterActions'

class ReplyModel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: this.props.show,
      vtweet: null,
      tweet: '',
    }

  }

  toggle = () => {
    this.props.close()
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submit = () => {
    console.log('submitting')
    this.props.createTweetAction(this.state.tweet, this.props.parent.slug)
  }



  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.tweet.length===0){this.setState({vtweet: false})}
      else{
        this.setState({vtweet: true})
        this.submit()
      }
  }

  render () {
    let {parent} = this.props
    let {vtweet} = this.state
    const closeBtn = <button className='close' onClick={this.toggle}>&times;</button>

    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Reply to: {parent.user_name}</ModalHeader>
          <ModalBody>
            <blockquote className="back_global p-3"> <HyperParse startswith='#' string={parent.content} /></blockquote>
            <div className="px-5">
              <Form>
                <FormGroup>
                  <Label for="tweet">Reply</Label>
                  <Input className="textarea_big"  ref={c=>this.textarea=c} valid={vtweet} invalid={vtweet!==null && vtweet!==null & !vtweet} type='textarea' name='tweet' id='tweet' value={this.state.tweet} name='tweet' onChange={this.handleInputChange} />
                  <FormFeedback invalid>type something re!</FormFeedback>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.handleSubmit}>Reply</Button>{' '}
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}


ReplyModel.propTypes = {
  response: PropTypes.string.isRequired,
  createTweetAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { createTweetAction })(ReplyModel)




