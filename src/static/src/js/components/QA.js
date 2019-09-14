import React from 'react'

import Error404 from '../Error404'

class QA extends React.Component {
  render () {
    let { q, a } = this.props
    return (
      <div >
        <div className='qa_each pb-5' >
          <div className='qa_q' dangerouslySetInnerHTML={{ __html: q }} />
          <hr className='padr-10 hr_qa' />
          <div className='lead' dangerouslySetInnerHTML={{ __html: a }} />
        </div>
      </div>
    )
  }
}
export default QA
