import React from 'react';
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks" 
import { toggleSideBar } from "../../reducers/sideBar" 

export const SideBar = () => {
	const isSideBarOpen = useAppSelector((state) => state.sideBar.isSideBarOpen)
	const dispatch = useAppDispatch()
	return (
		<div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
		{/* Sidebar content goes here */}
		<button onClick={() => dispatch(toggleSideBar())} className="absolute top-2 right-2 p-2 focus:outline-none">
		Close
		</button>
		</div>
	)
}
