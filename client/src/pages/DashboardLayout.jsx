// IMPORT REACT FUNCTIONS
import { createContext, useContext, useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Outlet, redirect, useNavigate, useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT JSX COMPONENTS
import { SmallSidebarComponent } from '../components/SmallSidebarComponent'
import { BigSidebarComponent } from '../components/BigSidebarComponent'
// IMPORT JSX FUNCTIONS
import { checkDefaultThemeFunction } from '../utils/checkDefaultThemeFunction.jsx'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT STYLED COMPONENTS
import { StyledDashboardLayout } from '../styled_components/StyledDashboardLayout.js'
import { NavbarComponent } from '../components/NavbarComponent.jsx'


// CREATE A LOADER (FOR PREFETCHING THE DATA; USED IN APP.JSX, "DASHBOARD" PATH)
export const loaderDashboard = async () => {
	try {
		const { data } = await customFetch.get('/users/current-user')
		return data /* must return something; this return will be available in the component, where that loader is used */
	} catch (error) {
		return redirect('/')
	}
}


// SET GLOBAL CONTEXT
const DashboardContext = createContext()


// SET CUSTOM HOOK
export const useDashboardContext = () => useContext(DashboardContext)


// DASHBOARD LAYOUT JSX COMPONENT
export const DashboardLayout = () => {

	/* dark theme logic */
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultThemeFunction())
	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme
		setIsDarkTheme(newDarkTheme)
		document.body.classList.toggle('dark-theme', newDarkTheme)
		localStorage.setItem('darkThemeLocalStorage', newDarkTheme)
	}

	/* sidebar logic */
	const [showSidebar, setShowSidebar] = useState(false)
	const toggleSidebar = () => {
		setShowSidebar(!showSidebar)
	}

	/* "useLoaderData" hook using the return from the loader (refer to "loaderDashboard" function and App.jsx, "dashboard" path) */
	const { currentUser } = useLoaderData() /* destructure the user from the loader data */

	/* invoke useNavigate hook */
	const navigate = useNavigate()

	/* logout user logic */
	const logoutUser = async () => {
		navigate('/')
		await customFetch.get('/auth/logout')
		toast.success("Logged out")
	}

	/* wrap the return with the global context */
	return (
		<DashboardContext.Provider value={{ currentUser, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser }}>
			<StyledDashboardLayout>
				<main className="dashboard">
					<SmallSidebarComponent />
					<BigSidebarComponent />
					<div>
						<NavbarComponent />
						<div className="dashboard-page">
							{/* render all children elements for the route using outlet */}
							<Outlet context={{ currentUser }} /> {/* passing in an object, which will be available in all of the outlet (similar to context provider) */}
						</div>
					</div>
				</main>
			</StyledDashboardLayout>
		</DashboardContext.Provider>
	)
}