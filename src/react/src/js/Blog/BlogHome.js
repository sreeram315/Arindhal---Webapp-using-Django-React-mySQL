import React from 'react'
import { Button, Row, Col } from 'reactstrap'

import './css.css'
import NavbarMain from '../navbar/NavbarMain'
import BlogNav from './BlogNav'
import Blogs from './Blogs'

class BlogHome extends React.Component {
  render () {
    return (
      <div >
        <NavbarMain active='blog' />
        <div className='blog_nav'><BlogNav active='home' /></div>
        <div className='container-fluid'>
          <Row>
            <Col lg={{ size: 7 }} md={{ size: 9 }} sm={{ size: 12 }}>
              <Blogs />
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}
export default BlogHome
