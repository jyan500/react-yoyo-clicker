import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks" 
import { setIsClickerDisabled, setScores, setScoreForm } from "../../reducers/clicker" 
import { styles, buttonTheme } from "../../assets/styles" 
import { ScoreForm as ScoreFormType } from "../../types/common" 
import { AutoDisabledInput as Input } from "../shared/AutoDisabledInput" 
import {v4 as uuidv4} from "uuid"
export const ScoreForm = () => {
	const dispatch = useAppDispatch()
	const {scores: savedScores, scoreForm: form} = useAppSelector((state) => state.clicker)	
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	const defaultForm = {
		id: "",
		judgeName: "", 
		playerName: "", 
		contestName: "", 
		positiveClicks: 0, 
		negativeClicks: 0
	}
	const [formErrors, setFormErrors] = useState({
		judgeName: {"text": "Judge's Name is required", "show": false},
		playerName: {"text": "Player's Name is required", "show": false},
		contestName: {"text": "Contest Name is required", "show": false}
	})
	const validateForm = () => {
		let valid = true
		let keys = Object.keys(formErrors)
		Object.keys(form).forEach((key) => {
			// show the errors specifically for Judge Name, Player Name and Contest Name
			if (keys.includes(key) && form[key as keyof typeof form] === ""){
				setFormErrors((errors) => {
					return {...errors, [key]: {...errors[key as keyof typeof formErrors], show: true}}
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
			tempForm = {...tempForm, negativeClicks: parseInt(parsed)}
		}
		// TODO: parse out leading zeroes
		dispatch(setScoreForm(tempForm))
		isEditing ? dispatch(setScores(savedScores.map((score) => score.id === tempForm.id ? tempForm : score))) : dispatch(setScores([...savedScores, tempForm]))
	}
	return (
		<div className = "flex flex-col p-4">
			{
				[
					{key: "judgeName", text: "Judge Name"}, 
					{key: "contestName", text: "Contest Name"}, 
					{key: "playerName", text: "Player Name"},
					{key: "positiveClicks", text: "Positive Clicks"},
					{key: "negativeClicks", text: "Negative Clicks"},
				].map(t => {
					const formVal = form[t.key as keyof typeof form]
					const formErrorVal = formErrors[t.key as keyof typeof formErrors]
					return (
						<div className="md:flex md:items-center mb-4">
						    <div className="md:w-1/3">
						      <label className={`${styles.label} text-right mr-4`}>
						      {t.text}
						      </label>
						    </div>
						    <div className="md:w-2/3">
						      <Input className={styles.textInput}
							    id="inline-full-name" 
							    onChange={(e) => dispatch(setScoreForm({...form, [t.key]: e.target.value}))}
							    type={t.key === "positiveClicks" || t.key === "negativeClicks" ? "number" : "text"} 
							    value={formVal}
							  />
							  <span className = {`${formErrorVal?.show ? "visible": "hidden"} font-bold text-red-500`}>{formErrorVal?.text}</span>
						    </div>
					    </div>
					)	
				})
			}
			<div className = "flex flex-row justify-center items-center">
				<button onClick = {submitForm} className = {defaultButton}>Save</button>
				<button onClick = {() => {
					dispatch(setScoreForm(defaultForm))
				}}  className = {defaultButton}>Clear</button>
			</div>
		</div>
	)	
}