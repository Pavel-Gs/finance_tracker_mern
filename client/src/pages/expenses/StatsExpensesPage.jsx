// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { ExpensesChartsContainer } from '../../components/charts_expenses_components/ExpensesChartsContainer.jsx'
import { ExpensesStatsContainer } from '../../components/charts_expenses_components/ExpensesStatsContainer.jsx'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "stats-expenses" (dashboard) path */
export const loaderStatsExpenses = async () => {
	try {
		const response = await customFetch.get('/expenses/stats')
		return response.data
	} catch (error) {
		return error
	}
}


// STATS EXPENSES PAGE JSX COMPONENT
export const StatsExpensesPage = () => {
	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderStatsExpenses" function (also, refer to App.jsx, "stats-expenses" path) */
	const { defaultStats, monthlyExpenses } = useLoaderData()
	return (
		<>
			<ExpensesStatsContainer defaultStatsProp={defaultStats} />
			{
				monthlyExpenses?.length > 1 && <ExpensesChartsContainer monthlyExpensesProp={monthlyExpenses} />
			}
		</>
	)
}