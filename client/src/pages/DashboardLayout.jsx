// IMPORT REACT FUNCTIONS
import { createContext, useContext, useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Outlet } from 'react-router-dom'
// IMPORT JSX COMPONENTS
import { SmallSidebarComponent } from '../components/SmallSidebarComponent'
import { BigSidebarComponent } from '../components/BigSidebarComponent'
// IMPORT JSX FUNCTIONS
import { checkDefaultThemeFunction } from '../utils/checkDefaultThemeFunction.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardLayout } from '../styled_components/StyledDashboardLayout.js'
import { NavbarComponent } from '../components/NavbarComponent.jsx'


// SET GLOBAL CONTEXT
const DashboardContext = createContext()

// SET CUSTOM HOOK
export const useDashboardContext = () => useContext(DashboardContext)


// DASHBOARD LAYOUT JSX COMPONENT
export const DashboardLayout = () => {
	
	// dark theme logic
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultThemeFunction())
	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme
		setIsDarkTheme(newDarkTheme)
		document.body.classList.toggle('dark-theme', newDarkTheme)
		localStorage.setItem('darkThemeLocalStorage', newDarkTheme)
	}
	
	// sidebar logic
	const [showSidebar, setShowSidebar] = useState(false)
	const toggleSidebar = () => {
		setShowSidebar(!showSidebar)
	}

	// logout user logic
	const user = { name: 'john' }
	const logoutUser = async () => {
		console.log("logout user")
	}

	// wrap the return with the global context
	return (
		<DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
			<StyledDashboardLayout>
				<main className="dashboard">
					<SmallSidebarComponent />
					<BigSidebarComponent />
					<div>
						<NavbarComponent />
						<div className="dashboard-page">
							{/* render all children elements for the route using outlet */}
							<Outlet />
						</div>
					</div>
				</main>
			</StyledDashboardLayout>
		</DashboardContext.Provider>
	)
}