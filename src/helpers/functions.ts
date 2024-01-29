import type { FlashTypes } from "../types/common"
import { colorVariants, borderVariants } from "../assets/styles"

export const getColor = (type: "text" | "border", flashTypes: FlashTypes) => {
	let color = type === "text" ? "text-black" : "border-transparent"
	let variants = type === "text" ? colorVariants : borderVariants
	if (flashTypes.plusOne){
		color = variants["lime"]
	}
	else if (flashTypes.plusTwo) {
		color = variants["sky"]
	}
	else if (flashTypes.minusOne) {
		color = variants["red"]
	}
	return color
}

export const parseLeadingZeroes = (num: number): number => {
	const n = num.toString().split("")
	let firstNonZeroChar = 0
	for (let i = 0; i < n.length; ++i){
		// as soon as we hit the first non zero character, break
		if (n[i] !== "0"){
			firstNonZeroChar = i
			break
		}
	}
	return parseInt(n.slice(firstNonZeroChar, n.length).join(""))
}
