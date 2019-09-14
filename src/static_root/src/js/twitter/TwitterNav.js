import React from 'react'
import { Link } from 'react-router-dom'

import './css.css'
import { Nav, NavItem, NavLink } from 'reactstrap'

class TwitterNav extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle () {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render () {
    const active_port = this.props.active
    return (
      <div>
        <Nav tabs>
          <NavItem >
            <Link to='/twitter/' className='nodec'><NavLink className={active_port === 'home' ? 'active' : ''}>Home</NavLink></Link>
          </NavItem>
          <NavItem >
            <Link to='/twitter/settings' className='nodec'><NavLink className={active_port === 'settings' ? 'active' : ''}>Settings</NavLink></Link>
          </NavItem>

        </Nav>
      </div>
    )
  }
}
export default TwitterNav
