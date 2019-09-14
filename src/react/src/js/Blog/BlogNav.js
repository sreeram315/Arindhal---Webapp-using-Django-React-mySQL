import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap'

export default class BlogNav extends React.Component {
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
    let { active } = this.props
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Link to='/blog' className='no_dec'><NavLink className={(active === 'home') ? 'active' : ''}>Home</NavLink></Link>
          </NavItem>

          <NavItem>
            <Link to='/blog/new-blog/' className='no_dec'><NavLink className={active === 'new-blog' ? 'active' : ''}>New Blog</NavLink></Link>
          </NavItem>

          <NavItem>
            <Link to='#' className='no_dec'><NavLink disabled >Settings</NavLink></Link>
          </NavItem>

          {active.includes('extra')
            ? <NavItem>
              <Link to='#' className='no_dec'><NavLink disabled active>Blog: {active.split(':')[1]}</NavLink></Link>
            </NavItem>
            : ''
          }
        </Nav>
      </div>
    )
  }
}
