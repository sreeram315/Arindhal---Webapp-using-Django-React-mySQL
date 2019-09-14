import React from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

import './css.css'
import NavbarMain from '../navbar/NavbarMain'
import BlogNav from './BlogNav'
import BlogExpandContent from './expand/BlogExpandContent'
import BlogExpandHeader from './expand/BlogExpandHeader'
import BlogExpandComments from './expand/BlogExpandComments'
import Error404 from '../Error404'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogDetailAction } from '../actions/BlogActions'

class BlogExpand extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      blog: {}
  }

 }
  UNSAFE_componentWillReceiveProps = (nxtProps) => {
    this.setState({
      blog: nxtProps.blog_detail
    })
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    console.log('CALLING API FOR ', this.props.match.params.slug)
    this.props.blogDetailAction(this.props.match.params.slug)
  }

  render () {
    let { headline } = this.props
    let { slug } = this.props.match.params
    let {blog} = this.state

    // blog not found
    if (this.props.blog_detail.detail && this.props.blog_detail.detail === 'Not found.') {
      return (<Error404 />)
    }

    return (
      <div className='padb-20p'>
        <NavbarMain active='blog' />

        {!blog.author

          ? <div>
            <div className='blog_nav'><BlogNav active={`extra: Loading...`} /></div>
            <div className='pt-5 al_re blog_spinner'><div className='spinner-grow text-primary spinner_big' role='status'>
              <span className='sr-only'>Loading...</span>
            </div></div>
          </div>

          : <div>
            <div className='blog_nav'><BlogNav active={`extra:${blog.headline.slice(0, 60)}`} /></div>
            <div className='container-fluid pl-5 pt-3'>
              <Row>
                <Col lg={{ size: 8 }} md={{ size: 9 }} sm={{ size: 12 }}>
                  <BlogExpandHeader headline={blog.headline} preview_points={blog.preview_points} author={blog.author} genre={blog.genre} date_created={blog.date_created} time_created={blog.time_created} date_updated={blog.date_updated} time_updated={blog.time_updated} />
                  <BlogExpandContent className='pt-2' content={blog.content} />
                  <BlogExpandComments slug={blog.slug} />
                </Col>
              </Row>
            </div>
          </div>
        }

      </div>
    )
  }
}

BlogExpand.propTypes = {
  blog_detail: PropTypes.object
}

const mapStateToProps = state => ({
  blog_detail: state.blog.blog_detail
})

export default connect(mapStateToProps, { blogDetailAction })(BlogExpand)
