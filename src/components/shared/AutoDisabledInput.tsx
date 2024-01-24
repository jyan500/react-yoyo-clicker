import React, {InputHTMLAttributes} from "react"
import { useAppDispatch } from "../../hooks/reduxHooks" 
import { setIsClickerDisabled } from "../../reducers/clicker" 

export const AutoDisabledInput  = ({...props}: InputHTMLAttributes<HTMLInputElement>) => {
	const dispatch = useAppDispatch()
	return (
		<input 
			onFocus = {(e) => {
				dispatch(setIsClickerDisabled(true))}
			} 
			{...props}
		/>
	)
}