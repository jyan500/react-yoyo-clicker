import React, {useState} from 'react';
import { useKeyDown } from "./hooks/useKeyDown"
import './App.css';
import {v4 as uuidv4} from "uuid"
import { themes, styles } from "./styles"

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

	const purpleButton = `${themes.purple} ${styles.button}`

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
				<button className = {purpleButton} onClick={() => {
					setPositiveClicks(0)
					setNegativeClicks(0)
				}}>Reset</button>
				<button className = {purpleButton} onClick = {() => setIsClickerDisabled(true)}>Input Score</button>
				<button className = {purpleButton} onClick = {() => setShowInputtedScores(!showInputtedScores)}>{showInputtedScores ? "Hide": "View"} Scores</button>
			</div>
			<div className = {`${isClickerDisabled ? "visible": "hidden"} p-2 w-full max-w-sm`}>
				{
					[
						{key: "judgeName", text: "Judge Name"}, 
						{key: "contestName", text: "Contest Name"}, 
						{key: "playerName", text: "Player Name"},
						{key: "positiveClicks", text: "Positive Clicks"},
						{key: "negativeClicks", text: "Negative Clicks"},
					].map(t => {
						return (
							<div className="md:flex md:items-center mb-6">
							    <div className="md:w-1/3">
							      <label className={styles.label}>
							      {t.text}
							      </label>
							    </div>
							    <div className="md:w-2/3">
							      <input className={styles.textInput}
								    id="inline-full-name" 
								    onChange={(e) => setForm({...form, [t.key]: e.target.value})}
								    type={t.key === "positiveClicks" || t.key === "negativeClicks" ? "number" : "text"} 
								    value={form[t.key]}
								  />
							    </div>
						    </div>
						)	
					})
				}
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
					}} className = {purpleButton}>Save</button>
					<button onClick = {() => setIsClickerDisabled(false)}  className = {purpleButton}>Cancel</button>
				</div>
			</div>
		{/*	<div className = {`${showInputtedScores ? "visible" : "hidden"} flex flex-col w-full`}>
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
										<div className = {`${styles.label} w-1/6`}>
											{t}
										</div>							
									)	
								})}
								<div><button className = {purpleButton} onClick = {() => deleteScore(score.id)}>Delete Score</button></div>							
							</div>
						)
					})
				}
			</div>*/}
			<table className="table-auto border-collapse border border-slate-500">
			  <thead>
			    <tr>
			    	{["Judge", "Contest", "Player", "Positive Clicks", "Negative Clicks", ""].map((text) => {
						return (<th className = "border border-slate-600">{text}</th>)
					})}
			    </tr>
			  </thead>
			  <tbody>
			  	{
					savedScores.map(score => {
						return (
							<tr key = {score.id}>
								{["judgeName", "contestName", "playerName", "positiveClicks", "negativeClicks"].map((key) => {
									let t = score[key]
									if (key === "positiveClicks" || key === "negativeClicks"){
										t = `${key === "positiveClicks" ? "+" : "-"}${score[key]}`
									}
									return (
										<td className = "border border-slate-700">
											<span className = {styles.label}>{t}</span>
										</td>							
									)	
								})}
								<td><button className = {purpleButton} onClick = {() => deleteScore(score.id)}>Delete Score</button></td>							
							</tr>
						)
					})
				}
			  </tbody>
			</table>
		</div>
	);
}

export default App;
