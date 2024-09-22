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


// CREATE A LOADER (FOR PREFETCHING THE DATA; USED IN APP.JSX, "ALL-INCOME" PATH)
export const loaderAllIncome = async () => {
	try {
		const { data } = await customFetch.get('/income')
		return { data } /* must return something; this return will be available in the component, where that loader is used */
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