import React from "react"
import { useAppSelector } from "../../hooks/reduxHooks" 
import { FlashText } from "../shared/FlashText" 
import { styles, colorVariants } from "../../assets/styles" 

export const ScoreDisplay = () => {
	const isClickerDisabled = useAppSelector((state) => state.clicker.isClickerDisabled)
	const positiveClicks = useAppSelector((state) => state.clicker.positiveClicks)
	const negativeClicks = useAppSelector((state) => state.clicker.negativeClicks)
	const textFlash = useAppSelector((state) => state.clicker.textFlash)
	return (
		<div className = "flex flex-row justify-center items-center">
			<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
				<h1 className = "text-4xl">Positive Clicks</h1>	
				<FlashText text={`+${positiveClicks}`} shouldFlash = {textFlash.plusOne || textFlash.plusTwo} color = {textFlash.plusOne ? colorVariants.lime : colorVariants.sky}/>
			</div>
			<div className = {`${styles.label} ${isClickerDisabled ? "opacity-50": ""} flex flex-col justify-center items-center p-2`}>
				<h1 className = "text-4xl">Negative Clicks</h1>
				<FlashText text={`-${negativeClicks}`} shouldFlash = {textFlash.minusOne} color = {colorVariants.red}/>
			</div>
		</div>
	)
}