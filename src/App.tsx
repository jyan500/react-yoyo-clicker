import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { HamburgerButton } from "./components/shared/HamburgerButton" 
import { SideBar } from "./components/shared/SideBar" 
import { SidePanel } from "./components/shared/SidePanel" 
import { Footer } from "./components/shared/Footer"
import { Home } from "./components/pages/home/Home" 
import { Header } from "./components/shared/Header" 
import { styles } from "./assets/styles" 

const App = () => {
	const [showSettings, setShowSettings] = useState(false)

	const setShowSettingsPanel = (showSetting: boolean) => {
		setShowSettings(showSetting)
	}

	return (
		<div>
			<Router>
				<div className = "relative flex flex-col">
					<Header setShowSettings = {setShowSettings} showSettings = {showSettings}/>	
					<div className = "mt-40 w-full flex flex-row">
						<div className = "w-64">
							<SidePanel showSettings = {showSettings} setShowSettingsPanel={setShowSettingsPanel}/>
						</div>
						<div className = "flex-1">
							<div>
								<Routes>
							    	<Route path = "/" element = {<Home/>}></Route>
								</Routes>
							</div>
						</div>
						<div className = "w-64">
						</div>
					</div>
				</div>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
