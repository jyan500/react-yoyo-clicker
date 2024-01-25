import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setIsClickerDisabled, setPositiveClicks, setNegativeClicks } from "../../reducers/clicker" 
import { styles, buttonTheme } from "../../assets/styles" 

type Props = {
	downloadExcel: () => void
}
export const ScoreButtons = ({downloadExcel}: Props) => {
	const dispatch = useAppDispatch()
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	const isClickerDisabled = useAppSelector((state) => state.clicker.isClickerDisabled)
	return (
		<div className = "flex flex-row justify-center items-center">
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
			<button className = {defaultButton} onClick = {() => downloadExcel()}>Download Scores</button>
		</div>
	)	
}