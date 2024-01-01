import React, { useState } from "react"
import { SideBar } from "./components/SideBar/SideBar.jsx"
import { HamburgerButton } from "./components/HamburgerButton/HamburgerButton.jsx"
import { Home } from "./components/Home/Home.jsx"

const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false)
    const handleToggleSidebar = () => {
	    setSidebarOpen(!isSidebarOpen)
    }
	return (
		<div className = "relative">
			<HamburgerButton onClick={handleToggleSidebar} />
		    <SideBar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
			<Home/>
		</div>
	)
}

export default App;
