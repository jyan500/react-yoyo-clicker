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