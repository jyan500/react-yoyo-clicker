export type FlashTypeKey = "plusOne" | "minusOne" | "plusTwo"

export type FlashTypes = {
	plusOne: boolean
	plusTwo: boolean
	minusOne: boolean
}

export type ScoreForm = {
	id: string
	judgeName: string
	playerName: string
	contestName: string
	positiveClicks: number
	negativeClicks: number
}

export type themeColors = "red" | "blue"

export type colorVariants = "red" | "lime" | "sky"
