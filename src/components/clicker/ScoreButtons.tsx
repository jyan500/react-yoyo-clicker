import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setPositiveClicks, setNegativeClicks } from "../../reducers/clicker" 
import { styles, buttonTheme } from "../../assets/styles" 

export const ScoreButtons = () => {
	const dispatch = useAppDispatch()
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	return (
		<div className = "flex flex-row mb-6 justify-center items-center">
			<button className = {defaultButton} onClick={() => {
				dispatch(setPositiveClicks(0))
				dispatch(setNegativeClicks(0))
			}}>Reset</button>
		{/*	<button className = {defaultButton} onClick = {() => setShowInputtedScores(!showInputtedScores)}>{showInputtedScores ? "Hide": "View"} Scores</button>
			<button className = {defaultButton} onClick = {() => downloadExcel()}>Download Scores</button>*/}
		</div>
	)	
}