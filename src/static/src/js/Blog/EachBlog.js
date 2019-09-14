import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap'

class EachBlog extends React.Component {
  render () {
    let { blog } = this.props
    let contSize
    console.log('checking')
    if (blog.image !== null) {
      console.log('IMAGE FOUND')
      contSize = 8
    } else {
      console.log('IMAGE NOT FOUND')
      contSize = 12
    }
    console.log(contSize)

    let preview_content = blog.content.slice(0, 300)
    if (blog.content.length > 300) {
      preview_content += " <span><span>...</span><Link class='no_dec' to={`/blog/${blog.slug}`}>(Read more)</Link></span>  "
    }

    return (

      <div className='each_blog'>
        <div class='border rounded pl-3 shadow p-3 mb-5 bg-white rounded'>

          <Link to={`/blog/${this.props.blog.slug}`} className='no_dec'>
            <div className='headname_re blog_headname_fontsize al_re'> {blog.headline} </div>
            <div className='container-fluid'>
              <Row>
                <Col md={{ size: contSize, order: 1 }} sm={{ size: 12, order: 2 }}>
                  {blog.preview_points.length > 0
                    ? <div className='al_re pre_points'>
                      <ul>
                        {blog.preview_points.split('\n').splice(0, 2).map((pp, index) => {
                          return (
                            <li>{pp}</li>
                          )
                        })}
                      </ul>
                    </div>
                    : ''}

                  <div className='al_re pre_content' dangerouslySetInnerHTML={{ __html: preview_content }} />
                </Col>

                {blog.image === null ? ''
                  : <Col md={{ size: 4, order: 2 }} sm={{ size: 12, order: 1 }}>
                    <img width='100%' src={blog.image} />
                  </Col>
                }
              </Row>
            </div>
          </Link>
          <Row><Col md={{ size: contSize }} sm={{ size: 12 }}><footer class='blockquote-footer ar_re'>Article by <cite title='Source Title'><a href={`/user/profile/${blog.author.slug}`}>{blog.author.name}</a> - {blog.date_created}</cite></footer></Col></Row>
        </div>

      </div>

    )
  }
}
export default EachBlog
