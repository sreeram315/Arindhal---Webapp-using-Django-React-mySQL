import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { tweetDeleteAction } from '../actions/TwitterActions'


class DropdownCaret extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleDelete = (e) => {
    e.preventDefault()
    // this.props.deleteTweetAction()
    console.log('deleting', this.props.slug)
    this.props.tweetDeleteAction(this.props.slug)
    this.props.refresh()
  }

  render () {
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret className='back_twitter color_black no_border' />
        <DropdownMenu>
          <DropdownItem header>Actions</DropdownItem>
          <DropdownItem onClick={this.handleDelete}>Delete</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

DropdownCaret.propTypes = {
  tweetDeleteAction: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
 
})

export default connect(mapStateToProps, { tweetDeleteAction })(DropdownCaret)
