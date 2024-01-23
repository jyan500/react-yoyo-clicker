import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"  
import { styles, buttonTheme } from "../../assets/styles" 

type Props = {
	editScore: (id: string) => void
	deleteScore: (id: string) => void
}

export const ScoreTable = ({editScore, deleteScore}: Props) => {
	const dispatch = useAppDispatch()
	const savedScores = useAppSelector((state) => state.clicker.scores)
	const defaultButton = `${styles.button} ${buttonTheme("blue")}`
	const alertButton = `${styles.button} ${buttonTheme("red")}`
	return (
		<div className = "w-full p-4">
			<table className="table-auto w-full">
		  <thead className = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		    <tr>
		    	{["Judge", "Contest", "Player", "Positive Clicks", "Negative Clicks", "", ""].map((text) => {
					return (<th className = "p-2">{text}</th>)
				})}
		    </tr>
		  </thead>
		  <tbody>
		  	{
				savedScores.map(score => {
					return (
						<tr className = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key = {score.id}>
							{["judgeName", "contestName", "playerName", "positiveClicks", "negativeClicks"].map((key) => {
								let t = score[key as keyof typeof score]
								if (key === "positiveClicks" || key === "negativeClicks"){
									t = `${key === "positiveClicks" ? "+" : "-"}${score[key]}`
								}
								return (
									<td className = "text-center p-2">
										<span>{t}</span>
									</td>							
								)	
							})}
							<td><button className = {defaultButton} onClick = {() => editScore(score.id)}>Edit Score</button></td>							
							<td><button className = {alertButton} onClick = {() => deleteScore(score.id)}>Delete Score</button></td>							
						</tr>
					)
				})
			}
		  </tbody>
			</table>
		</div>
	)	
}