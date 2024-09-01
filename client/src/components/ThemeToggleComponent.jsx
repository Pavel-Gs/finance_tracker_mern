// IMPORT CUSTOM HOOKS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT REACT ICONS
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
// IMPORT STYLED COMPONENTS
import { StyledThemeToggleComponent } from '../styled_components/StyledThemeToggleComponent.js'


// THEME TOGGLE JSX COMPONENT
export const ThemeToggleComponent = () => {
	
	/* use global context data */
	const { isDarkTheme, toggleDarkTheme } = useDashboardContext()

	return (
		<StyledThemeToggleComponent onClick={toggleDarkTheme}>
			{isDarkTheme ? <BsFillSunFill className='toggle-icon' /> : <BsFillMoonFill />}
		</StyledThemeToggleComponent>
	)
}
