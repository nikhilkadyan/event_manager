import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './master.scss'

// Components
import Navbar from './Components/Navbar'

// Pages
import Schedule from './Pages/Schedule'
import Authors from './Pages/Authors'
import Admin from './Pages/Admin'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navbar />
			<Switch>
				<Redirect from="/" to="/schedule" exact />
				<Route path="/schedule" component={Schedule} />
				<Route path="/authors" component={Authors} />
				<Route path="/admin" component={Admin} />
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

