import React, { useState } from "react"
import { FaGear } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks" 
import { setNumberMode, setBorderMode } from "../../reducers/clickerConfig" 
import { styles } from "../../assets/styles" 
export const SidePanel = () => {
	const borderMode = useAppSelector((state) => state.clickerConfig.borderMode)
	const numberMode = useAppSelector((state) => state.clickerConfig.numberMode)
	const dispatch = useAppDispatch()
	const [showSettings, setShowSettings] = useState(false)

	return (
		<div className = "flex flex-col p-4">
			<button onClick={() => setShowSettings(!showSettings)}><FaGear className = "w-8 h-8"/></button>
			<div className = {`p-2 ${showSettings ? "visible" : "invisible"}`}>
				<div className = "flex flex-row">
					<label className = {styles.label}>Number Mode:</label>
					<input type = "checkbox" checked = {numberMode} onChange = {() => dispatch(setNumberMode())}/>
				</div>
				<div className = "flex flex-row">
					<label className = {styles.label}>Border Mode:</label>
					<input type = "checkbox" checked = {borderMode} onChange = {() => dispatch(setBorderMode())}/>
				</div>
			</div>
		</div>
	)
}