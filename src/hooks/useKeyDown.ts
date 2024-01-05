import { useEffect } from "react"

export const useKeyDown = (callback: () => void, keys: Array<string>, isDisabled: boolean) => {
	const onKeyDown = (event: KeyboardEvent) => {
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
