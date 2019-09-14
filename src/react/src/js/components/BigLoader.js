import React from 'react'
import classNames from 'classnames'

import './css.css'

class BigLoader extends React.Component {
  render () {
    var loader_classes = classNames('spinner-border text-primary',
      { 'big_loader_re': this.props.big })
    var divClasses = classNames(
      `d-flex justify-content-${this.props.align} float-${this.props.align}`,
      `p-${this.props.pad}`
    )
    return (
      <div>
        <div className='pt-5 al_re blog_spinner'><div className='spinner-grow text-primary spinner_big' role='status'>
          <span className='sr-only'>Loading...</span>
        </div></div>
      </div>
    )
  }
}
export default BigLoader
