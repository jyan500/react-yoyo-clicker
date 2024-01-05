import React from "react"
import { styles } from "../../../assets/styles" 
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks" 
import { setNumberMode, setBorderMode } from "../../../reducers/clickerConfig" 

export const Home = () => {
	const borderMode = useAppSelector((state) => state.clickerConfig.borderMode)
	const numberMode = useAppSelector((state) => state.clickerConfig.numberMode)
	const dispatch = useAppDispatch()
	return (
		<div className = "flex flex-col justify-center items-center h-full">
			<div className = "p-2 mb-6">			
				<h1 className = "font-bold text-6xl">Yoyo Clicker</h1>
			</div>
			<div className = "mb-6">
				<label className = {styles.verticalLabel}>Please paste youtube link for the freestyle below</label>	
				<label className = "text-xs">** Currently, Youtube Shorts are <b>not</b> supported</label>
				<label>Number Mode:</label>
				<input type = "checkbox" checked = {numberMode} onChange = {() => dispatch(setNumberMode())}/>
				<label>Border Mode:</label>
				<input type = "checkbox" checked = {borderMode} onChange = {() => dispatch(setBorderMode())}/>
				<p>Is Number Mode On: {numberMode ? "Yes" : "No"} </p>
				<p>Is Border Mode On: {borderMode ? "Yes" : "No"} </p>
			</div>
		</div>
	)
}