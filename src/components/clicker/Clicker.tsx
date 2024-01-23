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
	setBorderFlash,
	setScoreForm,
	setScores,
} from "../../reducers/clicker" 
import type { FlashTypeKey, FlashTypes } from "../../types/common"
import { getColor } from "../../helpers/functions" 

export const Clicker = () => {
	const dispatch = useAppDispatch()
	const ytVidId = useAppSelector((state) => state.clicker.ytVidId)
	const numberMode = useAppSelector((state) => state.clickerConfig.numberMode)
	const borderMode = useAppSelector((state) => state.clickerConfig.borderMode)
	const isClickerDisabled = useAppSelector((state) => state.clicker.isClickerDisabled)
	const negativeClicks = useAppSelector((state) => state.clicker.negativeClicks)
	const positiveClicks = useAppSelector((state) => state.clicker.positiveClicks)
	const textFlash = useAppSelector((state) => state.clicker.textFlash)
	const borderFlash = useAppSelector((state) => state.clicker.borderFlash)
	const savedScores = useAppSelector((state) => state.clicker.scores)
	const scoreForm = useAppSelector((state) => state.clicker.scoreForm)

	const editScore = (scoreId: string) => {
		const score = savedScores.find((score)=>score.id === scoreId)
		if (score){
			dispatch(setScoreForm(score))
		}
	}

	const deleteScore = (scoreId: string) => {
		dispatch(setScores(savedScores.filter(score => score.id !== scoreId)))
	}

	const handleTextFlash = (type: FlashTypeKey) => {
		dispatch(setTextFlash({...textFlash, [type]: true}))
	    const id = setTimeout(() => {
	    	// avoid race condition of pressing multiple keys at once by setting the flash
	    	// to all things false
	    	let allFalse = {...textFlash}
	    	Object.keys(allFalse).forEach((key) => {
	    		allFalse[key as FlashTypeKey] = false
	    	})

	    	dispatch(setTextFlash(allFalse))
	    }, 300);
	}
	const handleBorderFlash = (type: FlashTypeKey) => {
		dispatch(setBorderFlash({...borderFlash, [type]: true}))
		const id = setTimeout(() => {
	    	// avoid race condition of pressing multiple keys at once by setting the flash
	    	// to all things false
	    	let allFalse = {...borderFlash}
	    	Object.keys(allFalse).forEach((key) => {
	    		allFalse[key as FlashTypeKey] = false
	    	})
			dispatch(setBorderFlash(allFalse))
		}, 300)
	}

	useKeyDown(() => {
		dispatch(setPositiveClicks(positiveClicks+1))
		if (numberMode){
			handleTextFlash("plusOne")
		}
		if (borderMode){
			handleBorderFlash("plusOne")
		}
	}, ["f"], isClickerDisabled)

	useKeyDown(() => {
		dispatch(setNegativeClicks(negativeClicks+1))
		if (numberMode){
			handleTextFlash("minusOne")
		}
		if (borderMode){
			handleBorderFlash("minusOne")
		}
	}, ["d"], isClickerDisabled)

	useKeyDown(() => {
		if (numberMode){
			handleTextFlash("plusTwo")
		}
		if (borderMode){
			handleBorderFlash("plusTwo")
		}
		dispatch(setPositiveClicks(positiveClicks+2))
	}, ["g"], isClickerDisabled)

	return (
		<>
			<YoutubeForm/>	
			<ScoreInstructions/>
			{ ytVidId !== "" ? (
				<YoutubeEmbed 
					ytVidId = {ytVidId} 
					shouldFlash = {borderFlash.plusOne || borderFlash.plusTwo || borderFlash.minusOne} 
					isBorderMode = {true}
					borderColor = {getColor("border", borderFlash)} 
				/>
			) : null}
			<ScoreDisplay/>
			<ScoreButtons/>
			<ScoreForm />
			<ScoreTable editScore={editScore} deleteScore={deleteScore}/>
		</>
	)	
}