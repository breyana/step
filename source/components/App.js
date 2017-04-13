import React from 'react'
import axios from 'axios'
import { Router, Route, browserHistory } from 'react-router'
import componentErrorHandler from './utilities/componentErrorHandler'
import ProjectContainer from './Project/ProjectContainer'
import LoginContainer from './Login/LoginContainer'
import globalState from './utilities/globalState'
import GlobalStateComponent from './reusable/ParentClasses/GlobalStateComponent'

export default class App extends GlobalStateComponent {
  constructor() {
    super()
    this.state = globalState.get()
  }

  componentDidMount() {
    axios.get('http://localhost:1337/session')
      .then( response => {
        console.log('====>', response.data)
        if (response.data.userId) {
          console.log('------------>  user is logged in')
          globalState.set({
            userId: response.data.userId,
            currentProjectId: null,
            couldDos: {},
            projects: []
          })
        } else {
          console.log('------------>  redirecting to login')

          browserHistory.push('/login')
        }
      } )
      .catch( componentErrorHandler( 'App' ) )
  }

  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ ProjectContainer } />
        <Route path='/login' component={ LoginContainer } />
      </Router>
    )
  }
}
