import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface initialStateType {
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
		setBorderMode: (state) => {
			state.borderMode = !state.borderMode
		},	
		setNumberMode: (state) => {
			state.numberMode = !state.numberMode
		}
	}
})

export const { setBorderMode, setNumberMode } = clickerConfigSlice.actions

export const clickerConfig = clickerConfigSlice.reducer
