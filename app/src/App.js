import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import User from './user'
import Admin from './admin'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/' component={User} />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)

export default App
