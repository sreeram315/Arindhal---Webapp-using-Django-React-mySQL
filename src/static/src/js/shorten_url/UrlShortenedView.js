import React from 'react'
import { Row, Col, Container, Button, Media, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap'
import NavbarMain from '../navbar/NavbarMain'
import './css.css'

class UrlShortenedView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      originalUrl: 'https://reactstrap.github.io/components/spinners/io/components/spinners/',
      shortenedurl: 'https://sreeram.rocks/ksanjdkakjs'
    }
  }

  render () {
    let { originalUrl, shortenedUrl } = this.props
    return (
      <div>
        <NavbarMain active='shortenUrl' />
        <div className='headname_re pt-5 padl-10'>ShortenUrl</div>
        <div className='container-fluid ac_re padt-local local_font lead'>

          Your long url:

          <a className='no_dec' href={originalUrl}><div className='color-grey'>{originalUrl}    </div></a>

               has been successfully been shortened, the site can now be redirected through<br />
          <a className='color_red font_33' href={`https://sreeram.rocks/s/${shortenedUrl}`}>https://sreeram.rocks/s/{shortenedUrl}</a>
        </div>

        <div className='apple_font ac_re pt-5'>
          Thank you for using our service
        </div>
      </div>
    )
  }
}

export default UrlShortenedView
