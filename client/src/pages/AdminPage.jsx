// IMPORT ROUTER COMPONENTS
import { redirect, useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT REACT ICONS
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa'
// IMPORT STYLED COMPONENTS
import { StyledStatsContainer } from '../styled_components/StyledStatsContainer.js'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "admin" path */
export const loaderAdmin = async () => {
	try {
		const response = await customFetch.get('/users/admin/app-stats')
		return response.data
	} catch (error) {
		toast.error("You are not authorized to view that page")
		return redirect('/dashboard')
	}
}


// ADMIN PAGE JSX COMPONENT
export const AdminPage = () => {
	
	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderAdmin" function (also, refer to App.jsx, "admin" path) */
	const {allUsers, allExpenses, allIncome} = useLoaderData()
	

	return (
		<StyledStatsContainer>
			AdminPage
		</StyledStatsContainer>
	)
}