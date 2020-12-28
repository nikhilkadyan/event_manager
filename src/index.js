import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './master.scss'

// Components
import Navbar from './Components/Navbar'

// Pages
import Events from './Pages/Events'
import Authors from './Pages/Authors'
import Auth from './Pages/Auth'

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navbar />
			<Switch>
				<Redirect from="/" to="/events" exact />
				<Route path="/events" component={Events} />
				<Route path="/authors" component={Authors} />
				<Route path="/auth" component={Auth} />
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
)

