import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

import NavbarMain from '../navbar/NavbarMain'
import OpenProfileData from './OpenProfileData'
import ImageComp from '../components/ImageComp'
import BlogsByUser from './BlogsByUser'


class OpenProfileView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userDetails: {},
      callBlogView: false
    }
  }

  dataCallBackReceive = (data) => {
    console.log('kuabsdkja----asd-asd---as-d-asd-a-sd-asd-as-d')
    console.log(data)
    this.setState({userDetails: data, callBlogView: true})

  }


  render () {
    let {userDetails, callBlogView} = this.state
    let { slug } = this.props.match.params
    return (
      <div>
        <NavbarMain />

        <div className='p-5'>
          <div className='container-fluid'>
            <Row >
              <Col lg={{ size: 10 }} md={{ size: 12 }}>
                <Row>
                  <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }}>
                    <OpenProfileData slug={slug} dataCallBack={this.dataCallBackReceive} />
                  </Col>
                  <Col md={{ size: 3, order: 2 }} xs={{ size: 12, order: 1 }} className='img_class_local'>
                    <ImageComp src='/static/images/image_not_found.png' width='100%' cn='img-responsive img-thumbnail' border_cn='img_border_grey' />

                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container-fluid">
          <Row>
            <Col sm={{size: 8}}>
              {callBlogView===true ? 
                <BlogsByUser className="" userDetails={userDetails} /> : ''}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default OpenProfileView
