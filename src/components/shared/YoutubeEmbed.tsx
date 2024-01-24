import React from "react"
import { borderVariants } from "../../assets/styles"
import "../../assets/YoutubeEmbed.css"
import { getColor } from "../../helpers/functions"
import { FlashTypes } from "../../types/common" 

type YoutubeEmbedProps = {
	ytVidId: string
	isBorderMode?: boolean
	shouldFlash?: boolean
	borderColor?: string
}

export const YoutubeEmbed = (
	{
		ytVidId, 
		isBorderMode, 
		shouldFlash, 
		borderColor
	}: YoutubeEmbedProps
) => {
	return (
		<div className = "flex justify-center w-full">
		    <iframe
		    	className={`transition-colors duration-300 border-8 ${(isBorderMode && shouldFlash && borderColor) ? borderColor : "border-transparent"} video`}
			    src={`https://www.youtube.com/embed/${ytVidId}`}
			    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			    allowFullScreen
			    title="Embedded youtube"
		    />
	    </div>
	)
}
