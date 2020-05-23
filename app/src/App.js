import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/admin' component={Admin} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
