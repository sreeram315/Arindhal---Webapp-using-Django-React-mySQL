import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import RegisterView from './RegisterView'
import ProfileView from './profile/ProfileView'
import ProfileEditView from './profile/ProfileEditView'
import OpenProfileView from './OpenProfileView'
import Error404 from '../Error404'

import EachBlog from './EachBlog'
import BigLoader from '../components/BigLoader'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogListAction } from '../actions/BlogActions'

class BlogsByUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  UNSAFE_componentWillReceiveProps (nxtProps) {
    if ('blog_list' in nxtProps) {
      this.setState({ loading: false })
    }
  }

  componentDidMount () {
    console.log('-------')
    console.log(this.props.userDetails)
    let queries = {
      q: '',
      genre: '',
      author: this.props.userDetails.username
    }
    this.props.blogListAction(queries)
  }

  render () {
    let blogs = this.props.blog_list
    let { userDetails } = this.props
    let { loading } = this.state
    return (
      <div>
        <div className='color_black headname_sd_local lead px-5 '>Blogs by {userDetails.name}</div>
        <div>
          {!loading && blogs.results !== undefined
            ? <div>

              {blogs.results.length == 0 ? <div className='monaco_font ac_re pt-5'>no blogs to show</div>
                : <div>{blogs.results.map((blog, index) => {
                  return (
                    <EachBlog blog={blog} />
                  )
                })}</div>
              }
            </div>
            : <BigLoader className='pl-3' />
          }

        </div>
      </div>
    )
  }
}

BlogsByUser.propTypes = {
  blog_list: PropTypes.object
}

const mapStateToProps = state => ({
  blog_list: state.blog.blog_list
})

export default connect(mapStateToProps, { blogListAction })(BlogsByUser)
