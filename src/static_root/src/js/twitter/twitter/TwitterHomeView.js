import React from 'react'
import { Row, Col, Container, Button, Media } from 'reactstrap'

import NavbarMain from '../navbar/NavbarMain'

import TweetList from './TweetList'
import NewTweet from './NewTweet'
import TwitterNav from './TwitterNav'

class TwitterHomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <NavbarMain active='twitter' />
        <div>

          <div className='container-fluid px-5'>
            <div className='pt-4 pl-4'><TwitterNav active='home' /></div>
            <Row className='py-5'>

              <Col md={{ size: 8, order: 1 }} xs={{ size: 12, order: 2 }} sm={{ size: 12, order: 2 }} className='px-5'>

                <TweetList />
              </Col>
              <Col md={{ size: 4, order: 2 }} xs={{ size: 12, order: 1 }} sm={{ size: 12, order: 1 }}>
                <NewTweet />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default TwitterHomeView
