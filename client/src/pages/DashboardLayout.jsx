// IMPORT REACT FUNCTIONS
import { createContext, useContext, useEffect, useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Outlet, redirect, useNavigate, useNavigation } from 'react-router-dom'
// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { SmallSidebarComponent } from '../components/SmallSidebarComponent.jsx'
import { BigSidebarComponent } from '../components/BigSidebarComponent.jsx'
import { NavbarComponent } from '../components/NavbarComponent.jsx'
import { LoadingComponent } from '../components/LoadingComponent.jsx'
// IMPORT JSX FUNCTIONS
import { checkDefaultThemeFunction } from '../utils/checkDefaultThemeFunction.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardLayout } from '../styled_components/StyledDashboardLayout.js'


// CREATE QUERY FUNCTION
const dashboardQuery = {
	queryKey: ["dashboardQuery"], /* the name of the query (use the same name when invalidating) */
	queryFn: async () => {
		const [userResponse, expensesResponse, incomeResponse] = await Promise.all([
			customFetch.get('/users/current-user'), /* fetch the current user data */
			customFetch.get('/expenses/stats'), /* fetch the expenses stats */
			customFetch.get('/income/stats') /* fetch the income stats */
		])
		const currentUser = userResponse.data.currentUserObj
		const { currentMonthlyExpensesSum, currentAnnualExpensesSum, overallExpensesSum } = expensesResponse.data
		const { currentMonthlyIncomeSum, currentAnnualIncomeSum, overallIncomeSum } = incomeResponse.data
		return { currentUser, currentMonthlyExpensesSum, currentAnnualExpensesSum, overallExpensesSum, currentMonthlyIncomeSum, currentAnnualIncomeSum, overallIncomeSum } /* return the combined data */
	}
}


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "dashboard" path */
/* incorporated queryClient into the loader (a function that returns another function) */
export const loaderDashboard = (queryClient) => async () => {
	try {
		return await queryClient.ensureQueryData(dashboardQuery)
	} catch (error) {
		return redirect('/')
	}
}


// SET GLOBAL CONTEXT
const DashboardContext = createContext()
// SET CUSTOM HOOK
export const useDashboardContext = () => useContext(DashboardContext)


// DASHBOARD LAYOUT JSX COMPONENT
export const DashboardLayout = ({queryClient}) => {

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

	/* invoke useNavigate hook */
	const navigate = useNavigate()

	/* loading spinner logic */
	const navigation = useNavigation()
	const isPageLoading = navigation.state === 'loading'

	/* logout user logic */
	const logoutUser = async () => {
		navigate('/')
		await customFetch.get('/auth/logout')
		queryClient.invalidateQueries() /* invalidate all queries */
		toast.success("Logged out")
	}

	/* auth interceptor logic */
	const [isAuthError, setIsAuthError] = useState(false)
	customFetch.interceptors.response.use((response) => {return response}, (error)=>{
		if (error?.response?.status === 401) {
			setIsAuthError(true)
		}
		return Promise.reject(error)
	})
	useEffect(() => {
		if (!isAuthError) return
		logoutUser()
	}, [isAuthError])

	/* get the data from react query, instead of the loader */
	const { currentUser, currentMonthlyExpensesSum, currentAnnualExpensesSum, overallExpensesSum, currentMonthlyIncomeSum, currentAnnualIncomeSum, overallIncomeSum } = useQuery(dashboardQuery).data /* react query returns an object named "data" */

	/* wrap the return with the global context */
	return (
		<DashboardContext.Provider value={{ currentUser, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser, currentMonthlyExpensesSum, currentAnnualExpensesSum, overallExpensesSum, currentMonthlyIncomeSum, currentAnnualIncomeSum, overallIncomeSum }}>
			<StyledDashboardLayout>
				<main className="dashboard">
					<SmallSidebarComponent />
					<BigSidebarComponent />
					<div>
						<NavbarComponent />
						<div className="dashboard-page">
							{/* render all children elements for the route using outlet */}
							{isPageLoading ? <LoadingComponent /> : <Outlet context={{ currentUser }} />} {/* display loading spinner if the data is loading */}
							{/* <Outlet context={{ currentUser }} /> */} {/* passing in an object, which will be available in all of the outlet (similar to context provider) */}
						</div>
					</div>
				</main>
			</StyledDashboardLayout>
		</DashboardContext.Provider>
	)
}