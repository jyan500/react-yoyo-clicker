import { useEffect } from "react"

export const useKeyDown = (callback, keys, isDisabled) => {
	const onKeyDown = (event) => {
		const anyKeyPressed = keys.some((key) => event.key === key)	
		if (anyKeyPressed && !isDisabled) {
			event.preventDefault()
			callback()
		}
	}	
	useEffect(() => {
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('keydown', onKeyDown)
		}		
	}, [onKeyDown])
}
