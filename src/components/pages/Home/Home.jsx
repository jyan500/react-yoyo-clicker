import React, {useEffect, useState} from 'react';
import { useKeyDown } from "../../../hooks/useKeyDown"
import {v4 as uuidv4} from "uuid"
import { buttonTheme, styles } from "../../../styles"
import { YoutubeEmbed } from "../../YoutubeEmbed/YoutubeEmbed.jsx" 
import { FadeInNumber } from "../../FadeInNumber/FadeInNumber.jsx" 
import {utils, writeFile} from "xlsx";

export const Home = () => {
	const [positiveClicks, setPositiveClicks] = useState(0)	
	const [negativeClicks, setNegativeClicks] = useState(0)
	const [isClickerDisabled, setIsClickerDisabled] = useState(false)
	const [showScoreForm, setShowScoreForm] = useState(false)
	const [showInputtedScores, setShowInputtedScores] = useState(true)
	const [showUrlError, setShowUrlError] = useState(false)
	const [showPlusOne, setShowPlusOne] = useState(false)
	const [showMinusOne, setShowMinusOne] = useState(false)
	const [showPlusTwo, setShowPlusTwo] = useState(false)
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
	const [formErrors, setFormErrors] = useState({
		judgeName: {"text": "Judge's Name is required", "show": false},
		playerName: {"text": "Player's Name is required", "show": false},
		contestName: {"text": "Contest Name is required", "show": false}
	})
	const widthDefault = 853
	const heightDefault = 480
	const [savedScores, setSavedScores] = useState([])

	const defaultButton = `${buttonTheme("blue")} ${styles.button}`
	const alertButton = `${buttonTheme("red")} ${styles.button}`

	useEffect(() => {
	    const savedScores = JSON.parse(localStorage.getItem("savedScores"));
	    if (savedScores?.length) {
			setSavedScores(savedScores);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("savedScores", JSON.stringify(savedScores));
	}, [savedScores]);

	const showAndHidePlusOne = () => {
		setShowPlusOne(true)
		const timeoutId = setTimeout(() => {
	    	setShowPlusOne(false);
	    }, 375)
	    return () => clearTimeout(timeoutId)
	}

	const showAndHidePlusTwo = () => {
		setShowPlusTwo(true)
		const timeoutId = setTimeout(() => {
			setShowPlusTwo(false)	
		}, 375)
		return () => clearTimeout(timeoutId)

	}

	const showAndHideMinusOne = () => {
		setShowMinusOne(true)
		const timeoutId = setTimeout(() => {
	    	setShowMinusOne(false);
	    }, 375)
	    return () => clearTimeout(timeoutId)
	}

	const onPositiveClick = () => {
		setPositiveClicks(() => positiveClicks + 1)	
	}
	const onNegativeClick = () => {
		setNegativeClicks(() => negativeClicks + 1)
	}
	const onDoubleClick = () => {
		setPositiveClicks(() => positiveClicks + 2)	
	}
	const deleteScore = (id) => {
		setSavedScores(savedScores.filter(score => score.id !== id))
	}
	const editScore = (id) => {
		const f = savedScores.find((score) => score.id === id)
		setShowScoreForm(true)	
		setForm(f)
	}
	const validateForm = () => {
		let valid = true
		let keys = Object.keys(formErrors)
		Object.keys(form).forEach((key) => {
			// show the errors specifically for Judge Name, Player Name and Contest Name
			if (keys.includes(key) && form[key] === ""){
				setFormErrors((errors) => {
					return {...errors, [key]: {...errors[key], show: true}}
				})
				valid = false
			}
		})
		return valid
	}
	const submitForm = () => {
		if (!validateForm()){
			return	
		}
		setIsClickerDisabled(false)
		setShowScoreForm(false)
		// set unique ID for the form when saving
		// if the form already has an id, update the existing form instead of creating a new entry
		let isEditing = form.id !== ""
		let tempForm = {...form}
		if (!isEditing) {
			tempForm = {...tempForm, id: uuidv4()}
		}
		// if the user accidentally inputs a "negative" sign in the negative clicks
		// section, parse it out
		if (form.negativeClicks.toString().includes("-")){
			const parsed = tempForm.negativeClicks.toString().replace("-", "")
			tempForm = {...tempForm, negativeClicks: parsed}
		}
		// TODO: parse out leading zeroes
		setForm(tempForm)
		isEditing ? setSavedScores(savedScores.map((score) => score.id === tempForm.id ? tempForm : score)) : setSavedScores([...savedScores, tempForm])
	}
	const parseVidLink = () => {
		setShowUrlError(false)
		try  {
			const ytUrl = new URL(ytVidLink)
			if (ytUrl){
				const queryParams = new URLSearchParams(ytUrl.search)
				const vidId = queryParams.get("v")
				if (vidId){
					setYtVidId(vidId)
				}
			}
		}
		catch {
			setShowUrlError(true)
		}
	}
	const downloadExcel = () => {
		const colWidth = [...Array(5)].map((_, i) => {
			return {width: 30}
		});
		const data = savedScores.map((score) => {
			return {
				"Judge": score.judgeName, 
				"Contest": score.contestName, 
				"Player": score.playerName, 
				"Positive Clicks": `+${score.positiveClicks.toString()}`, 
				"Negative Clicks": `-${score.negativeClicks.toString()}`, 
			}		
		})
		const worksheet = utils.json_to_sheet(data)	
		worksheet["!cols"] = colWidth
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheet, "Sheet1")
		writeFile(workbook, "score-sheet.xlsx")
	}

	useKeyDown(() => {
		onPositiveClick()
		showAndHidePlusOne()
	}, ["f"], isClickerDisabled)

	useKeyDown(() => {
		onNegativeClick()
		showAndHideMinusOne()
	}, ["d"], isClickerDisabled)

	useKeyDown(() => {
		onDoubleClick()	
		showAndHidePlusTwo()
	}, ["g"], isClickerDisabled)

	return (
		<div className="flex flex-col justify-center items-center h-full">
			<div className = "p-2 mb-6">
			    <h1 className = "font-bold text-6xl">Yoyo Clicker</h1>
			</div>
			<div className = "mb-6">
				<label className = {styles.verticalLabel}>Please paste youtube link for the freestyle below.</label>
				<label className = "text-xs">** Currently, Youtube Shorts are <b>not</b> supported.</label>
				<input value = {ytVidLink} onFocus = {(e) => {setIsClickerDisabled(true)}} onBlur = {(e) => {setIsClickerDisabled(false)}} onChange = {(e) => setYtVidLink(e.target.value)} className = {styles.textInput + " mb-4 w-full"}/>
				<button onClick = {parseVidLink} className = {defaultButton}>Submit</button>
				<button className = {defaultButton} onClick = {() => {
					setYtVidLink("") 
					setYtVidId(null)
				}}>Clear</button>
				<p className = {`${styles.label} ${showUrlError ? "visible": "hidden"}`}>Please type in valid youtube URL</p>
			</div>
			{
				ytVidId ? ( 
				<>
					<YoutubeEmbed embedId={ytVidId}></YoutubeEmbed>
				</>): null
			}
			<div className = "flex flex-row justify-center items-center">
				<FadeInNumber showNum={showMinusOne} color = "red" text={"-1"}/>
				<FadeInNumber showNum={showPlusOne} color = "lime" text={"+1"}/>
				<FadeInNumber showNum={showPlusTwo} color = "sky" text={"+2"}/>
			</div>
			<div className = "text-center mt-6 p-2 border">
				<p className = {styles.label}>Press "F" for +1 click, "G" for +2 clicks, and "D" for -1 click </p>
				<p>Click the "Reset" button to reset the scores, "Input Score" to save the competitor name, freestyle and your scores, and "View Score" to view your inputted scores.</p>
				<p>Note that the clickers are disabled while inputting scores.</p>
			</div>

			<div className = "flex flex-row">
				<div>
					<div className = "flex flex-row p-2">
						<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
							<h1 className = "text-xl">Positive Clicks</h1>	
							<div><span className = "text-xl">+{positiveClicks}</span></div>
						</div>
						<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
							<h1 className = "text-xl">Negative Clicks</h1>
							<div><span className = "text-xl">-{negativeClicks}</span></div>
						</div>
					</div>
					<div className = "flex flex-row mb-6 justify-center items-center">
						<button className = {defaultButton} onClick={() => {
							setPositiveClicks(0)
							setNegativeClicks(0)
						}}>Reset</button>
						<button className = {defaultButton} onClick = {() => {
							setIsClickerDisabled(true)
							setShowScoreForm(true)
							setForm({id: "", judgeName: "", playerName: "", contestName: "", positiveClicks: 0, negativeClicks: 0})
						}}>Input Score</button>
						<button className = {defaultButton} onClick = {() => setShowInputtedScores(!showInputtedScores)}>{showInputtedScores ? "Hide": "View"} Scores</button>
						<button className = {defaultButton} onClick = {() => downloadExcel()}>Download Scores</button>
					</div>
				</div>
				<div className = {`${showScoreForm ? "visible": "invisible"} p-2 w-full max-w-sm`}>
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
									  <span className = {`${formErrors[t.key]?.show ? "visible": "hidden"} font-bold text-red-500`}>{formErrors[t.key]?.text}</span>
								    </div>
							    </div>
							)	
						})
					}
					<div className = "flex flex-row justify-center items-center">
						<button onClick = {submitForm} className = {defaultButton}>Save</button>
						<button onClick = {() => {
							setIsClickerDisabled(false) 
							setShowScoreForm(false)
						}}  className = {defaultButton}>Cancel</button>
					</div>
				</div>
			</div>
			<table className={`${showInputtedScores ? "visible": "invisible"} table-auto w-full`}>
			  <thead className = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			    <tr>
			    	{["Judge", "Contest", "Player", "Positive Clicks", "Negative Clicks", "", ""].map((text) => {
						return (<th className = "p-2">{text}</th>)
					})}
			    </tr>
			  </thead>
			  <tbody>
			  	{
					savedScores.map(score => {
						return (
							<tr className = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key = {score.id}>
								{["judgeName", "contestName", "playerName", "positiveClicks", "negativeClicks"].map((key) => {
									let t = score[key]
									if (key === "positiveClicks" || key === "negativeClicks"){
										t = `${key === "positiveClicks" ? "+" : "-"}${score[key]}`
									}
									return (
										<td className = "p-2">
											<span className = "text-center">{t}</span>
										</td>							
									)	
								})}
								<td><button className = {defaultButton} onClick = {() => editScore(score.id)}>Edit Score</button></td>							
								<td><button className = {alertButton} onClick = {() => deleteScore(score.id)}>Delete Score</button></td>							
							</tr>
						)
					})
				}
			  </tbody>
			</table>
		</div>
	);
}
