// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { ExpensesChartsContainer } from '../../components/charts_expenses_components/ExpensesChartsContainer.jsx'
import { ExpensesStatsContainer } from '../../components/charts_expenses_components/ExpensesStatsContainer.jsx'


// CREATE QUERY FUNCTION
const statsExpensesQuery = {
	queryKey: ["statsExpensesQuery"], /* the name of the query (use the same name when invalidating) */
	queryFn: async () => {
		const response = await customFetch.get('/expenses/stats') /* where to get the data from */
		return response.data /* axios returns an object which contains "data" */
	}
}


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "stats-expenses" (dashboard) path */
/* incorporated queryClient into the loader (a function that returns another function) */
export const loaderStatsExpenses = (queryClient) =>  async () => {
	const data = await queryClient.ensureQueryData(statsExpensesQuery)
	return data /* also could return null instead (the data is coming from the query, not from the loader) */
}


// STATS EXPENSES PAGE JSX COMPONENT
export const StatsExpensesPage = () => {

	/* get the data from react query, instead of the loader */
	const { data } = useQuery(statsExpensesQuery)
	const { countedExpensesTypes, overallAnnualExpensesArray } = data

	return (
		<>
			<ExpensesStatsContainer countedExpensesTypesProp={countedExpensesTypes} />
			{
				overallAnnualExpensesArray?.length > 1 && <ExpensesChartsContainer overallAnnualExpensesArrayProp={overallAnnualExpensesArray} />
			}
		</>
	)
}