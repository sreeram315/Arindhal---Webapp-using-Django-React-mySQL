import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavbarMain from '../navbar/NavbarMain'
import BigLoader from '../components/BigLoader'

class WeatherMonitor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        
      },
      loadingData: true,
    }
  }

  loadData =  () => {
    const thisComp = this
    const endpoint = "/api/twm/current-temperature"

    let lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(endpoint, lookupOptions)
      .then(function (response)  {
        return response.json()
      }).then(function (responseData) {
        console.log(responseData)
        thisComp.setState({
          data: responseData,
          loadingData: false
        })
      }).catch(function (error) {
        console.log(error)
      })
  }

  componentDidMount(){
    this.loadData()
  }


  render () {
    let { data, loadingData } = this.state
    return (
      <div>
        <NavbarMain active='twm' />
        <div className='pl-5'>

          <div className='headname_re  pt-5 pb-2'>Teja's Weather Monitor System:</div>
          <div className='apple_font'> Current temparature:</div>

          {loadingData==false ? 
          <div className='display-1 padl-20'>{data.temperature} &#176;C</div> : '' }

          {loadingData==true ? 
           <BigLoader/>
            : ''}

          <div className='apple_font pt-5'><u>Last updated</u>:<strong>{data.date} at {data.time}</strong></div>

        </div>
      </div>
    )
  }
}
export default WeatherMonitor
