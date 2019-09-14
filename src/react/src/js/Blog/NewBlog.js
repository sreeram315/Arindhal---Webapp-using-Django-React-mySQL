import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Row, Col, Form, FormGroup, Label, Input, FormFeedback, FormText, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, CustomInput } from 'reactstrap'
import CKEditor from 'react-ckeditor-component'
import classNames from 'classnames'

import './css.css'
import NavbarMain from '../navbar/NavbarMain'
import BlogNav from './BlogNav'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlogAction } from '../actions/BlogActions'
import { checkAuthAction, userBasicDetailsAction } from '../actions/CamperActions'

class NewBlog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      btn_text: 'Publish',
      btn_disabled: false,

      headline: '',
      preview_points: '',
      content: '',
      genre: '',

      vheadline: '',
      vpreview_points: '',
      vcontent: '',
      vgenre: '',

      genres: [
        "Inspirational",
        "Educational",
        "Entertainment",
        "News",
        "Arindhal"
    ]

    }
  }


  updateContent = (newContent) => {
    this.setState({
      content: newContent
    })
  }

  onChange  = (evt) => {
    console.log('onChange fired with event info: ', evt)
    var newContent = evt.editor.getData()
    this.setState({
      content: newContent
    })
  }

  onBlur =  (evt) => {
    console.log('onBlur event called with event info: ', evt)
  }

  afterPaste = (evt) => {
    console.log('afterPaste event called with event info: ', evt)
  }

  validateEach = (key, value) => {
    let validator = 'v' + key, isValid = false;
    switch (key) {
      case "headline":
        if(value.length >= 5 && value.length <= 100){isValid = true}
        break;

      case "preview_points":
        if(value.split('\n').length <= 3){isValid = true}
        break;

      case "genre":
        if(value!=='Genre' && value!==''){isValid = true}
        break;
      
      default:
        return
    }
    this.setState({[validator]: !isValid})
  }

  handleOnChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    this.setState({[key]: value})
    this.validateEach(key, value)
  }

  handleScroll = (e) => {
  if(window.pageYOffset >= 150 ){
    this.setState({formFixed: true})
  }else {
    this.setState({formFixed: false})
    }
  }

  submitForm = () => {
    this.validateEach('headline', this.state.headline)
    this.validateEach('preview_points', this.state.preview_points)
    this.validateEach('genre', this.state.genre)
    let {vheadline, vgenre, vpreview_points} = this.state
    if(!vheadline && !vgenre && !vpreview_points){
      console.log('form validated')
      this.submitFormApiCall()
    }
  }

  submitFormApiCall = () => {
    this.setState({btn_disabled: true, btn_text: 'Publishing'})
    let {headline, preview_points, genre, content} = this.state
    let data = {
            "headline": headline,
            "preview_points": preview_points,
            "age_restricted": false,
            "content": content,
            "image": null,
            "genre": genre.toUpperCase(),
        }
     console.log('sending data', data)
    this.props.createBlogAction(data)

    
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.setState({btn_disabled: false, btn_text: 'Publish'})
  }




  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
    this.props.checkAuthAction()
  }


  render () {

    //redirect when created
    console.log('XXXX', this.props.blog_created)
    if(this.props.blog_created===true && this.props.blog_detail && this.props.blog_detail.slug){return(<Redirect to={`/blog/${this.props.blog_detail.slug}`}/>)}

    let {isAuthenticated, userBasicDetails} = this.props
    let {headline, preview_points, content, genre, formFixed, genres, vheadline, vgenre, vpreview_points, btn_text, btn_disabled} = this.state
    let newFormClasses = classNames('new_blog_form', {"position_fixed": formFixed})
    return (
      <div>


      {isAuthenticated!==undefined && isAuthenticated === false
            ? <div><NavbarMain active='blog' />
        <div className='blog_nav'><BlogNav active='new-blog' /></div><div className='apple_font font_20 ac_re p-5'> Please login or <a href='/user/register/'>register</a> and start writing blogs here</div>
            </div>
            : '' }

      {isAuthenticated!==undefined && isAuthenticated === true ?     <div>
        <NavbarMain active='blog' />
        <div className='blog_nav'><BlogNav active='new-blog' /></div>
        
      <div className="pl-5 pt-2 container-fluid">
      <Row>
        <Col>
        <div className={newFormClasses}>
          <div className="headname_re ac_re new_blog_heads pb-3"><u>New Blog</u></div>
          <Form>
            <FormGroup>          
              <Input invalid={vheadline} name="headline" id="headline" onChange={this.handleOnChange} placeholder="Headline (Keep it short and simple)"/>
              <FormFeedback invalid>Headline length should be between 5 to 100 charaters</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input invalid={vpreview_points} type="textarea" name="preview_points" id="preview_points" onChange={this.handleOnChange} placeholder="Bullet points"/>
              <FormFeedback invalid>Preview points cannot be more than 3</FormFeedback>
              <FormText>Seperate points by using 'Enter key'</FormText>
            </FormGroup>

            <FormGroup>
              <CustomInput invalid={vgenre} type="select" id="genre" name="genre" onChange={this.handleOnChange}>
                <option>Genre</option>
                {genres.map((g, index) => {
                    return (<option>{g}</option>)
                })}
              </CustomInput>
            </FormGroup>
            

              <CKEditor
              activeClass='p10'
              content={this.state.content}

              events={{
              'blur': this.onBlur,
              'afterPaste': this.afterPaste,
              'change': this.onChange,
              }}
              />
          </Form>
          </div>
          <div className="pt-4 pb-5"><Button disabled={btn_disabled} color="info" block onClick={this.submitForm}>{btn_text}</Button></div>
        </Col>

        <Col>
          <div className="headname_re ac_re new_blog_heads pb-1 preview_headname"><u>Preview</u></div>
          <div className='headname_re headname_blog_expand'>{headline.slice(0,100)}</div>

          <div className="container-fluid">
          <Row>
          <Col>
          {headline.length>0 ? <div className='al_re pt-1 pb-2'>
                <span className='blog_By'>By:</span> <span className='preview_blog_author_name'>{userBasicDetails.name}</span>
          </div> : '' } 
          </Col>
          <Col>
            {genre.length>0 && genre!=='Genre' ? <div className="ar_re"><span className="genre_key">Genre:</span><span className="genre_value">{genre}</span></div> : ''}
          </Col>
          </Row>
          </div>


          <div className="lead">
          {preview_points.length > 0 ?  <ul>
            {preview_points.split('\n').splice(0,3).map((p, index) => {
              return (<li>{p}</li>)
            })}
            </ul> : '' }
          </div>
          {headline.length>0 || preview_points.length> 0 ?<hr/>: ''}
          <div className="lead preview_content" dangerouslySetInnerHTML={{__html: content}} />
        </Col>
      </Row>
      </div>

      </div>
      : '' }
      </div>
    )
  }
}


NewBlog.propTypes = {
  blog_created: PropTypes.bool,
  blog_detail: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  userBasicDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  blog_created: state.blog.blog_created,
  blog_detail: state.blog.blog_detail,
  isAuthenticated: state.camper.isAuthenticated,
  userBasicDetails: state.camper.userBasicDetails,
})

export default connect(mapStateToProps, { createBlogAction, checkAuthAction, userBasicDetailsAction })(NewBlog)



