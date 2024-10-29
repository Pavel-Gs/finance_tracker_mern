// IMPORT REACT FUNCTIONS
import { createContext, useContext } from 'react'
// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { AllExpensesContainerComponent } from '../../components/expenses_components/AllExpensesContainerComponent.jsx'
import { SearchExpensesContainerComponent } from '../../components/expenses_components/SearchExpensesContainerComponent.jsx'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "all-expenses" and "add-expense" (dashboard) path */
export const loaderAllExpenses = async ({ request }) => {

	/* construct params from URL */
	const params = Object.fromEntries([
		...new URL(request.url).searchParams.entries()
	])

	try {

		/* get all of the data */
		const { data } = await customFetch.get('/expenses', {params}) /* get the entire object from API, and search params from URL */
		const { allExpenses } = data /* destructure expenses from the data */

		/* filter today's expenses from allExpenses */
		const getCurrentDate = new Date(Date.now()) // get the current date, in the current time zone
		const formattedDate = getCurrentDate.toLocaleDateString('en-CA') // YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC
		const todayExpenses = allExpenses.filter(i => {
			const filteredExpenses = new Date(i.createdAt).toLocaleDateString('en-CA') /* attention: using createdAt (could use dateExpense as an alternative) */
			return filteredExpenses === formattedDate
		})

		/* return both all expenses (for AllExpensesPage.jsx) and filtered expenses (used in the TodayExpensesContainerComponent.jsx in AddExpensePage.jsx) */
		return { data, todayExpenses, searchValues: {...params} } /* must return something; this return will be available in the component, where that loader is used */
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return error
	}
}


// SET GLOBAL CONTEXT
const AllExpensesContext = createContext()
// SET CUSTOM HOOK
export const useAllExpensesContext = () => useContext(AllExpensesContext)


// ALL EXPENSES PAGE JSX COMPONENT
export const AllExpensesPage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderAllExpenses" function (also, refer to App.jsx, "all-expenses" path) */
	const { data, searchValues } = useLoaderData() /* using the whole object (data), without destructuring, and search params as default values */

	/* wrap the return with the global context */
	return (
		<AllExpensesContext.Provider value={{ data, searchValues }}>
			<SearchExpensesContainerComponent />
			<AllExpensesContainerComponent />
		</AllExpensesContext.Provider>
	)
}