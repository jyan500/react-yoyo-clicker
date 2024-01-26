/* Currently Unused, see SidePanel.tsx */
import React from 'react';
import { useAppDispatch } from "../../hooks/reduxHooks"
import { toggleSideBar } from "../../reducers/sideBar" 
import { styles } from "../../assets/styles"  

export const HamburgerButton = () => {
	const dispatch = useAppDispatch() 
	return (
		<button onClick={() => dispatch(toggleSideBar())} className="p-4 text-black focus:outline-none">
		<svg className = {styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
			<g id="SVGRepo_iconCarrier"> 
				<path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> 
				<path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> 
				<path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> 
			</g>
		</svg>
		</button>
	);
};
