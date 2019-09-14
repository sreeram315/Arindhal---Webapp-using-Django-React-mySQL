import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import RedirectTo from '../components/RedirectTo'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRedirectionUrlAction } from '../actions/ShortenUrlActions'

import Error404 from '../Error404'

class ShortenUrlRedirect extends React.Component {
  constructor (props) {
    super(props)
    this.setState = {
    }
  }

  componentDidMount () {
  	this.props.getRedirectionUrlAction(this.props.match.params.slug)
  }

  redirectToAnotherPage () {
  	window.location.assign(this.props.redirectionLink)
  }

  render () {
  	let { redirectionLink, wait } = this.props
  	const { slug } = this.props.match.params
    return (
      <div>
        {wait ? 'redirecting, please wait...' : this.redirectToAnotherPage() }
      </div>
    )
  }
}

ShortenUrlRedirect.propTypes = {
  redirectionLink: PropTypes.string.isRequired,
  wait: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  redirectionLink: state.shortenurl.redirectionLink,
  wait: state.shortenurl.wait
})

export default connect(mapStateToProps, { getRedirectionUrlAction })(ShortenUrlRedirect)
