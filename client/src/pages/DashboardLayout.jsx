// IMPORT REACT FUNCTIONS
import { createContext, useContext, useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Outlet, redirect, useNavigate, useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { SmallSidebarComponent } from '../components/SmallSidebarComponent.jsx'
import { BigSidebarComponent } from '../components/BigSidebarComponent.jsx'
import { NavbarComponent } from '../components/NavbarComponent.jsx'
// IMPORT JSX FUNCTIONS
import { checkDefaultThemeFunction } from '../utils/checkDefaultThemeFunction.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardLayout } from '../styled_components/StyledDashboardLayout.js'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "dashboard" path */
export const loaderDashboard = async () => {
    try {
        const [userResponse, expensesResponse, incomeResponse] = await Promise.all([
            customFetch.get('/users/current-user'), /* fetch the current user data */
            customFetch.get('/expenses/stats'), /* fetch the expenses stats */
            customFetch.get('/income/stats') /* fetch the income stats */
        ])
        const currentUser = userResponse.data.currentUserObj
        const { currentMonthlyExpensesSum, currentAnnualExpensesSum } = expensesResponse.data
        const { currentMonthlyIncomeSum, currentAnnualIncomeSum } = incomeResponse.data
        return { currentUser, currentMonthlyExpensesSum, currentAnnualExpensesSum, currentMonthlyIncomeSum, currentAnnualIncomeSum } /* return the combined data */
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

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderDashboard" function (also, refer to App.jsx, "dashboard" path) */
	const { currentUser, currentMonthlyExpensesSum, currentMonthlyIncomeSum, currentAnnualExpensesSum, currentAnnualIncomeSum } = useLoaderData() /* destructure the data from the loader data */

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
		<DashboardContext.Provider value={{ currentUser, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser, currentMonthlyExpensesSum, currentMonthlyIncomeSum, currentAnnualExpensesSum, currentAnnualIncomeSum }}>
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