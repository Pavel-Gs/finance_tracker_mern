// IMPORT ROUTER COMPONENTS
import { redirect } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'


// DELETE INCOME ACTION FUNCTION
/* used in App.jsx "delete/income:id" route action */
export const actionDeleteIncome = async ({ params }) => {
	try {
		await customFetch.delete(`/income/${params.id}`)
		toast.success("Income deleted") /* the default position is set in App.jsx */
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
	return redirect('/dashboard/all-income')
}


// DELETE INCOME PAGE JSX COMPONENT
/* there is no need to display anything in this component */
/* export const DeleteIncomePage = () => {
	return (
		<div>DeleteIncomePage</div>
	)
} */