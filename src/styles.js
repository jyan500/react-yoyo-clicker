/**
 * @param string designating color such as "purple" or "blue"
 * @return string designating tailwind className for that color
 **/
export const buttonTheme = (color) => {
	const themes = {
		"red": "bg-red-500 hover:bg-red-400",	
		"blue": "bg-blue-500 hover:bg-blue-400",
	}
	return `${themes[color]} text-white`
}
/**
 * @param string designating color such as "purple" or "blue"
 * @return string designating tailwind className for that color focus
 **/
export const textFocus = (color) => {
	const themes = {
		"blue": "focus:border-blue-500"	
	}
	return themes[color]
}

export const styles = {
	"button" : "mr-2 shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded",
	"textInput": `bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white ${textFocus("blue")}`,
	"label": "block font-bold mb-1 md:mb-0",
	"verticalLabel": "block font-bold",
}
