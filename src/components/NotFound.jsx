import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => (
	<div className="page404">
		<div>
			<h2>Pagina 404</h2>
			<Link to="/">Ir a home</Link>
		</div>
	</div>
)

export default NotFound
