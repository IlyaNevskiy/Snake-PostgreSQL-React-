import { useEffect, useState } from "react"
import "../css/highScoreList.css"

function HighScoreList() {
    const [ highScoreList, setHighScoreList ] = useState<Array<object>>([]) 

    useEffect( () => {
        createHighScoreList()
    }, [] )

	async function createHighScoreList(){
		let allScore: Array<object>
		let length
		let sortingList = new Array()
		await fetch('http://localhost:5000/api/score').then(function (response){
			response.json().then(async function(data){
			allScore=data
			allScore.sort((a,b)=> {return Object(b).count - Object(a).count})
			if(allScore.length < 10){
				length=allScore.length
			}
			else length = 10
			for(let i=0; i<=length; i++){
			// eslint-disable-next-line no-loop-func
				await fetch(`http://localhost:5000/api/user/${Object(allScore[i]).user_id}`).then ( function (response) {
				response.json().then(function (data) {
				sortingList.push( { name: data.name, count: Object(allScore[i]).count } )
					})
				})
			}
            setHighScoreList(sortingList)
			})
		    })
	}


    return (
        <div className="container">
            <h2 className="heading">ТОП-10</h2>
            <ul className="highScoreList">
                {highScoreList.map((listItem) => {
                return (
                    <li key={Object(listItem).count+Object(listItem).name} className = 'highScoreItem'>
                        <div>{Object(listItem).name}</div>
                        <div>{Object(listItem).count}</div>
                    </li>
                    ) 
                })}

                
            </ul>
        </div>
    )
}

export default HighScoreList