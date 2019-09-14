import React from 'react'

import classNames from 'classnames'
import { Form, FormGroup, Input, FormFeedback, FormText, Label, Col, Row, Button, Alert } from 'reactstrap'
import Error404 from '../Error404'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { contributerAddAction } from '../actions/ArindhalActions'

class BePartFormHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      head: '<b>Be a part of the mission</b>',
      formInfo: 'Submit the form and become a part, we will contact you when we need the expertise of your field. <br />You can bow out at anytime. ',

      name: '',
      email: '',
      dob:  '2019-02-10',
      description: '',
      vname: null,
      vemail: null,
      vdob: null,
      vdescription: null,
      descriptionPlaceholder: '(optional)',

      btnDisable: false,
      sendingData: false,
      sentData: false,
    }
     this.form_ref = React.createRef();
  }

  validateEach = (key, value) => {
    console.log('called wiht', key, value)
    let validator = 'v' + key
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      switch(key){
        case 'name':
          if(value.length >= 3){
            console.log('GOOD NAME')
            this.setState({[validator]: true}) 
            return         
          }
          break
          
        case 'email':
          if(emailRegex.test(value)){
            this.setState({[validator]: true})
            return
          }
          break

        case 'dob':
          var today = new Date();
          var age = today.getFullYear() - value.slice(0,4)
          if(age >= 18){
            this.setState({[validator]: true})   
            return    
          }
          break

        case 'description':
          if(true){
            this.setState({[validator]: true})
            return
          }
          break

      }
      this.setState({[validator]: false})
      
  }

  handleSubmitForm = (e) => {
    let {vname, vemail, vdob } = this.state
    e.preventDefault()
    console.log('submit initialted')
    var arr = ['name', 'email', 'dob']
    console.log( arr[0])
    for(var i =0 ; i < arr.length; i++){
      console.log('asbndoaisndjk')
      this.validateEach(arr[i], this.state[arr[i]])
    }
    if(vname && vemail && vdob ){
      console.log("FORM VALIDATED")
      this.submitForm()
    }
  }

  submitForm = () => {
    this.setState({btnDisable: true, sendingData: true})
    let { name, email, dob, description } = this.state
    let data = {
      'name': name,
      'email': email,
      'dob': dob,
      'description': description,
    }
    // API API API
    this.props.contributerAddAction(data)
    
    
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    console.log("REVEING PROPS")
    console.log(nextProps)
      if('contributerData' in nextProps){
        this.setState({
          sentData: true,
          sendingData: false,
          btnDisable: false,

          name: '',
          email: '',
          dob:  '2019-02-10',
          description: '',
          vname: null,
          vemail: null,
          vdob: null,
          vdescription: null,
          
        })
      }
  }

  handleOnChange = (e) => {
    // console.log(window.pageYOffset)
    // console.log(this.form_ref.current.offsetTop)
    let key = e.target.name, value = e.target.value
    this.setState({[key]: value})
    this.validateEach(key, value)
    console.log(key, '---', value)
    console.log(this.state)
  }

  handleScroll = (e) => {
    if(window.pageYOffset >= 150 ){
      console.log('FIXING')
      this.setState({formFixed: true})
    }else {
      console.log('UNFIXING')
      this.setState({formFixed: false})
    }
  }

  onDismiss = () => {
    this.setState({ sentData: false });
  }

  componentDidMount(){
    // this.form_ref.current.addEventListener('scroll', this.handleScroll)
    window.addEventListener("scroll", this.handleScroll);
    this.refs.form_ref.reset()
  }




  render () {

    if (this.state.sendingData){return(<div className="pt-3 ac_re loading_symbol"><div className="spinner-grow text-primary spinner_big" role="status">
                <span className="sr-only">Loading...</span>
              </div></div>)}

    let { head, formInfo, name, email, dob, descriptionPlaceholder, vname, vemail, vdob, formFixed, btnDisable, sentData } = this.state
    let formClasses = classNames('form_arindhal', {"unfixed_form_arindhal pt-5": !formFixed ,"fixed_form_arindhal": formFixed})
    console.log(formClasses)
    return (

      

      <div className={formClasses} ref={this.form_ref} onScroll={this.handleScroll}>
      

        <div className='form_headname_arindhal' dangerouslySetInnerHTML={{ __html: head }} /><hr />
        {sentData?
          <Alert color="success">
              Thank you {this.props.contributerData.name}. You are a part of the team now. We will contact you when there is a need of your expertise. Let's do this!
          </Alert> 
      : '' }

        <form className='' id="form_id" ref="form_ref">
          <FormGroup>
            <Row>
              <Col sm={12} lg={2}><Label for='name' className='pt-2'>Name: </Label></Col>
              <Col sm={12} lg={10}>
                  <Input invalid={vname===false} valid={vname===true} type='text' name='name' value={name} placeholder='Jonathan Thakur' onChange={this.handleOnChange} />
                  <FormFeedback invalid>Name should be atleast 3 character long</FormFeedback>
              </Col>
            </Row>
           
          </FormGroup>

          <FormGroup>
            <Row>
              <Col sm={12} lg={2}><Label for='email' className='pt-2'>Email: </Label></Col>
              <Col sm={12} lg={10}>
              <Input invalid={vemail===false} valid={vemail===true} type='text' name='email' value={email} placeholder='jonthak@gmail.com' onChange={this.handleOnChange} />
                <FormFeedback invalid>Not a valid email!</FormFeedback>
                <FormText>We will not share this with anyone</FormText>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col sm={12} lg={2}><Label for='dob' className='pt-2'>DOB: </Label></Col>
              <Col sm={12} lg={10}>
                <Input invalid={vdob===false} valid={vdob===true} type='date' id='dob' name='dob' value={dob} onChange={this.handleOnChange}/>
                <FormFeedback invalid>You should be atleast 18 year old</FormFeedback>
                <FormText>We will not share this with anyone</FormText>
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Label for='description'>How can you contribute ?</Label>
            <Input type='textarea' name='description' id='description' placeholder={descriptionPlaceholder} className='px-1' onChange={this.handleOnChange}/>
            <FormText> Breifly explain your area of expertise so that we can decide on what job could be the best fit for you.<br/> Any kind of skill set is appreciated</FormText>
          </FormGroup>
          <small dangerouslySetInnerHTML={{ __html: formInfo }}  /><br/>

          <div className="pt-2"><Button disabled={btnDisable}  block outline color="primary" onClick={this.handleSubmitForm}>Submit</Button></div>

        </form>

        

      </div>
    )
  }
}


BePartFormHome.propTypes = {
  contributerAddAction: PropTypes.func.isRequired,
  contributerData: PropTypes.object,
}

const mapStateToProps = state => ({
  contributerData: state.arindhal.contributerData,
})

export default connect(mapStateToProps, { contributerAddAction })(BePartFormHome)


