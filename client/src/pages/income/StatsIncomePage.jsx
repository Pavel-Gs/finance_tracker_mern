// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { IncomeChartsContainer } from '../../components/charts_income_components/IncomeChartsContainer.jsx'
import { IncomeStatsContainer } from '../../components/charts_income_components/IncomeStatsContainer.jsx'


// CREATE QUERY FUNCTION
const statsIncomeQuery = {
	queryKey: ['statsIncomeQuery'], /* the name of the query (use the same name when invalidating) */
	queryFn: async () => {
		const response = await customFetch.get('/income/stats') /* where to get the data from */
		return response.data /* axios returns an object which contains "data" */
	}
}


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "stats-income" (dashboard) path */
/* incorporated queryClient into the loader */
export const loaderStatsIncome = (queryClient) =>  async () => {
	const data = await queryClient.ensureQueryData(statsIncomeQuery)
	return data /* also could return null instead (the data is coming from the query, not from the loader) */
}


// STATS INCOME PAGE JSX COMPONENT
export const StatsIncomePage = () => {

	/* get the data from react query, instead of the loader */
	const { data } = useQuery(statsIncomeQuery)
	const { countedIncomeTypes, overallAnnualIncomeArray } = data

	return (
		<>
			<IncomeStatsContainer countedIncomeTypesProp={countedIncomeTypes} />
			{
				overallAnnualIncomeArray?.length > 1 && <IncomeChartsContainer overallAnnualIncomeArrayProp={overallAnnualIncomeArray} />
			}
		</>
	)
}