import React from 'react'
import { Row, Col, Container, Button, Media, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap'
import NavbarMain from '../navbar/NavbarMain'
import UrlShortenedView from './UrlShortenedView'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createShortenurlAction, checkCustomUrlAvailableAction } from '../actions/ShortenUrlActions'

import './css.css'

class ShortenUrlHomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      originalLink: '',
      customUrl:    '',
      voriginalLink: null,
      vcustomUrl: null,

      buttonText: 'Submit',
      buttonDisable: false,
      submittingWait: false,
    }
  }

  validate_each(key, value){
    let validator = 'v' + key;
    if (key == 'originalLink' && /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(value)){
      console.log(key, "valid")
      this.setState({[validator]: true})
      return true
    }
    else if((key == 'customUrl' && value.length >= 0)){
      console.log(key, "valid")
      this.setState({[validator]: true})
      return true
    }
    console.log(key, 'not valid')
    this.setState({[validator]: false})
    return
  }

  handleOnChange = (e) => {
    let key = e.target.name, value = e.target.value;
    console.log(key, '---',value )
    this.setState({[key]: value}, function()  {
      this.validate_each(key, value)
    })

    if(key=='customUrl'){
      this.props.checkCustomUrlAvailableAction(e.target.value)
    }

  }

  validate_all = (e) => {
    if(this.validate_each('originalLink', this.state.originalLink) && this.validate_each('customUrl', this.state.customUrl))
      return true
    return false
  }

  submitForm = () => {
    this.setState({submittingWait: true})
  let data = {
      'originalUrl': this.state.originalLink,
      'customUrl': this.state.customUrl,
    }
    console.log('data is', data)
    console.log('API call here ')
    this.props.createShortenurlAction(data)
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.setState({buttonText: 'Submitting...', buttonDisable: true})
    if (this.validate_all()===true){
      console.log('FORM VALIDATRED')

      this.submitForm()


    }
    else{
      this.setState({buttonText: 'Submit', buttonDisable: false})
      console.log('FORM INVALID')
    }
  }

  render () {
    let { voriginalLink, vcustomUrl, submittingWait, originalLink } = this.state
    let { shortenedUrl, customUrlAvailable } = this.props

    if(shortenedUrl.length>0){return (<div> <UrlShortenedView originalUrl={originalLink} shortenedUrl={shortenedUrl}/> </div>)}


    let customUrlValid = (vcustomUrl && (customUrlAvailable===null || customUrlAvailable===true))
    let customUrlInValid = (!vcustomUrl && vcustomUrl!==null) 
    let customUrlTaken = !customUrlAvailable
    if(customUrlAvailable===true){customUrlTaken=false}else if(customUrlAvailable===false){customUrlTaken = true}else{customUrlTaken=null}

    return (
      <div>
        <NavbarMain active='shortenurl' />
        <div>
          <div className='container-fluid'>
            <Row className='pt-5 padl-10' >
              <Col md={{ size: 7 }} xs={{ size: 12 }} sm={{ size: 12 }} >
                <div className='headname_re pb-4 pl-1'>
                        ShortenUrl
                </div>

                {submittingWait ? 
                  <div className="pt-3 ac_re"><div className="spinner-grow text-primary spinner_big" role="status">
                <span className="sr-only">Loading...</span>
              </div></div>
                :
                <Form className='pr-5'>
                  <FormGroup>
                    <Label for='originalLink'>Original Link</Label>
                    <Input valid={voriginalLink} invalid={!voriginalLink && voriginalLink!==null} name='originalLink' type='text' bsSize='lg' onChange={this.handleOnChange} placeholder="https://google.com/"/>
                    <FormFeedback valid>Nice! let's shorten this</FormFeedback>
                    <FormFeedback invalid>That doesn't seem to be a valid url</FormFeedback>
                    <FormText>Provide a valid http or https link</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for='customUrl'>https://sreeram.info/</Label>
                    <Input valid={customUrlValid} invalid={customUrlTaken===true || (customUrlInValid && !customUrlTaken)} type='text' name='customUrl' onChange={this.handleOnChange} placeholder="Custom Url (optional)"/>
                    <FormFeedback valid>Sweet! that url is available</FormFeedback>
                    {customUrlTaken===true ?<FormFeedback invalid> That url seems to be taken :( </FormFeedback> : ''}
                    {customUrlInValid && !customUrlTaken ? <FormFeedback invalid> That url seems to be taken :( </FormFeedback> : ''}
                  </FormGroup><br />
                  <Button disabled={this.state.buttonDisable} color='primary width_100 py-2' outline onClick={this.handleSubmitForm}> {this.state.buttonText} </Button>
                </Form>
            }

              </Col>

            </Row>
          </div>
        </div>
      </div>
    )
  }
}


ShortenUrlHomeView.propTypes = {
  shortenedUrl: PropTypes.string.isRequired,
  customUrlAvailable: PropTypes.bool,
}

const mapStateToProps = state => ({
   shortenedUrl: state.shortenurl.shortenedUrl,
   customUrlAvailable: state.shortenurl.customUrlAvailable
})

export default connect(mapStateToProps, { createShortenurlAction, checkCustomUrlAvailableAction })(ShortenUrlHomeView)




