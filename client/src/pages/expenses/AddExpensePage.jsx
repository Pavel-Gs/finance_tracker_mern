// IMPORT HOOKS
import { useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, redirect, useNavigation, useOutletContext, useLoaderData } from 'react-router-dom'
// IMPORT CONSTANTS
import { EXPENSES_TYPES, EXPENSES_CATEGORIES, TYPE_TO_CATEGORIES } from '../../../../utils/constantsExpenses.js'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../../components/FormRowComponent.jsx'
import { FormRowSelectComponent } from '../../components/FormRowSelectComponent.jsx'
import { TodayExpensesContainerComponent } from '../../components/expenses_components/TodayExpensesContainerComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// ADD EXPENSE ACTION FUNCTION
/* used in App.jsx dashboard's "index" route action (AddExpensePage is an index page for the dashboard) */
export const actionAddExpense = async ({ request }) => {

	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const expenseData = Object.fromEntries(inputData)

	/* fetch the data from expense form inputs */
	try {
		await customFetch.post('/expenses', expenseData)
		toast.success("Expense added") /* display a toast */
		return redirect('all-expenses') /* it must return something; redirects a user to all-expenses page after submission; note: "all-expenses", not "/all-expenses" */

		/* catch the error if fetch fails */
	} catch (error) {
		toast.error(error?.response?.data?.message) /* display a toast */
		return error /* it must return something */
	}
}


// ADD EXPENSE PAGE JSX COMPONENT
export const AddExpensePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the filtered return from the "loaderAllExpenses" function (also, refer to App.jsx, "dashboard" index path (add expense)) */
	const { todayExpenses } = useLoaderData() /* filtered expenses (passed into TodayExpensesContainerComponent.jsx) */

	/* get the user from the outlet context */
	const { currentUser } = useOutletContext()

	/* invoke useNavigation */
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	/* logic to render categories according to selected type */
	const [selectedType, setSelectedType] = useState('') /* state to track the type selection */
	const [categoryList, setCategoryList] = useState([]) /* state for category list based on type */
	const handleTypeSelectionChange = (e) => {
		const selectedValue = e.target.value
		setSelectedType(selectedValue) /* update selected type; and dropdown select logic (prevents the category selection before the type is selected) */
		setCategoryList(TYPE_TO_CATEGORIES[selectedValue] || []) /* set corresponding categories for the selected type */
	}

	/* date picker logic */
	const getCurrentDate = new Date(Date.now()) // get the current date, in the current time zone
	const formattedDate = getCurrentDate.toLocaleDateString('en-CA') // YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC
	const [dateExpense, setDateExpense] = useState(formattedDate) /* state for the date's picker, defaults to today's date */
	const handleDateSelectionChange = (e) => {
		setDateExpense(e.target.value)
	}

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<h4 className='form-title'>
					Add Expense
				</h4>
				<div className="form-center">
					<FormRowComponent typeProp='number' nameProp='amountExpense' labelTextProp="Amount" />
					<FormRowSelectComponent nameProp='typeExpense' labelTextProp="Type" listProp={Object.values(EXPENSES_TYPES)} onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryExpense' labelTextProp="Category" listProp={categoryList.map(i => EXPENSES_CATEGORIES[i])} disabledProp={selectedType === ""} />
					<FormRowComponent typeProp='text' nameProp='commentsExpense' labelTextProp="Comments" defaultValueProp={"N/A"} />
					<FormRowComponent typeProp='text' nameProp='locationExpense' labelTextProp="Location" defaultValueProp={currentUser.locationUser} />
					<FormRowComponent typeProp='date' nameProp='dateExpense' labelTextProp="Date" defaultValueProp={dateExpense} onChangeProp={handleDateSelectionChange} />
					<button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</Form>

			{/* passing filtered today's expenses as a prop */}
			<TodayExpensesContainerComponent todayExpensesProp = {todayExpenses} />

		</StyledDashboardFormPage>
	)
}