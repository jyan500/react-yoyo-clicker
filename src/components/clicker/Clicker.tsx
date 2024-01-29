import React, {useEffect, useState} from "react"
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
import {utils, writeFile} from "xlsx";

export const Clicker = () => {
	const dispatch = useAppDispatch()
	const {
		ytVidId, 
		isClickerDisabled, 
		negativeClicks, 
		positiveClicks,
		textFlash, 
		borderFlash, 
		scores: savedScores, 
		scoreForm
	} = useAppSelector((state) => state.clicker)
	const {
		borderMode, 
		numberMode, 
		plusOneKey, 
		minusOneKey, 
		plusTwoKey
	} = useAppSelector((state) => state.clickerConfig)

	const [clickType, setClickType] = useState("") 

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
	    	// to all things false as soon as time elapses
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
	    	// to all things false as soon as time elapses
	    	let allFalse = {...borderFlash}
	    	Object.keys(allFalse).forEach((key) => {
	    		allFalse[key as FlashTypeKey] = false
	    	})
			dispatch(setBorderFlash(allFalse))
		}, 300)
	}

	/* 
		In Order to support color flashing on both PC and mobile, 
		this applies a useEffect hook to 
		check whether the positive or negative clicks was incremented.
		(regardless of whether it was incremented via button press from mobile, or keystroke
		from PC)
		Then, apply the flashing color logic based on whether the type of click was "plusOne", "plusTwo", 
		"minusOne"
	*/
	useEffect(() => {
		if (numberMode){
			if (clickType === "plusOne" || clickType === "plusTwo"){
				handleTextFlash(clickType)
			}
		}
		if (borderMode){
			if (clickType === "plusOne" || clickType === "plusTwo"){
				handleBorderFlash(clickType)
			}
		}
	}, [positiveClicks])

	useEffect(() => {
		if (clickType === "minusOne"){
			if (numberMode){
				handleTextFlash("minusOne")
			}
			if (borderMode){
				handleBorderFlash("minusOne")
			}
		}
	}, [negativeClicks])

	useKeyDown(() => {
		setClickType("plusOne")
		dispatch(setPositiveClicks(positiveClicks+1))
	}, [plusOneKey], isClickerDisabled)

	useKeyDown(() => {
		setClickType("minusOne")
		dispatch(setNegativeClicks(negativeClicks+1))
	}, [minusOneKey], isClickerDisabled)

	useKeyDown(() => {
		setClickType("plusTwo")
		dispatch(setPositiveClicks(positiveClicks+2))
	}, [plusTwoKey], isClickerDisabled)

	const downloadExcel = () => {
		const colWidth = [...Array(5)].map((_, i) => {
			return {width: 30}
		});
		const data = savedScores.map((score) => {
			return {
				"Judge": score.judgeName, 
				"Contest": score.contestName, 
				"Player": score.playerName, 
				"Positive Clicks": `+${score.positiveClicks.toString()}`, 
				"Negative Clicks": `-${score.negativeClicks.toString()}`, 
			}		
		})
		const worksheet = utils.json_to_sheet(data)	
		worksheet["!cols"] = colWidth
		const workbook = utils.book_new()
		utils.book_append_sheet(workbook, worksheet, "Sheet1")
		writeFile(workbook, "score-sheet.xlsx")
	}

	return (
		<>
			<div className = "p-4">
				<YoutubeForm/>	
			</div>
			<div className = "p-4">
				<ScoreInstructions/>
			</div>
			<div className = "p-4 flex justify-center w-full">
				{ ytVidId !== "" ? (
					<YoutubeEmbed 
						ytVidId = {ytVidId} 
						shouldFlash = {borderFlash.plusOne || borderFlash.plusTwo || borderFlash.minusOne} 
						isBorderMode = {true}
						borderColor = {getColor("border", borderFlash)} 
					/>
				) : null}
			</div>
			<div className = "p-4">
				<ScoreDisplay/>
			</div>
			<div className = "p-4">
				<ScoreButtons setClickType = {setClickType} downloadExcel={downloadExcel}/>
			</div>
			<div className = "p-4 w-full">
				<ScoreForm />
			</div>
			<div className = "p-4 w-full">
				<ScoreTable editScore={editScore} deleteScore={deleteScore}/>
			</div>
		</>
	)	
}