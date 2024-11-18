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
import { AllIncomeContainerComponent } from '../../components/income_components/AllIncomeContainerComponent.jsx'
import { SearchIncomeContainerComponent } from '../../components/income_components/SearchIncomeContainerComponent.jsx'


// CREATE QUERY
const allIncomeQuery = (params) => {
	const { commentsIncome, typeIncome, categoryIncome, startDate, endDate, sort, page } = params
	return {
		queryKey: ["allIncomeQuery", commentsIncome ?? "", typeIncome ?? "all", categoryIncome ?? "all", sort ?? "newest", page ?? 1, startDate ?? "", endDate ?? ""],
		queryFn: async () => {
			/* get all of the data */
			const { data } = await customFetch.get('/income', { params }) /* get the entire object from API, and search params from URL */
			const { allIncome } = data /* destructure income from the data */

			/* filter today's income from allIncome */
			const getCurrentDate = new Date(Date.now()) /* get the current date, in the current time zone */
			const formattedDate = getCurrentDate.toLocaleDateString('en-CA') /* YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC */
			const todayIncome = allIncome.filter(i => {
				const filteredIncome = new Date(i.createdAt).toLocaleDateString('en-CA') /* attention: using createdAt (could use dateExpense as an alternative) */
				return filteredIncome === formattedDate
			})
			return { data, todayIncome }
		}
	}
}


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "all-income" path */
export const loaderAllIncome = (queryClient) => async ({ request }) => {

	/* construct params from URL */
	const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])

	/* return the data using query */
	const queryData = await queryClient.ensureQueryData(allIncomeQuery(params))
	const { todayIncome } = queryData /* destructure todayExpenses from query data */
	return { todayIncome, searchValues: { ...params } }
}


// SET GLOBAL CONTEXT
const AllIncomeContext = createContext()
// SET CUSTOM HOOK
export const useAllIncomeContext = () => useContext(AllIncomeContext)


// ALL INCOME PAGE JSX COMPONENT
export const AllIncomePage = () => {
	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderAllIncome" function (also, refer to App.jsx, "all-income" path) */
	const { searchValues } = useLoaderData() /* using the whole object (data), without destructuring, and search params as default values */
	const { data } = useQuery(allIncomeQuery(searchValues)) /* coming from the query */

	/* wrap the return with the global context */
	return (
		<AllIncomeContext.Provider value={{ data, searchValues }}>
			<SearchIncomeContainerComponent />
			<AllIncomeContainerComponent />
		</AllIncomeContext.Provider>
	)
}