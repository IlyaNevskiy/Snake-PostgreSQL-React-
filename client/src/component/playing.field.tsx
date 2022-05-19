import React, { useEffect, useRef, useState } from "react"
import ApplePurple from "../image/applePurple.png"
import AppleRed from "../image/appleRed.png"
import AppleGreen from "../image/appleGreen.png"
import useInterval from "../hooks/useInterval"
import "../css/playing,field.css"

const canvasX = 1000
const canvasY = 1000
const initialSnake = [ [ 2, 10 ], [ 2, 10 ] ]
const initialApple = [ 14, 11 ]
const scale = 40
const timeDelay = 100
const appleImg= [ AppleGreen, AppleRed, ApplePurple ]


function PlayingField() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const userId = localStorage.getItem('userId')
	const [ snake, setSnake ] = useState(initialSnake)
	const [ apple, setApple ] = useState(initialApple)
	const [ direction, setDirection ] = useState([ 0, -1 ])
	const [ delay, setDelay ] = useState<number | null>(null)
	const [ gameOver, setGameOver ] = useState(false)
	const [ score, setScore ] = useState(0)
	const [ pause, setPause ] =  useState(false)
	const [ appleVar, setAppleVar ] = useState(0)

 	useInterval(() => runGame(), delay, pause)

	useEffect(
		() => {
			let fruit = document.getElementById("fruit") as HTMLCanvasElement
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					ctx.fillStyle = "#a3d001"
					snake.forEach(([ x, y ]) => ctx.fillRect(x, y, 1, 1))
					ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
				}
			}
		},
		[ snake, apple, gameOver ]
    )

	useEffect(()=>{
		if(gameOver){
			sendScore()
		}
	},[gameOver])

	async function sendScore(){
		fetch('http://localhost:5000/api/score', { method: 'POST', body: JSON.stringify({ count: score, userId: userId }), headers: {
				'content-type': 'application/json;charset=UTF-8',
			  }, })
	}

	function play() {
		setSnake(initialSnake)
		setApple(initialApple)
		setDirection([ 1, 0 ])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
	}

	function checkCollision(head: number[]) {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function randomInteger(min: number, max: number) {
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	  }

	function appleAte(newSnake: number[][]) {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale))
		if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
			let newApple = coord
			if (appleVar===0){
				setScore(prevState => prevState + 1 )
			}
			else if (appleVar===1){
				setScore(prevState => prevState + 5 )
			}
			else if (appleVar===2){
				setScore(prevState => prevState + 10 )
			}	
			setAppleVar(randomInteger(0 , 2))
			setApple(newApple)
			return true
		}
		return false
	}

	function runGame() {
		const newSnake = [ ...snake ]
		const newSnakeHead = [ newSnake[0][0] + direction[0], newSnake[0][1] + direction[1] ]
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			setDelay(null)
			setGameOver(true)
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
		switch (e.key) {
			case "ArrowLeft":
				if(direction[0]!==1 && direction[1]!==0)
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				if(direction[0]!==0 && direction[1]!==1)
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				if(direction[0]!==-1 && direction[1]!==0)
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				if(direction[0]!==0 && direction[1]!==-1)
				setDirection([ 0, 1 ])
				break
			case 'p':
				setPause(prevState => !prevState)
				break;
		}
	}

    return (
        <div onKeyDown={(e) => changeDirection(e)} style={{ display: 'flex' }}>
            <img className="appleImage" id="fruit" src={appleImg[appleVar]} alt="fruit" />
            <div className="playAreaContainer">
                <canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
                {gameOver && <div>Game Over</div>}
                <button onClick={play} className="playButton">
                    Play
                </button>
                {pause && <div>PAUSE</div>}
            </div>
 			<div className="scoreBox">
 				Score: {score}
            </div>
        </div>
    )
}

export default PlayingField