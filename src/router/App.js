import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Users from '../components/user/Users'
import AddUser from '../components/user/AddUser'
import EditUser from '../components/user/EditUser'
import NotFound from '../components/NotFound'

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={ Users } />
			<Route exact path="/add" component={ AddUser } />
			<Route exact path="/edit/:id" component={ EditUser } />
			<Route component={NotFound} />
		</Switch>
		<div className="footer">
			<div className="copy">PowerBy <a href="https://gnxcode.dev">GNX Code</a> - 2020</div>
		</div>
	</BrowserRouter>
)


export default App
