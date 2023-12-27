import React from "react"
import "./FadeInNumber.css"

export const FadeInNumber = ({text, showNum}) => {
	return (
		<p className = {`fade-container ${showNum ? "visible" : ""}`}>{text}</p>
	)	
}
