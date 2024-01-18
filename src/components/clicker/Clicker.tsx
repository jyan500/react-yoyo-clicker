import React from "react"
import { YoutubeForm } from "./YoutubeForm"
import { ScoreForm } from "./ScoreForm" 
import { ScoreDisplay } from "./ScoreDisplay" 
import { ScoreInstructions } from "./ScoreInstructions" 
import { ScoreTable } from "./ScoreTable" 
import { ScoreButtons } from "./ScoreButtons" 
import { YoutubeEmbed } from "../shared/YoutubeEmbed" 
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { useKeyDown } from "../../hooks/useKeyDown"
import { 
	setYtVidId, 
	setIsClickerDisabled, 
	setPositiveClicks,
	setNegativeClicks,
	setTextFlash,
	FlashTypeKey,
} from "../../reducers/clicker" 

export const Clicker = () => {
	const dispatch = useAppDispatch()
	const ytVidId = useAppSelector((state) => state.clicker.ytVidId)
	const numberMode = useAppSelector((state) => state.clickerConfig.numberMode)
	const borderMode = useAppSelector((state) => state.clickerConfig.borderMode)
	const isClickerDisabled = useAppSelector((state) => state.clicker.isClickerDisabled)
	const negativeClicks = useAppSelector((state) => state.clicker.negativeClicks)
	const positiveClicks = useAppSelector((state) => state.clicker.positiveClicks)
	const textFlash = useAppSelector((state) => state.clicker.textFlash)

	const handleTextFlash = (type: FlashTypeKey) => {
		dispatch(setTextFlash({...textFlash, [type]: true}))
	    setTimeout(() => {
	    	dispatch(setTextFlash({...textFlash, [type]: false}))
	    }, 400);
	}

	useKeyDown(() => {
		handleTextFlash("plusOne")
		dispatch(setPositiveClicks(positiveClicks+1))
		if (numberMode){
			// showAndHidePlusOne()
		}
		if (borderMode){
			// showAndHideBorder()
			// setBorderColor("lime")
		}
	}, ["f"], isClickerDisabled)

	useKeyDown(() => {
		handleTextFlash("minusOne")
		dispatch(setNegativeClicks(negativeClicks+1))
		if (numberMode){
			// showAndHideMinusOne()
		}
		if (borderMode){
			// showAndHideBorder()
			// setBorderColor("red")
		}
	}, ["d"], isClickerDisabled)

	useKeyDown(() => {
		handleTextFlash("plusTwo")
		dispatch(setPositiveClicks(positiveClicks+2))
		// showAndHidePlusTwo()
		// showAndHideBorder()
		// setBorderColor("sky")
	}, ["g"], isClickerDisabled)

	return (
		<>
			<YoutubeForm/>	
			<ScoreInstructions/>
			{ ytVidId !== "" ? (
				<YoutubeEmbed/>
			) : null}
			<ScoreDisplay/>
			<ScoreButtons/>
		</>
	)	
}