import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { HamburgerButton } from "./components/shared/HamburgerButton" 
import { SideBar } from "./components/shared/SideBar" 
import { SidePanel } from "./components/shared/SidePanel" 
import { Footer } from "./components/shared/Footer"
import { Home } from "./components/pages/home/Home" 
import { FaGear } from "react-icons/fa6" 
import { styles } from "./assets/styles" 

const App = () => {
	const [showSettings, setShowSettings] = useState(false)

	const setShowSettingsPanel = (showSetting: boolean) => {
		setShowSettings(showSetting)
	}

	return (
		<div>
			<Router>
				<div className = "flex flex-col">
					<div className = "w-full flex flex-row border-b-2 border-gray-100 p-6">
						<div className = "flex items-center">
							<HamburgerButton/>
						</div>
						<div className = "flex-1">
							<div className = "flex justify-center items-center">
								<h1 className = "font-bold text-6xl text-center">Yoyo Clicker</h1>
							</div>
						</div>
						<div className = "flex justify-end p-4 items-center">
							<button className = "flex justify-end" onClick={() => setShowSettings(!showSettings)}><FaGear className = {`${styles.icon}`}/></button>
						</div>
					</div>
					<div className = "w-full flex flex-row">
						<div className = "w-64">
							<SideBar/>
						</div>
						<div className = "flex-1">
							<div>
								<Routes>
							    	<Route path = "/" element = {<Home/>}></Route>
								</Routes>
							</div>
						</div>
						<div className = "w-64">
							<SidePanel showSettings = {showSettings} setShowSettingsPanel={setShowSettingsPanel}/>
						</div>
					</div>
				</div>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
