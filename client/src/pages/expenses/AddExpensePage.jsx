// IMPORT ROUTER COMPONENTS
import { Form, redirect, useNavigation, useOutletContext } from 'react-router-dom'
// IMPORT CONSTANTS
import { EXPENSES_TYPES, EXPENSES_CATEGORIES } from '../../../../utils/constantsExpenses.js'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../../components/FormRowComponent.jsx'
import { FormRowSelectComponent } from '../../components/FormRowSelectComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// ADD EXPENSE PAGE JSX COMPONENT
export const AddExpensePage = () => {

	/* get the user from the outlet context */
	const { currentUser } = useOutletContext()

	/* invoke useNavigation */
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<h4 className='form-title'>
					Add Expense
				</h4>
				<div className="form-center">
					<FormRowComponent typeProp='number' nameProp='amountExpense' labelTextProp="Amount" />
					<FormRowSelectComponent nameProp='typeExpense' labelTextProp="Type" defaultValueProp={EXPENSES_TYPES.MONTHLY} listProp={Object.values(EXPENSES_TYPES)} />
					<FormRowSelectComponent nameProp='categoryExpense' labelTextProp="Category" defaultValueProp={EXPENSES_CATEGORIES.RENT} listProp={Object.values(EXPENSES_CATEGORIES)} />
					<FormRowComponent typeProp='text' nameProp='commentExpense' labelTextProp="Comments" />
					<FormRowComponent typeProp='text' nameProp='locationExpense' labelTextProp="Location" defaultValueProp={currentUser.locationUser} />
					<button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</Form>

		</StyledDashboardFormPage>
	)
}