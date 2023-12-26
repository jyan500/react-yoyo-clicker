/**
 * @param string designating color such as "purple" or "blue"
 * @return string designating tailwind className for that color
 **/
export const buttonTheme = (color) => {
	return `bg-${color}-500 hover:bg-${color}-400 text-white`
}
/**
 * @param string designating color such as "purple" or "blue"
 * @return string designating tailwind className for that color focus
 **/
export const textFocus = (color) => {
	return `focus:border-${color}-500`
}

export const styles = {
	"button" : "mr-2 shadow focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded",
	"textInput": `bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white ${textFocus("blue")}`,
	"label": "block font-bold mb-1 md:mb-0",
	"verticalLabel": "block font-bold",
}
