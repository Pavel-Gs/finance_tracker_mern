// IMPORT REACT FUNCTIONS
import { createContext, useContext } from 'react'
// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { AllExpensesContainerComponent } from '../../components/expenses_components/AllExpensesContainerComponent.jsx'
import { SearchExpensesContainerComponent } from '../../components/expenses_components/SearchExpensesContainerComponent.jsx'


// CREATE QUERY
const allExpensesQuery = (params) => {
	const { commentsExpense, typeExpense, categoryExpense, startDate, endDate, sort, page } = params
	return {
		queryKey: ["allExpensesQuery", commentsExpense ?? "", typeExpense ?? "all", categoryExpense ?? "all", sort ?? "newest", page ?? 1, startDate ?? "", endDate ?? ""],
		queryFn: async () => {
			/* get all of the data */
			const { data } = await customFetch.get('/expenses', { params }) /* get the entire object from API, and search params from URL */
			const { allExpenses } = data /* destructure expenses from the data */

			/* filter today's expenses from allExpenses */
			const getCurrentDate = new Date(Date.now()) /* get the current date, in the current time zone */
			const formattedDate = getCurrentDate.toLocaleDateString('en-CA') /* YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC */
			const todayExpenses = allExpenses.filter(i => {
				const filteredExpenses = new Date(i.createdAt).toLocaleDateString('en-CA') /* attention: using createdAt (could use dateExpense as an alternative) */
				return filteredExpenses === formattedDate
			})
			return { data, todayExpenses }
		}
	}
}


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "all-expenses" and "add-expense" (dashboard) path */
export const loaderAllExpenses = (queryClient) => async ({ request }) => {

	/* construct params from URL */
	const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])

	/* return the data using query */
	const queryData = await queryClient.ensureQueryData(allExpensesQuery(params))
	const { todayExpenses } = queryData /* destructure todayExpenses from query data */
	return { todayExpenses, searchValues: { ...params } }
}


// SET GLOBAL CONTEXT
const AllExpensesContext = createContext()
// SET CUSTOM HOOK
export const useAllExpensesContext = () => useContext(AllExpensesContext)


// ALL EXPENSES PAGE JSX COMPONENT
export const AllExpensesPage = () => {
	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderAllExpenses" function (also, refer to App.jsx, "all-expenses" path) */
	const { searchValues } = useLoaderData() /* using the whole object (data), without destructuring, and search params as default values */
	const { data } = useQuery(allExpensesQuery(searchValues)) /* coming from the query */

	/* wrap the return with the global context */
	return (
		<AllExpensesContext.Provider value={{ data, searchValues }}>
			<SearchExpensesContainerComponent />
			<AllExpensesContainerComponent />
		</AllExpensesContext.Provider>
	)
}