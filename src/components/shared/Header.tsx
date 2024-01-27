import React from "react"
import { styles } from "../../assets/styles"
import { FaGear } from "react-icons/fa6" 

type Props = {
	setShowSettings: (showSettings: boolean) => void
	showSettings: boolean
}

export const Header = ({setShowSettings, showSettings}: Props) => {
	return (
		<div className = "top-0 left-0 fixed w-full flex flex-row border-b-2 border-gray-100 p-6 z-10 bg-white">
			<div className = "flex items-center">
				<button className = "flex" onClick={() => setShowSettings(!showSettings)}><FaGear className = {styles.icon}/></button>
				{/*<HamburgerButton/>*/}
			</div>
			<div className = "flex-1">
				<div className = "flex justify-center items-center">
					<h1 className = "font-bold text-6xl text-center">Yoyo Clicker</h1>
				</div>
			</div>
			<div className = "flex justify-end p-4 items-center">
			</div>
		</div>
	)
}