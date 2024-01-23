import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { FlashTypes, ScoreForm } from "../types/common" 

interface InitialStateType {
	ytVidId: string
	isClickerDisabled: boolean
	positiveClicks: number
	negativeClicks: number
	textFlash: FlashTypes
	borderFlash: FlashTypes
	scores: Array<ScoreForm>
	scoreForm: ScoreForm
}

const initialState: InitialStateType = {
	ytVidId: "",
	isClickerDisabled: false,
	positiveClicks: 0,
	negativeClicks: 0, 
	textFlash: {
		plusOne: false,
		plusTwo: false,
		minusOne: false
	},
	borderFlash: {
		plusOne: false,
		plusTwo: false,
		minusOne: false
	},
	scores: [],
	scoreForm: {
		id: "", 
		judgeName: "", 
		playerName: "", 
		contestName: "", 
		positiveClicks: 0, 
		negativeClicks: 0
	}
}
const clickerSlice = createSlice({
	name: "clicker",
	initialState,
	reducers: {
		setYtVidId: (state, action: PayloadAction<string>) => {
			state.ytVidId = action.payload
		},
		setIsClickerDisabled: (state, action: PayloadAction<boolean>) => {
			state.isClickerDisabled = action.payload 
		},
		setPositiveClicks: (state, action: PayloadAction<number>) => {
			state.positiveClicks = action.payload
		},
		setNegativeClicks: (state, action: PayloadAction<number>) => {
			state.negativeClicks = action.payload
		},
		setTextFlash: (state, action: PayloadAction<FlashTypes>) => {
			state.textFlash = action.payload	
		},
		setBorderFlash: (state, action: PayloadAction<FlashTypes>) => {
			state.borderFlash = action.payload
		},
		setScores: (state, action: PayloadAction<Array<ScoreForm>>) => {
			state.scores = action.payload
		},
		setScoreForm: (state, action: PayloadAction<ScoreForm>) => {
			state.scoreForm = action.payload	
		}
	}
})

export const { 
	setYtVidId, 
	setIsClickerDisabled, 
	setPositiveClicks,
	setNegativeClicks,
	setTextFlash,
	setBorderFlash,
	setScores,
	setScoreForm,
} = clickerSlice.actions

export const clicker = clickerSlice.reducer
