import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import Error404 from '../Error404'
import './css.css'

import ArindhalHeadname from './ArindhalHeadname'
import ArindhalHomeContent from './ArindhalHomeContent'
import BePartFormHome from './BePartFormHome'
import NavbarMain from '../navbar/NavbarMain'

class ArindhalHome extends React.Component {
  render () {
    return (
      <div>
        <NavbarMain active='arindhal' />

        <ArindhalHeadname className='arindhal_head' />

        <div className='container-fluid padr-5'>
          <Row>
            <Col md={{ size: 8 }} sm={{ size: 12, order: 1 }}>
              <ArindhalHomeContent />
            </Col>

            <Col md={{ size: 4 }} sm={{ size: 12, order: 2 }}>
              <BePartFormHome />
            </Col>
          </Row>
        </div>

      </div>
    )
  }
}
export default ArindhalHome
