import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export type FlashTypeKey = "plusOne" | "minusOne" | "plusTwo"

interface FlashTypes {
	plusOne: boolean
	plusTwo: boolean
	minusOne: boolean
}

interface InitialStateType {
	ytVidId: string
	isClickerDisabled: boolean
	positiveClicks: number
	negativeClicks: number
	textFlash: FlashTypes
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
		}
	}
})

export const { 
	setYtVidId, 
	setIsClickerDisabled, 
	setPositiveClicks,
	setNegativeClicks,
	setTextFlash
} = clickerSlice.actions

export const clicker = clickerSlice.reducer
