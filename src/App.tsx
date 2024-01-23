import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { HamburgerButton } from "./components/shared/HamburgerButton" 
import { SideBar } from "./components/shared/SideBar" 
import { SidePanel } from "./components/shared/SidePanel" 
import { Footer } from "./components/shared/Footer"
import { Home } from "./components/pages/home/Home" 

const App = () => {
	return (
		<div>
			<Router>
				<div className = "flex">
					<div className = "w-64">
						<HamburgerButton/>
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
						<SidePanel/>
					</div>
				</div>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
