import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './comon/PrivateRoute'
import User from './user'
import Admin from './admin'

const App = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path='/admin'>
        <Admin />
      </PrivateRoute>
      <Route path='/'>
        <User />
      </Route>
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>
)

export default App
