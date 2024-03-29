import React from "react"
import { useAppSelector } from "../../hooks/reduxHooks" 
import { FlashText } from "../shared/FlashText" 
import { styles, colorVariants } from "../../assets/styles" 
import { getColor } from "../../helpers/functions" 

export const ScoreDisplay = () => {
	const {
		isClickerDisabled, 
		positiveClicks, 
		negativeClicks, 
		textFlash
	} = useAppSelector((state) => state.clicker)
	return (
		<div className = "flex flex-row justify-center items-center">
			<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
				<h1 className = "text-center text-4xl">Positive Clicks</h1>	
				<FlashText text={`+${positiveClicks}`} shouldFlash = {textFlash.plusOne || textFlash.plusTwo} color = {getColor("text", textFlash)}/>
			</div>
			<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
				<h1 className = "text-center text-4xl">Negative Clicks</h1>
				<FlashText text={`-${negativeClicks}`} shouldFlash = {textFlash.minusOne} color = {getColor("text", textFlash)}/>
			</div>
		</div>
	)
}