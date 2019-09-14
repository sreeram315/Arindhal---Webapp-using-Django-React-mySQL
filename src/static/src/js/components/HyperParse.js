import React from 'react'

import './css.css'

class HyperParse extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      parsedText: ''
    }
  }
  componentDidMount () {
    let { startswith, string } = this.props
    let words = string.split(' ')
    let parsedText = ''
    for (var i = 0; i < words.length; i++) {
      if (!(words[i].includes('#'))) { parsedText += words[i] + ' ' } else {
        parsedText += `<a href="/twitter/hashtag/${words[i]}">${words[i]}</a>` + ' '
      }
    }
    this.setState({
      parsedText: parsedText
    })
  }
  render () {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.parsedText }} />
      </div>
    )
  }
}
export default HyperParse
