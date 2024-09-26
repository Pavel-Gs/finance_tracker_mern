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


// CREATE A LOADER (FOR PREFETCHING THE DATA; USED IN APP.JSX, "ALL-EXPENSES" PATH)
export const loaderAllExpenses = async () => {
	try {
		const { data } = await customFetch.get('/expenses')
		return { data } /* must return something; this return will be available in the component, where that loader is used */
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
	const { data } = useLoaderData() /* using the whole object, without destructuring */

	/* wrap the return with the global context */
	return (
		<AllExpensesContext.Provider value={{ data }}>
			<SearchExpensesContainerComponent />
			<AllExpensesContainerComponent />
		</AllExpensesContext.Provider>
	)
}