import React from "react"
import { styles } from "../../assets/styles"

export const ScoreInstructions = () => {
	return (
		<div className = "text-center border p-4">
			<p className = {styles.label}>Press "Start" to begin the clicker, and "End" to stop the clicker.</p>
			<p> "F" for +1 click, "G" for +2 clicks, and "D" for -1 click </p>
			<p>Click the "Reset" button to reset the scores</p>
			<p>Note that the clickers are disabled while inputting scores.</p>
		</div>
	)
}