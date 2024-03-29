import React, {useState} from "react"
import { buttonTheme, styles } from "../../assets/styles" 
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setYtVidId, setIsClickerDisabled } from "../../reducers/clicker" 
import { AutoDisabledInput as Input } from "../shared/AutoDisabledInput" 

export const YoutubeForm = () => {
	const [showUrlError, setShowUrlError] = useState(false)
	const [ytVidLink, setYtVidLink] = useState("")
	const ytVidId = useAppSelector((state) => state.clicker.ytVidId)
	const dispatch = useAppDispatch()
	const parseVidLink = () => {
		setShowUrlError(false)
		try  {
			const ytUrl = new URL(ytVidLink)
			if (ytUrl){
				const queryParams = new URLSearchParams(ytUrl.search)
				const vidId = queryParams.get("v")
				if (vidId){
					dispatch(setYtVidId(vidId))
				}
			}
		}
		catch {
			setShowUrlError(true)
		}
	}
	const defaultButton = `${buttonTheme("blue")} ${styles.button}`
	return (
		<div>
			<label className = {styles.verticalLabel}>Please paste youtube link for the freestyle below</label>	
			<label className = "text-xs">** Currently, Youtube Shorts are <b>not</b> supported</label>
			<Input value = {ytVidLink} 
				onChange = {(e) => setYtVidLink(e.target.value)} 
				className = {`${styles.textInput}`}
			/>
			<div className = "p-4 flex flex-row justify-center items-center">
				<button onClick = {() => parseVidLink()} className = {defaultButton}>Submit</button>
				<button className = {defaultButton} onClick = {() => {
						setYtVidLink("") 
						setShowUrlError(false)
						dispatch(setYtVidId(""))
					}}>Clear</button>
			</div>
			<p className = {`${styles.label} ${showUrlError ? "visible": "hidden"}`}>Please type in valid youtube URL</p>
		</div>
	)
}