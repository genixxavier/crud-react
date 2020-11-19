import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/styles/users.scss'


const EditUser = (props) => {
	
	const idUser = parseInt(props.match.params.id)
	const [user, setUser] = useState([])
	const [alerta, setAlerta] = useState({
		error: false,
		exito: false,
	})
	
	const getDataUser = () => {
		if (isNaN(idUser)) {
    	return 0;
  	}

  	let lista = JSON.parse(localStorage.getItem('listUser'))
		let getUser =  lista.filter(item => ( item.id === idUser))

		if(getUser.length === 0) {
			return 0
		}
		
		return getUser[0]
	}

	const obtenerLocationStorage = () => {
		let dataL = JSON.parse(localStorage.getItem('listUser'))

		return dataL
	}

	useEffect(()=>{
			let res = getDataUser()
			if(res === 0) {
				setAlerta({
					...alerta,
					error : true
				})
			} else {
				setUser(res)
			}
	},[])

	const saveDataUser = () => {
  	let users = obtenerLocationStorage()

		users.forEach((item,index) => {
       if(item.id === idUser){
				 	item.name = user.name
				 	item.lastname = user.lastname
				 	item.position = user.position
				 	item.age = user.age
       }
    });

    localStorage.setItem('listUser',JSON.stringify(users))
		setAlerta({ ...alerta, exito: true })
		setTimeout(()=> {
			setAlerta({ ...alerta, exito: false })
		}, 1500)
	}

	const updateUser = (e) => {
		e.preventDefault();
		saveDataUser()
	}
	
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		})
	}
	

	return (
		<div id="adduser">
			<h2>Editar usuario</h2>
			<div className="right"><Link to="/" className="btn">Atras</Link></div>
			{ (alerta.error) && <div className="alerta alerta-danger">No se encuentro usuario a editar</div> }
			{ (alerta.exito) && <div className="alerta alerta-success">Datos actualizados</div> }
			{user.id > 0 &&
			<div className="container">
				<form onSubmit={updateUser}>
					<div>
						<label>Nombre:</label>
						<input type="text" value={user.name} onChange={handleChange} name="name" required />
					</div>
					<div>
						<label>Apellidos:</label>
						<input type="text" value={user.lastname} name="lastname" onChange={handleChange} required />
					</div>
					<div>
						<label>Cargo:</label>
						<input type="text" value={user.position} name="position" onChange={handleChange} required />
					</div>
					<div>
						<label>Edad:</label>
						<input type="number" value={user.age} onChange={handleChange} name="age" required />
					</div>
					<input type="submit" value="Actualizar" />
				</form>
			</div>}
		</div>
	)
}

export default EditUser
