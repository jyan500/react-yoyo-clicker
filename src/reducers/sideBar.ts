import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface initialStateType {
	isSideBarOpen: boolean 
}

const initialState: initialStateType = {
	isSideBarOpen: false
}
const sideBarSlice = createSlice({
	name: "sideBar",
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.isSideBarOpen = !state.isSideBarOpen
		},	
	}
})

export const { toggleSideBar } = sideBarSlice.actions

export const sideBar = sideBarSlice.reducer
