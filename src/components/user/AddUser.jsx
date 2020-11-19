import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../assets/styles/users.scss'


const AddUser = () => {

	let data = []
	const [listaUser,setListaUser] = useState([])
	const [dataForm, setDataForm] = useState({
		"name":'',
		"lastname": '',
		"position": '',
		"age": ''
	})
	const [actualizar, setActualizar] = useState(true)
	const [exito, setExito] = useState(false)

	const obtenerLocationStorage = () => {
		let dataL	

		if(localStorage.getItem('listUser') === null){
    	dataL = JSON.parse(localStorage.setItem('listUser',JSON.stringify(data)))
		}else{
  		dataL = JSON.parse(localStorage.getItem('listUser'))
		}

		return dataL
	}

	useEffect(()=>{
		if(actualizar) {
			let res = obtenerLocationStorage()
			setListaUser(res)
			setActualizar(false)
		}
	},[actualizar])

	const saveDataUser = () => {
		let users

  	users = obtenerLocationStorage()
    users.push(dataForm)

    localStorage.setItem('listUser',JSON.stringify(users))
		setActualizar(true)
		setExito(true)
		setTimeout(()=> {
			setExito(false)
		} , 2000)
	}

	const obtenerIdLast = () => {
		let idLast = 0

		listaUser.forEach(item => {
				idLast = ( item.id > idLast ) ? item.id : idLast 
		})

		return idLast
	}

	const newUser = (e) => {
		e.preventDefault();
		//console.log("registar datos")
		let id = obtenerIdLast() + 1
		dataForm.id = id

		saveDataUser()

		//reniciar
		setDataForm({
			"name":'',
			"lastname": '',
			"position": '',
			"age": ''
		})
	}
	
	const handleChange = (e) => {
		setDataForm({
			...dataForm,
			[e.target.name]: e.target.value,
		})
	}
	

	return (
		<div id="adduser">
			<h2>Nuevo usuario</h2>
			<div className="right"> <Link to="/" className="btn">Atras</Link> </div>
			{(exito) && <div className="alerta alerta-success">Usuario creado</div> }
			<div className="container">
				<form onSubmit={newUser}>
					<div>
						<label>Nombre:</label>
						<input type="text" value={dataForm.name} onChange={handleChange} name="name" required />
					</div>
					<div>
						<label>Apellidos:</label>
						<input type="text" value={dataForm.lastname} name="lastname" onChange={handleChange} required />
					</div>
					<div>
						<label>Cargo:</label>
						<input type="text" value={dataForm.position} name="position" onChange={handleChange} required />
					</div>
					<div>
						<label>Edad:</label>
						<input type="number" value={dataForm.age} onChange={handleChange} name="age" required />
					</div>
					<input type="submit" value="Agregar" />
				</form>
			</div>
		</div>
	)
}

export default AddUser
