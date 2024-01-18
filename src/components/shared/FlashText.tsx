import React, { useState, useEffect }  from "react"
import { useAppSelector } from "../../hooks/reduxHooks"

type PropType = {
	text?: string
	color?: string
	shouldFlash: boolean
}

export const FlashText = ({text, shouldFlash, color}: PropType) => {
	return (
		<div className = {`transition-colors duration-500 ${shouldFlash ? color : 'text-black'} text-4xl`}>
			{text}
		</div>
	)	
}