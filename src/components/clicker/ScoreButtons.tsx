import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setIsClickerDisabled, setPositiveClicks, setNegativeClicks } from "../../reducers/clicker" 
import { styles, buttonTheme } from "../../assets/styles" 

export const ScoreButtons = () => {
	const dispatch = useAppDispatch()
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	const isClickerDisabled = useAppSelector((state) => state.clicker.isClickerDisabled)
	return (
		<div className = "flex flex-row mb-6 justify-center items-center">
			<button className = {defaultButton} onClick = {() => {
				if (isClickerDisabled){
					dispatch(setIsClickerDisabled(false))
				}
				else {
					dispatch(setIsClickerDisabled(true))
				}
			}}>{!isClickerDisabled ? "End" : "Start"}</button>
			<button className = {defaultButton} onClick={() => {
				dispatch(setPositiveClicks(0))
				dispatch(setNegativeClicks(0))
			}}>Reset
			</button>
			{/*<button className = {defaultButton} onClick = {() => downloadExcel()}>Download Scores</button>*/}
		</div>
	)	
}