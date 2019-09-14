import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CustomInput, Row, Col, Label, Form } from 'reactstrap'

import EachBlog from './EachBlog'
import BigLoader from '../components/BigLoader'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blogListAction } from '../actions/BlogActions'

class Blogs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      queries: {
        q : '',
        genre: 'all',
        author: '',
      },
  }
}


   handleOnChange = (e) => {
    let genre_selection  =  e.target.value.toUpperCase()
    
      this.setState({loading: true})
      this.setState({queries: {
        q : this.state.q,
        genre: genre_selection,
        author: this.state.author,
      }})

      this.props.blogListAction({
                                  q : this.state.q, genre: genre_selection, author: this.state.author
                                })
      
    }

  UNSAFE_componentWillReceiveProps = (nxtProps) => {
    if('blog_list' in nxtProps)
      this.setState({loading: false})
  }


  componentWillMount () {
    this.setState({loading: true})
    console.log('-----')
    console.log('COMPONENT MOUNTING')
    var url_string = window.location.href
    var url = new URL(url_string);
    let q = url.searchParams.get("q"), genre = url.searchParams.get("genre"), author = url.searchParams.get("author");
    console.log(author)
    this.setState({
      q :q, genre: genre, author: author
    }, () =>  {
      console.log('here hre hre',author,  this.state.queries)
      this.props.blogListAction({
      q :q, genre: genre, author: author
    })
    })
    
  }


  render () {
    let { blog_list } = this.props

    if (blog_list.length == 0) {
      return (
        <div className='pt-5 al_re blog_spinner'><div className='spinner-grow text-primary spinner_big' role='status'>
          <span className='sr-only'>Loading...</span>
        </div></div>)
    }

    return (
      <div className='pt-3'>


        <div className='container-fluid'>
          <Row>
            <Col sm={{ size: 9 }}>
              <div className='headname_re pl-5 apple_font blog_home_headname'><u>Latest Blogs</u>:</div>
            </Col>
            <Col sm={{ size: 3 }}>
            <Form>
              <CustomInput type='select' name='genre' className='ar_re' onChange={this.handleOnChange}>
                <option value="">Genre: All</option>
                <option>Arindhal</option>
                <option>News</option>
                <option>Entertainment</option>
                <option>Educational</option>
              </CustomInput>
              </Form>
            </Col>
          </Row>
        </div>

        {!this.state.loading && blog_list.results.length==0 ? <div className="monaco_font ac_re pt-5">no blogs to show</div> : 
        <div >
        {!this.state.loading ?
          <div>
            {blog_list.results.map((blog, index) => {
              return (<EachBlog blog={blog} key={blog.headname} />)
            })}
          </div>
          : <BigLoader/> }
        </div>
      }
      </div>
    )
  }
}

Blogs.propTypes = {
  blog_list: PropTypes.array
}

const mapStateToProps = state => ({
  blog_list: state.blog.blog_list
})

export default connect(mapStateToProps, { blogListAction })(Blogs)
