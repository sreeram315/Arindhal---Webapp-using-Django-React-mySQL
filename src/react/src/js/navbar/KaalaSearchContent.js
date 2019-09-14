import React from 'react'
import { DropdownItem } from 'reactstrap'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

import HRline from '../components/HRline'
import Loader from '../components/Loader'

import './css.css'

class KaalaSearchContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      buffering : false,
      data: []
    }
  }

  loadData = (q) => {
    this.setState({buffering: true})
    let thisComp = this
    const endpoint = `/api/camper-kaala-search/?q=${q}`
    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {
        thisComp.setState({buffering: false})
        thisComp.setState({data: responseData})
      }).catch(function (error) {
        console.log(error)
      })
  }

  redirectTo = (link) => {
    window.location.href = link
  }

  componentDidMount(){
    this.loadData(this.props.q)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
     this.loadData(nextProps.q)
  }



  

  render () {
    let users = this.state.data.users
    let blogs = this.state.data.blogs
    let {data, buffering} = this.state
    return (
      <div className=''>

      {buffering===true ? <div className="p-3"><Loader  align="center"/></div> : 

      <div>
          {data==='NaN' ? <div className="apple_font ac_re p-3">Nothing to show</div> :

            <div className='kaala_users'>
              {users!==undefined && users.length > 0 ? <div className='pl-2 pt-2 pb-1 apple_font font_20 shead'>Users</div> : '' }
              <div>
                {users!==undefined ? users.map((user, index) => {
                  return (
                    <a className="no_dec" href={`/user/profile/${user.slug}`}>
                    <div key={user.slug} className='no_dec'>
                      <div  className='py-1 pl-3 no_dec'>
                        <DropdownItem onClick={this.onClick}>
                          {user.name}  ({user.username})<br /><small>followers: {user.followers}&ensp; following: {user.following}</small>
                        </DropdownItem>
                      </div>
                    </div>
                    </a>
                  )
                }): ''}
              </div>

              {blogs!==undefined && blogs.length > 0 ? <div className='pl-2 pt-2 pb-1 apple_font font_20 shead'>Blogs</div> : ''}
              <div>
                {blogs!==undefined ? blogs.map((blog, index) => {
                  return (
                    <a className="no_dec" href={`/blog/${blog.slug}`}>
                    <div key={blog.slug} className='no_dec' >
                      <div  className='py-1 pl-3 no_dec' >
                        <DropdownItem >
                         {blog.headline.slice(0,24)}
                          <br /><small> <span className="color_gray color_grey" dangerouslySetInnerHTML={{__html: blog.content.slice(0, 30)}} /></small>
                        </DropdownItem>
                      </div>
                    </div>
                    </a>
                  )
                }): ''}
              </div>

            </div>

          }
      </div>
    }

      </div>
    )
  }
}

export default KaalaSearchContent
