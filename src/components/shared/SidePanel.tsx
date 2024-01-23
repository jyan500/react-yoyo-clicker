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
			<button onClick={() => setShowSettings(!showSettings)}><FaGear className = {styles.icon}/></button>
			<div className = {`p-2 transition-opacity delay-50 duration-200 ease-in-out ${showSettings ? "opacity-100" : "opacity-0"} border mt-4`}>
				<div className="flex items-center mb-4">
				    <input 
					    onChange = {() => dispatch(setNumberMode())} 
					    checked = {numberMode} 
					    type="checkbox" 
					    className={styles.checkbox}/>
				    <label className={`${styles.label} ml-2`}>Number Mode</label>
				</div>
				<div className="flex items-center">
				    <input 
					    onChange = {() => dispatch(setBorderMode())} 
					    checked = {borderMode} 
					    type="checkbox" 
					    className={styles.checkbox}/>
				    <label className={`${styles.label} ml-2`}>Border Mode</label>
				</div>
			</div>
		</div>
	)
}