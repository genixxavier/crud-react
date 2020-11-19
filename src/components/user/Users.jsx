import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/styles/users.scss'

import iconedit from '../../assets/icons/editar.svg'
import icondelete from '../../assets/icons/basura.svg'


const Users = () => {

	let data = [
		{
			"id": 1,
			"name": "Genix",
			"lastname": "Granados",
			"position": "Dev",
			"age": 30
		},
		{
			"id": 2,
			"name": "David",
			"lastname": "Quispe",
			"position": "Economia",
			"age": 25
		}
	]

	const [listaUser,setListaUser] = useState([])
	const [alerta, setAlerta] = useState({
		exito: false,
		actualizar: true
	})


	const obtenerLocationStorage = () => {
		let dataL	
		if(localStorage.getItem('listUser') === null){
    	localStorage.setItem('listUser',JSON.stringify(data))
			dataL = JSON.parse(localStorage.getItem('listUser'))
		} else{
  		dataL = JSON.parse(localStorage.getItem('listUser'))
		}

		return dataL
	}


	useEffect(()=>{
		if(alerta.actualizar) {
			let res = obtenerLocationStorage()
			setListaUser(res)
		}
		// eslint-disable-next-line
	},[alerta])
	
	const eliminar = (idUser) => {
		let isDelete = window.confirm("Eliminar al usuario")
		if( isDelete ) {

			let getLista = obtenerLocationStorage()
    	getLista.forEach((item,index) => {
       	if(item.id === idUser){
            getLista.splice(index,1)
       	}
    	})
			localStorage.setItem('listUser',JSON.stringify(getLista))
			setAlerta({...alerta, exito: true})
			setTimeout(()=>{
				setAlerta({...alerta, exito: false})
			},2500)
		}
	}

	return (
		<div id="users">
			<h2>Lista de usuarios</h2>
			<div className="right">
				<Link to="/add" className="btn">Nuevo user</Link>
			</div>
			{(alerta.exito) && <div className="alerta alerta-success">usuario eliminado</div>}
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Apellidos</th>
						<th>Cargo</th>
						<th>Edad</th>
						<th>Aciones</th>
					</tr>
				</thead>
				<tbody>
					{listaUser.map(user => (
						<tr key={user.id}>
							<td>{ user.name }</td>
							<td>{ user.lastname }</td>
							<td>{ user.position }</td>
							<td>{ user.age }</td>
							<td>
								<Link to={`/edit/${user.id}`}>
									<img src={iconedit} alt="editar"/>
								</Link>
								<span onClick={()=>eliminar(user.id)} >
									<img src={icondelete} alt="eliminar"/>
								</span>
								
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users
