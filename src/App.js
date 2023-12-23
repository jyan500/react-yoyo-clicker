import React, {useState} from 'react';
import { useKeyDown } from "./hooks/useKeyDown"
import './App.css';
import {v4 as uuidv4} from "uuid"
import { buttonTheme, styles } from "./styles"
import { YoutubeEmbed } from "./components/YoutubeEmbed" 

const App = () => {
	const [positiveClicks, setPositiveClicks] = useState(0)	
	const [negativeClicks, setNegativeClicks] = useState(0)
	const [isClickerDisabled, setIsClickerDisabled] = useState(false)
	const [showInputtedScores, setShowInputtedScores] = useState(false)
	const [ytVidLink, setYtVidLink] = useState("")
	const [ytVidId, setYtVidId] = useState(null)
	const [form, setForm] = useState({
		id: "",
		judgeName: "", 
		playerName: "", 
		contestName: "", 
		positiveClicks: 0, 
		negativeClicks: 0
	})
	const [savedScores, setSavedScores] = useState([])

	const defaultButton = `${buttonTheme("blue")} ${styles.button}`

	const onPositiveClick = () => {
		setPositiveClicks(() => positiveClicks + 1)	
	}
	const onNegativeClick = () => {
		setNegativeClicks(() => negativeClicks + 1)
	}
	const deleteScore = (id) => {
		setSavedScores(savedScores.filter(score => score.id !== id))
	}
	const parseVidLink = () => {
		const ytUrl = new URL(ytVidLink)
		if (ytUrl){
			const queryParams = new URLSearchParams(ytUrl.search)
			const vidId = queryParams.get("v")
			if (vidId){
				setYtVidId(vidId)
			}
		}
	}

	useKeyDown(() => {
		onPositiveClick()
	}, ["f"], isClickerDisabled)

	useKeyDown(() => {
		onNegativeClick()
	}, ["d"], isClickerDisabled)

	return (
		<div className="flex flex-col justify-center items-center p-4">
			<div className = "p-2 mb-6">
			    <h1 className = "font-bold text-6xl">Yoyo Clicker</h1>
			</div>
			<div className = "p-2">
				<label className = {styles.verticalLabel + " mb-4"}>Please paste youtube link for the freestyle below.</label>
				<input value = {ytVidLink} onChange = {(e) => setYtVidLink(e.target.value)} className = {styles.textInput + " mb-4 w-full"}/>
				<button onClick = {parseVidLink} className = {defaultButton}>Submit</button>
				<button className = {defaultButton} onClick = {() => setYtVidLink("")}>Clear</button>
			</div>
			{
				ytVidId ? ( 
				<div className = "p-2">
					<YoutubeEmbed embedId={ytVidId}></YoutubeEmbed>
				</div>): null
			}
			<div className = "text-center p-2 border">
				<p className = {styles.label}>Press "F" for positive clicks, "D" for negative clicks. Click the "Reset" button to reset the scores, and "Input Score" to save the competitor name, freestyle and your scores. Note that the clickers are disabled while inputting scores.</p>
			</div>
			<div className = "flex flex-row p-2">
				<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
					<h1>Positive Clicks</h1>	
					<div><span className = "text-xl">+{positiveClicks}</span></div>
				</div>
				<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
					<h1>Negative Clicks</h1>
					<div><span className = "text-xl">-{negativeClicks}</span></div>
				</div>
			</div>
			<div className = "flex flex-row p-2 justify-center items-center">
				<button className = {defaultButton} onClick={() => {
					setPositiveClicks(0)
					setNegativeClicks(0)
				}}>Reset</button>
				<button className = {defaultButton} onClick = {() => setIsClickerDisabled(true)}>Input Score</button>
				<button className = {defaultButton} onClick = {() => setShowInputtedScores(!showInputtedScores)}>{showInputtedScores ? "Hide": "View"} Scores</button>
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
							<div className="md:flex md:items-center mb-4">
							    <div className="md:w-1/3">
							      <label className={`${styles.label} text-right mr-4`}>
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
					}} className = {defaultButton}>Save</button>
					<button onClick = {() => setIsClickerDisabled(false)}  className = {defaultButton}>Cancel</button>
				</div>
			</div>
			<table className={`${showInputtedScores ? "visible": "hidden"} table-auto border-collapse border border-slate-500`}>
			  <thead>
			    <tr>
			    	{["Judge", "Contest", "Player", "Positive Clicks", "Negative Clicks", ""].map((text) => {
						return (<th className = "border border-slate-600 p-2">{text}</th>)
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
										<td className = "border border-slate-700 p-2">
											<span className = {`${styles.label} text-center`}>{t}</span>
										</td>							
									)	
								})}
								<td><button className = {defaultButton} onClick = {() => deleteScore(score.id)}>Delete Score</button></td>							
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
