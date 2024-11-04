// IMPORT ROUTER COMPONENTS
import { useLoaderData } from 'react-router-dom'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { IncomeChartsContainer } from '../../components/charts_income_components/IncomeChartsContainer.jsx'
import { IncomeStatsContainer } from '../../components/charts_income_components/IncomeStatsContainer.jsx'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "stats-income" (dashboard) path */
export const loaderStatsIncome = async () => {
	try {
		const response = await customFetch.get('/income/stats')
		return response.data
	} catch (error) {
		return error
	}
}


// STATS INCOME PAGE JSX COMPONENT
export const StatsIncomePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderStatsIncome" function (also, refer to App.jsx, "stats-income" path) */
	const { countedIncomeTypes, currentAnnualIncomeArray } = useLoaderData()

	return (
		<>
			<IncomeStatsContainer countedIncomeTypesProp={countedIncomeTypes} />
			{
				currentAnnualIncomeArray?.length > 1 && <IncomeChartsContainer currentAnnualIncomeArrayProp={currentAnnualIncomeArray} />
			}
		</>
	)
}