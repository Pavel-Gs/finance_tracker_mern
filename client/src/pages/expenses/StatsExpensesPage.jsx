// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { ExpensesChartsContainer } from '../../components/charts_expenses_components/ExpensesChartsContainer.jsx'
import { ExpensesStatsContainer } from '../../components/charts_expenses_components/ExpensesStatsContainer.jsx'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "stats-expenses" (dashboard) path */
export const loaderStatsExpenses = async () => {
	return null
	const response = await customFetch.get('/expenses/stats')
	return response.data
}


// STATS EXPENSES PAGE JSX COMPONENT
export const StatsExpensesPage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderStatsExpenses" function (also, refer to App.jsx, "stats-expenses" path) */
	//const { countedExpensesTypes, overallAnnualExpensesArray } = useLoaderData()

	/* refactored: get the data from react query, instead of the loader */
	const { isLoading, isError, data } = useQuery({
		queryKey: ['statsExpensesQuery'], /* the name of the query (use the same name when invalidating) */
		queryFn: () => customFetch.get('/expenses/stats') /* where to get the data from */
	})
	if (isLoading) return <h4>Loading...</h4> /* useQuery returns the "data" object which contains "isLoading" */
	if (isError) return <h4>Error...</h4> /* useQuery returns the "data" object which contains "isError" */
	const { countedExpensesTypes, overallAnnualExpensesArray } = data.data /* useQuery returns the "data" object which contains another "data" */

	return (
		<>
			<ExpensesStatsContainer countedExpensesTypesProp={countedExpensesTypes} />
			{
				overallAnnualExpensesArray?.length > 1 && <ExpensesChartsContainer overallAnnualExpensesArrayProp={overallAnnualExpensesArray} />
			}
		</>
	)
}