import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Col, Row, Button } from 'reactstrap'

import FollowersDispModel from './profile/FollowersDispModel'
import './css.css'
import cookie from 'react-cookies'

import { Display2Data, DisplayData } from '../components/DisplayData'
import HRline from '../components/HRline'
import Loader from '../components/Loader'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userOpenDetailAction, checkAuthAction, userBasicDetailsAction } from '../actions/CamperActions'



class OpenProfileData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      userBasicDetails: {},
      followersModel: false,
      followingModel: false,
      buffering: true,
      hoverFollowButText: 'Unfollow',
      hoveringFollow: false,

      alreadyFing: false
    }
  }



  closeModel = () => {
    this.setState({followingModel: false, followersModel: false})
  }

  showFollowing = () => {
    this.setState({followingModel: true})
  }

  showFollowers = () => {
    this.setState({followersModel: true})
  }



  UNSAFE_componentWillReceiveProps(nextProps){
    console.log(nextProps.userDetails)
    if('userDetails' in nextProps){
      this.setState({noOfFollowers: nextProps.userDetails.followers_count})
      this.setState({buffering: false})
      

    }
    if('userDetails' in nextProps && 'userBasicDetails' in nextProps && nextProps.userBasicDetails.following && nextProps.userDetails.username){
      this.setState({alreadyFing: (nextProps.userBasicDetails.following).includes(nextProps.userDetails.username)})
    }  
    if('userDetails' in nextProps && 'detail' in nextProps.userDetails && nextProps.userDetails.detail==='Not found.'){
      
    }

    // call back with name
    if('username' in nextProps.userDetails)
      this.props.dataCallBack(nextProps.userDetails)

  }

   toggleFollow = () => {
     if(this.props.isAuthenticated===false){alert("Please login to follow this user"); return}
      const thisComp = this
      console.log("follow", this.props.userDetails.username)
    // this.setState({submittingFormBuffer: true})
    console.log('performing follow toggle')
    const endpoint = '/api/accounts/user-follow-toggle/'
    const csrf_token = cookie.load('csrftoken')
    let token  = localStorage.getItem('authToken')
    let data = {
      'username': this.props.userDetails.username,
      'action': 'toggle'
    }

    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf_token,
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then(function (res) {
        return res.json()
      }).then(function (json)  {
         console.log(json)
         if(thisComp.state.alreadyFing){
           thisComp.setState({noOfFollowers: thisComp.state.noOfFollowers-1, alreadyFing: false})
         }else{
           thisComp.setState({noOfFollowers: thisComp.state.noOfFollowers+1, alreadyFing: true})
         }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  hoveringFollow = () => {
    this.setState({hoveringFollow: true,})
  }
  leavingFollow = () => {
    this.setState({hoveringFollow: false,})
  }

  componentDidMount() {
    this.props.checkAuthAction()
    this.props.userOpenDetailAction(this.props.slug)
    this.props.userBasicDetailsAction()
  }






  render () {
  

    let { buffering, alreadyFing } = this.state
    let {isAuthenticated , userBasicDetails } = this.props
    let data = this.props.userDetails
    let alreadyFollowing = userBasicDetails.following!==undefined && data.username!==undefined && (userBasicDetails.following).includes(data.username)
    let personIsSelfViewing = data.username===userBasicDetails.username
    if(data.slug!==this.props.slug){this.props.userOpenDetailAction(this.props.slug); this.props.userBasicDetailsAction()}
    return (
      <div>
      { buffering===false ? 
      <div>
        <Row>
          <Col sm={{ size: 9 }}>
            <div className='headname_sd_local lead'>{data.name}</div>
          </Col>
         
          {!personIsSelfViewing ?
            <div>
            <Col sm={{ size: 3 }}>
              <div className="local_up2">
                <Button className="button_no_out" outline color={this.state.hoveringFollow&&alreadyFing ? "danger" : "info"} onClick={this.toggleFollow} onMouseEnter={this.hoveringFollow} onMouseLeave={this.leavingFollow}>
                
                {this.state.hoveringFollow&&alreadyFing ? this.state.hoverFollowButText :
                <div>{alreadyFing ? 'Following' : 'Follow'}</div>
              }

                </Button>
              </div>
            </Col></div>
            : '' }



        </Row>
        <HRline />

        <div className='container-fluid pb-5'>
          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><Display2Data index='Username' value={data.username} big /></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><Display2Data index='Contact' value={data.contact} big /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='DOB' value={data.dob} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Email' value={data.email} /></Col>
          </Row>

          <Row>
            <Col sm={{ size: 6 }} xs={{ size: 12 }}><a className="no_dec" href="#" onClick={this.showFollowing}><Display2Data index='Following' value={data.following_count} /></a></Col>
            <Col sm={{ size: 5 }} xs={{ size: 12 }}><a className="no_dec" href="#" onClick={this.showFollowers}><Display2Data index='Followers' value={this.state.noOfFollowers} /></a></Col>
          </Row>

          <HRline cn='padx-10' />

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Address' value={data.address} /></Col>
          </Row>

          <Row>
            <Col md={{ size: 12 }}><DisplayData index='Description' value={data.description} /></Col>
          </Row>

        </div>
        <FollowersDispModel isOpen={this.state.followersModel} headline={`${data.name}'s followers (${data.followers_count})`} usersList={data.followers} callBack={this.closeModel}/>
        <FollowersDispModel isOpen={this.state.followingModel} headline={`${data.name}'s followers (${data.following_count})`} usersList={data.following} callBack={this.closeModel}/>
      </div>
      : <Loader className="p-5" big align="center"/> }
      </div>
    )
  }
}


OpenProfileData.propTypes = {
  userDetails: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  userBasicDetailsAction: PropTypes.func.isRequired,
  userBasicDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userDetails: state.camper.userDetails,
  isAuthenticated: state.camper.isAuthenticated,
  userBasicDetails: state.camper.userBasicDetails
})

export default connect(mapStateToProps, { userOpenDetailAction, userBasicDetailsAction, checkAuthAction })(OpenProfileData)




