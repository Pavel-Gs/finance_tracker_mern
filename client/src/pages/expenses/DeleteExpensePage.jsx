// IMPORT ROUTER COMPONENTS
import { redirect } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'


// DELETE EXPENSE ACTION FUNCTION
/* used in App.jsx "delete/expense:id" route action */
export const actionDeleteExpense = async ({ params }) => {
	try {
		await customFetch.delete(`/expenses/${params.id}`)
		toast.success("Expense deleted") /* the default position is set in App.jsx */
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
	return redirect('/dashboard/all-expenses')
}


// DELETE EXPENSE PAGE JSX COMPONENT
/* there is no need to display anything in this component */
/* export const DeleteExpensePage = () => {
	return (
		<div>DeleteExpensePage</div>
	)
} */