import React from "react"
import "./FadeInNumber.css"

export const FadeInNumber = ({text, showNum, color}) => {
	const colorVariants = {
		"red": "text-red-500",	
		"lime": "text-lime-500",	
		"sky": "text-sky-500",	
	}
	return (
		<p className = {`fade-container text-2xl ${colorVariants[color]} ${showNum ? "visible" : ""}`}>{text}</p>
	)	
}
