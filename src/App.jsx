import React, { useState } from "react"
import { SideBar } from "./components/SideBar/SideBar.jsx"
import { HamburgerButton } from "./components/HamburgerButton/HamburgerButton.jsx"
import { Home } from "./components/pages/Home/Home.jsx"
import { Scores } from "./components/pages/Scores/Scores.jsx"
import { Footer } from "./components/Footer/Footer.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false)
    const handleToggleSidebar = () => {
	    setSidebarOpen(!isSidebarOpen)
    }
	return (
		<div>
			<Router>
				<div className = "flex">
					<div className = "w-64">
						<HamburgerButton onClick={handleToggleSidebar} />
					    <SideBar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
				    </div>
				    <div className = "flex flex-1">
					    <div>
					    	<Routes>
						    	<Route path = "/" element = {<Home/>}></Route>
						    	<Route path = "/scores" element = {<Scores/>}></Route>
					    	</Routes>
					    	<Footer></Footer>
				    	</div>
					</div>
					<div className = "w-64">
						<p>Promotional Content Here</p>
					</div>
				</div>
			</Router>
		</div>
	)
}

export default App;
