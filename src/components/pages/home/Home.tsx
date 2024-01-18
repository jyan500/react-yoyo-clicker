import React from "react"
import { styles } from "../../../assets/styles" 
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks" 
import { setNumberMode, setBorderMode } from "../../../reducers/clickerConfig" 
import { Clicker } from "../../clicker/Clicker" 

export const Home = () => {
	return (
		<div className = "flex flex-col justify-center items-center h-full">
			<div className = "p-2 mb-6">			
				<h1 className = "font-bold text-6xl">Yoyo Clicker</h1>
			</div>
			<Clicker/>
		</div>
	)
}