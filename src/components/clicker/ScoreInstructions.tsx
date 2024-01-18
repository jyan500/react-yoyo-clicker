import React from "react"
import { styles } from "../../assets/styles"

export const ScoreInstructions = () => {
	return (
		<div className = "text-center mt-6 p-2 border">
			<p className = {styles.label}>Press "F" for +1 click, "G" for +2 clicks, and "D" for -1 click </p>
			<p>Click the "Reset" button to reset the scores</p>
			<p>Note that the clickers are disabled while inputting scores.</p>
		</div>
	)
}