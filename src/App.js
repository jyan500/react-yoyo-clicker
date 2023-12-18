import React, {useState} from 'react';
import { useKeyDown } from "./hooks/useKeyDown"
import './App.css';
import {v4 as uuidv4} from "uuid"

const App = () => {
	const [positiveClicks, setPositiveClicks] = useState(0)	
	const [negativeClicks, setNegativeClicks] = useState(0)
	const [isClickerDisabled, setIsClickerDisabled] = useState(false)
	const [showInputtedScores, setShowInputtedScores] = useState(false)
	const [form, setForm] = useState({
		id: "",
		judgeName: "", 
		playerName: "", 
		contestName: "", 
		positiveClicks: 0, 
		negativeClicks: 0
	})
	const [savedScores, setSavedScores] = useState([])

	const onPositiveClick = () => {
		setPositiveClicks(() => positiveClicks + 1)	
	}
	const onNegativeClick = () => {
		setNegativeClicks(() => negativeClicks + 1)
	}
	const deleteScore = (id) => {
		setSavedScores(savedScores.filter(score => score.id !== id))
	}

	useKeyDown(() => {
		onPositiveClick()
	}, ["f"], isClickerDisabled)

	useKeyDown(() => {
		onNegativeClick()
	}, ["d"], isClickerDisabled)

	return (
		<div className="flex flex-col justify-center items-center p-4">
			<div className = "text-center p-2">
			    <h1>Yoyo Clicker</h1>
				<p>Press "F" for positive clicks, "D" for negative clicks. Click the "Reset" button to reset the scores, and "Input Score" to save the competitor name, freestyle and your scores. </p>
			</div>
			<div className = "flex flex-row p-2">
				<div className = "flex flex-col justify-center items-center p-2">
					<h1>Positive Clicks</h1>	
					<div>+{positiveClicks}</div>
				</div>
				<div className = "flex flex-col justify-center items-center p-2">
					<h1>Negative Clicks</h1>
					<div>-{negativeClicks}</div>
				</div>
			</div>
			<div className = "flex flex-row p-2 justify-center items-center">
				<button className = "p-2" onClick={() => {
					setPositiveClicks(0)
					setNegativeClicks(0)
				}}>Reset</button>
				<button onClick = {() => setIsClickerDisabled(true)} className = "p-2">Input Score</button>
				<button onClick = {() => setShowInputtedScores(!showInputtedScores)} className = "p-2">{showInputtedScores ? "Hide": "View"} Scores</button>
			</div>
			<div className = {`${isClickerDisabled ? "visible": "hidden"} flex flex-col p-2 justify-center items-center`}>
				<div className = "flex flex-row justify-center items-center">
					<label className = "w-1/2">Judge Name</label>
					<input value = {form.judgeName} onChange = {(e) => setForm({...form, judgeName: e.target.value})} className = "w-1/2 border" type = "text" name = "judgeName"/>
				</div>
				<div className = "flex flex-row justify-center items-center">
					<label className = "w-1/2">Contest Name</label>
					<input value = {form.contestName} onChange = {(e) => setForm({...form, contestName: e.target.value})} className = "w-1/2 border" type = "text" name = "contestName"/>	
				</div>
				<div className = "flex flex-row justify-center items-center">
					<label className = "w-1/2">Player Name</label>
					<input value = {form.playerName} onChange = {(e) => setForm({...form, playerName: e.target.value})} className = "w-1/2 border" type = "text" name = "playerName"/>	
				</div>
				<div className = "flex flex-row justify-center items-center">
					<label className = "w-1/2">Positive Clicks</label>
					<input value = {form.positiveClicks} onChange = {(e) => setForm({...form, positiveClicks: e.target.value})} className = "w-1/2 border" type = "number" name = "positiveClicks"/>
				</div>
				<div className = "flex flex-row justify-center items-center">
					<label className = "w-1/2">Negative Clicks</label>
					<input value = {form.negativeClicks} onChange = {(e) => setForm({...form, negativeClicks: e.target.value})} className = "w-1/2 border" type = "number" name = "negativeClicks"/>
				</div>
				<div className = "flex flex-row justify-center items-center">
					<button onClick = {() => {
						setIsClickerDisabled(false)
						// set unique ID for the form when saving
						setForm({...form, id: uuidv4()})
						// if the user accidentally inputs a "negative" sign in the negative clicks
						// section, parse it out
						if (form.negativeClicks.toString().includes("-")){
							setForm({...form, negativeClicks: parseInt(form.negativeClicks.toString().replace("-", ""))})
						}
						setSavedScores([...savedScores, form])
					}} className = "p-2">Save</button>
					<button onClick = {() => setIsClickerDisabled(false)}  className = "p-2">Cancel</button>
				</div>
			</div>
			<div className = {`${showInputtedScores ? "visible" : "hidden"} flex flex-col p-2`}>
				<div className = "flex flex-row">
					{["Judge", "Contest", "Player", "Positive Clicks", "Negative Clicks", ""].map((text) => {
						return (<div className = "w-1/6">{text}</div>)
					})}
				</div>
				{
					savedScores.map(score => {
						return (
							<div key = {score.id} className = "flex flex-row">
								{["judgeName", "contestName", "playerName", "positiveClicks", "negativeClicks"].map((key) => {
									let t = score[key]
									if (key === "positiveClicks" || key === "negativeClicks"){
										t = `${key === "positiveClicks" ? "+" : "-"}${score[key]}`
									}
									return (
										<div className = "w-1/6">{
											t
										}</div>							
									)	
								})}
								<div><button onClick = {() => deleteScore(score.id)}>Delete Score</button></div>							
							</div>
						)
					})
				}
			</div>
		</div>
	);
}

export default App;
