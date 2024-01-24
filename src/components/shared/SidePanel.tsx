import React, { useState, useCallback, useEffect } from "react"
import { FaGear } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks" 
import { initialStateType, setNumberMode, setBorderMode, setPlusOneKey, setMinusOneKey, setPlusTwoKey } from "../../reducers/clickerConfig" 
import { AutoDisabledInput as Input } from "./AutoDisabledInput" 
import { styles, colorVariants, buttonTheme } from "../../assets/styles" 


type InputKeys = "minusOneKey" | "plusOneKey" | "plusTwoKey"
type InitialStateTypeSubset = {
  [K in InputKeys]: initialStateType;
};

export const SidePanel = () => {
	const clickerConfig = useAppSelector((state) => state.clickerConfig)
	const dispatch = useAppDispatch()
	const [showSettings, setShowSettings] = useState(false)
	const [tempNumberMode, setTempNumberMode] = useState(clickerConfig.numberMode)
	const [tempBorderMode, setTempBorderMode] = useState(clickerConfig.borderMode)
	const [isKeyBindingError, setIsKeyBindingError] = useState(false) 
	const defaultTempKeys = {
		plusOneKey: clickerConfig.plusOneKey,
		plusTwoKey: clickerConfig.plusTwoKey,
		minusOneKey: clickerConfig.minusOneKey,
	}
	const [tempKeys, setTempKeys] = useState(defaultTempKeys)
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	const validate = () => {
		const vals = Object.values(tempKeys)
		const uniqueKeys = new Set(vals)
		return uniqueKeys.size === vals.length
	}
	const onSubmit = () => {
		setIsKeyBindingError(false)
		if (!validate()){
			setIsKeyBindingError(true)
			return
		}	
		dispatch(setNumberMode(tempNumberMode))
		dispatch(setBorderMode(tempBorderMode))
		dispatch(setPlusOneKey(tempKeys.plusOneKey))
		dispatch(setMinusOneKey(tempKeys.minusOneKey))
		dispatch(setPlusTwoKey(tempKeys.plusTwoKey))
		setShowSettings(false)
	}
	return (
		<div className = "flex flex-col p-4">
			<button className = "flex justify-end" onClick={() => setShowSettings(!showSettings)}><FaGear className = {`${styles.icon}`}/></button>
			<div className = {`p-2 transition-opacity delay-50 duration-200 ease-in-out ${showSettings ? "opacity-100" : "opacity-0"} border mt-4`}>
				<div className="flex items-center mt-2 mb-2">
				    <input 
					    onChange = {(e) => setTempNumberMode(e.target.checked)} 
					    checked = {clickerConfig.numberMode} 
					    type="checkbox" 
					    className={styles.checkbox}/>
				    <label className={`${styles.label} ml-2`}>Number Mode</label>
				</div>
				<div className="flex items-center mt-2 mb-2">
				    <input 
					    onChange = {(e) => setTempBorderMode(e.target.checked)} 
					    checked = {clickerConfig.borderMode} 
					    type="checkbox" 
					    className={styles.checkbox}/>
				    <label className={`${styles.label} ml-2`}>Border Mode</label>
				</div>
				<div className = "mt-2 mb-2">
					<label className={styles.label}>Update Key Bindings</label>	
					<p className = {`${isKeyBindingError ? "visible": "hidden"} ${styles.text} ${colorVariants.red}`}>
						Key Bindings Must Be Unique
					</p>
				</div>
				{[
					{type: "Plus One Key", "value": "plusOneKey"}, 
					{type: "Plus Two Key", value: "plusTwoKey"}, 
					{type: "Minus One Key", value: "minusOneKey"}].map((keyType) => {
						return (
							<div className = "flex items-center mt-2 mb-2">
								<Input 
								maxLength={1}
								onChange = {(e) => {
									setTempKeys({...tempKeys, [keyType.value]: e.target.value})}
								} className = {`${styles.textInput} w-1/4`} value = {tempKeys[keyType.value as keyof typeof defaultTempKeys]}/>
							    <label className={`${styles.label} ml-2`}>{keyType.type}</label>
						    </div>
						)
				})}
				<div><button onClick = {onSubmit} className = {defaultButton}>Save</button></div>
			</div>
		</div>
	)
}