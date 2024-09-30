// IMPORT REACT FUNCTIONS
import { createContext, useContext } from 'react'
// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { AllIncomeContainerComponent } from '../../components/income_components/AllIncomeContainerComponent.jsx'
import { SearchIncomeContainerComponent } from '../../components/income_components/SearchIncomeContainerComponent.jsx'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "all-income" path */
export const loaderAllIncome = async () => {
	try {

		/* get all of the data */
		const { data } = await customFetch.get('/income') /* get the entire object from API */
		const { allIncome } = data /* destructure income from the data */

		/* filter today's income from allIncome */
		const getCurrentDate = new Date(Date.now()) // get the current date, in the current time zone
		const formattedDate = getCurrentDate.toLocaleDateString('en-CA') // YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC
		const todayIncome = allIncome.filter(i => {
			const filteredIncome = new Date(i.createdAt).toLocaleDateString('en-CA') /* attention: using createdAt (could use dateIncome as an alternative) */
			return filteredIncome === formattedDate
		})

		/* return both all income (for AllIncomePage.jsx) and filtered income (used in the TodayIncomeContainerComponent.jsx in AddIncomePage.jsx) */
		return { data, todayIncome } /* must return something; this return will be available in the component, where that loader is used */
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return error
	}
}


// SET GLOBAL CONTEXT
const AllIncomeContext = createContext()
// SET CUSTOM HOOK
export const useAllIncomeContext = () => useContext(AllIncomeContext)


// ALL INCOME PAGE JSX COMPONENT
export const AllIncomePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderAllIncome" function (also, refer to App.jsx, "all-income" path) */
	const { data } = useLoaderData() /* using the whole object, without destructuring */

	/* wrap the return with the global context */
	return (
		<AllIncomeContext.Provider value={{ data }}>
			<SearchIncomeContainerComponent />
			<AllIncomeContainerComponent />
		</AllIncomeContext.Provider>
	)
}