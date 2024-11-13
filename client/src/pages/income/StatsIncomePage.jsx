// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { IncomeChartsContainer } from '../../components/charts_income_components/IncomeChartsContainer.jsx'
import { IncomeStatsContainer } from '../../components/charts_income_components/IncomeStatsContainer.jsx'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "stats-income" (dashboard) path */
export const loaderStatsIncome = async () => {
	return null
	const response = await customFetch.get('/income/stats')
	return response.data
}


// STATS INCOME PAGE JSX COMPONENT
export const StatsIncomePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderStatsIncome" function (also, refer to App.jsx, "stats-income" path) */
	//const { countedIncomeTypes, overallAnnualIncomeArray } = useLoaderData()

	/* refactored: get the data from react query, instead of the loader */
	const { isLoading, isError, data } = useQuery({
		queryKey: ['statsIncomeQuery'], /* the name of the query (use the same name when invalidating) */
		queryFn: () => customFetch.get('/income/stats') /* where to get the data from */
	})
	if (isLoading) return <h4>Loading...</h4> /* useQuery returns the "data" object which contains "isLoading" */
	if (isError) return <h4>Error...</h4> /* useQuery returns the "data" object which contains "isError" */
	const { countedIncomeTypes, overallAnnualIncomeArray } = data.data /* useQuery returns the "data" object which contains another "data" */

	return (
		<>
			<IncomeStatsContainer countedIncomeTypesProp={countedIncomeTypes} />
			{
				overallAnnualIncomeArray?.length > 1 && <IncomeChartsContainer overallAnnualIncomeArrayProp={overallAnnualIncomeArray} />
			}
		</>
	)
}