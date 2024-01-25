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

type Props = {
	showSettings: boolean 
	setShowSettingsPanel: (showSettings: boolean) => void
}

export const SidePanel = ({showSettings, setShowSettingsPanel: setShowSettings}: Props) => {
	const clickerConfig = useAppSelector((state) => state.clickerConfig)
	const dispatch = useAppDispatch()
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
		/* Slide open from the right side, hence the -translate-x-0*/
		<div className = {`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform ${showSettings ? '-translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
			<div>
				<button onClick={() => {setShowSettings(false)}} className="p-4 focus:outline-none">
					Close
				</button>
			</div>
			<div className = "p-4">
				<div className="flex flex-col mt-2 mb-2">
				    <label className={`${styles.label}`}>Number Mode</label>
				    <input 
					    onChange = {(e) => setTempNumberMode(e.target.checked)} 
					    checked = {clickerConfig.numberMode} 
					    type="checkbox" 
					    className={styles.checkbox}/>
				</div>
				<div className="flex flex-col mt-2 mb-2">
				    <label className={`${styles.label}`}>Border Mode</label>
				    <input 
					    onChange = {(e) => setTempBorderMode(e.target.checked)} 
					    checked = {clickerConfig.borderMode} 
					    type="checkbox" 
					    className={styles.checkbox}/>
				</div>
				<div className = "mt-4 mb-4 border-b-2 border-white">
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
							<div className = "flex flex-col mt-2 mb-2">
							    <label className={`${styles.label}`}>{keyType.type}</label>
								<Input 
								maxLength={1}
								onChange = {(e) => {
									setTempKeys({...tempKeys, [keyType.value]: e.target.value})}
								} className = {`${styles.textInputDark} w-1/4`} value = {tempKeys[keyType.value as keyof typeof defaultTempKeys]}/>
						    </div>
						)
				})}
				<div className = "mt-4"><button onClick = {onSubmit} className = {defaultButton}>Save</button></div>
			</div>
		</div>
	)
}