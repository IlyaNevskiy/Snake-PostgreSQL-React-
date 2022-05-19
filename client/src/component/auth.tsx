import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Auth() {
    const [ userName, setUserName ] = useState('')
    const navigate = useNavigate();

	async function setUser(){
		let allUser:Array<object>
		fetch('http://localhost:5000/api/user').then(async function(response){
    	response.json().then(async function(data) {
        allUser=data
		const user=allUser.find(element => Object(element).name === userName)
		if(user){
			localStorage.setItem("userId", Object(user).id)
		}
		else{
			fetch('http://localhost:5000/api/user', { method: 'POST', body: JSON.stringify({ name: userName }), headers: {
				'content-type': 'application/json;charset=UTF-8',
			  }, }).then(function (response){
				  response.json().then(function(data){
					localStorage.setItem("userId", Object(user).id)
				  })
			  })
		}
        navigate('/game')
   		 });
		}).catch(function(error) {
   		 console.log('Fetch Error:', error);
		});	
	}

    const changeHandler = (event:any) => {
        setUserName(event.target.value)
    }
    
    return (
        <div>
            <h1>Введите имя пользователя</h1>
            <input type="text" onChange={changeHandler} value={userName}/>
            <button onClick={setUser}>Далее</button>
        </div>
    )
}

export default Auth