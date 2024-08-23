// MANAGE DARK THEME
export const checkDefaultThemeFunction = () => {
	const isDarkTheme = localStorage.getItem('darkThemeLocalStorage') === 'true' /* "true" is a string, not a boolean */
	document.body.classList.toggle('dark-theme', isDarkTheme)
	return isDarkTheme
}
