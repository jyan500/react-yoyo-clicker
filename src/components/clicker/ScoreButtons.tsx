import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setIsClickerDisabled, setPositiveClicks, setNegativeClicks } from "../../reducers/clicker" 
import { styles, buttonTheme } from "../../assets/styles" 
import { useMediaQuery } from "react-responsive" 

type Props = {
	downloadExcel: () => void
	setClickType: (clickType: string) => void
}
export const ScoreButtons = ({downloadExcel, setClickType}: Props) => {
	const dispatch = useAppDispatch()
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	const alertButton = `${styles.button} ${buttonTheme("red")}`
	const {isClickerDisabled, positiveClicks, negativeClicks} = useAppSelector((state) => state.clicker)
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
	const onClick = (type: string) => {
		if (!isClickerDisabled){
			dispatch(type === "plusOne" ? setPositiveClicks(positiveClicks + 1) : setNegativeClicks(negativeClicks + 1))
			setClickType(type === "plusOne" ? "plusOne" : "minusOne")
		}
	}
	return (
		<div>
			{isTabletOrMobile ? (
			<div className = "flex flex-row justify-center items-center mb-12">
				<button onClick = {() => onClick("plusOne")} disabled={isClickerDisabled} className = {`flex-1 ${isClickerDisabled ? "disabled:opacity-70" : ""} ${defaultButton}`}>+1</button>
				<button onClick = {() => onClick("minusOne")} disabled={isClickerDisabled} className = {`flex-1 ${isClickerDisabled ? "disabled:opacity-70" : ""} ${alertButton}`}>-1</button>
			</div>
			) : null}
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
					setClickType("")
				}}>Reset
				</button>
				<button className = {defaultButton} onClick = {() => downloadExcel()}>Download Scores</button>
			</div>
		</div>
	)	
}