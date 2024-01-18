import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setYtVidId, setIsClickerDisabled } from "../../reducers/clicker" 
import { borderVariants } from "../../assets/styles"
import "../../assets/YoutubeEmbed.css"

type YoutubeEmbedProps = {
	borderColor?: string
}

export const YoutubeEmbed = (props: YoutubeEmbedProps) => {
	const ytVidId = useAppSelector((state) => state.clicker.ytVidId)
	const isBorderMode = useAppSelector((state) => state.clickerConfig.borderMode)
	return (
		<div className = "flex justify-center w-full">
		    <iframe
		    	className={`border-8 ${isBorderMode && props.borderColor ? borderVariants[props.borderColor] : "border-transparent"} video`}
			    src={`https://www.youtube.com/embed/${ytVidId}`}
			    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			    allowFullScreen
			    title="Embedded youtube"
		    />
	    </div>
	)
}
