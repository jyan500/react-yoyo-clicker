import React from "react"
import { styles } from "../../assets/styles"
import { useMediaQuery } from "react-responsive" 

export const ScoreInstructions = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
	return (
		<div className = "text-center border p-4">
			<p className = {styles.label}>Press "Start" to begin the clicker, and "End" to stop the clicker.</p>
			{!isTabletOrMobile ? (
				<p> "F" for +1 click, "G" for +2 clicks, and "D" for -1 click </p>
			) : 
			(
				<p> On Mobile, Press "+1" for +1 click, and "-1" for -1 click </p>
			)
			}
			<p>Click the "Reset" button to reset the scores</p>
			<p>Note that the clickers are disabled while inputting scores.</p>
		</div>
	)
}