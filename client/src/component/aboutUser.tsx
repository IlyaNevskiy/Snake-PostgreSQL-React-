import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AboutUser(){
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const [username, setUsername] = useState('')

    useEffect(()=>{
         fetch(`http://localhost:5000/api/user/${userId}`).then ( function (response) {
			response.json().then(function (data) {
			setUsername(data.name)
					})
			})
    },[])

    function handleClick(){
        localStorage.removeItem('userId')
        navigate('/auth')
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center", marginBottom: "30px", padding: "0 200px 0 200px" }}>
            <h2>Ваш никнейм: {username}</h2>
            <button onClick={handleClick}>Сменить пользователя</button>
        </div>
    )
}

export default AboutUser