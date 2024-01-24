import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export interface initialStateType {
	numberMode: boolean,
	borderMode: boolean,
	plusOneKey: string,
	plusTwoKey: string,
	minusOneKey: string
}

const initialState: initialStateType = {
	numberMode: true,
	borderMode: true,
	plusOneKey: "f",
	plusTwoKey: "g",
	minusOneKey: "d"
}
const clickerConfigSlice = createSlice({
	name: "clickerConfig",
	initialState,
	reducers: {
		setBorderMode: (state, action: PayloadAction<boolean>) => {
			state.borderMode = action.payload
		},	
		setNumberMode: (state, action: PayloadAction<boolean>) => {
			state.numberMode = action.payload
		},
		setPlusOneKey: (state, action: PayloadAction<string>) => {
			state.plusOneKey = action.payload
		},
		setPlusTwoKey: (state, action: PayloadAction<string>) => {
			state.plusTwoKey = action.payload	
		},
		setMinusOneKey: (state, action: PayloadAction<string>) => {
			state.minusOneKey = action.payload
		}
	}
})

export const { setBorderMode, setNumberMode, setPlusOneKey, setMinusOneKey, setPlusTwoKey } = clickerConfigSlice.actions

export const clickerConfig = clickerConfigSlice.reducer
