// IMPORT REACT HOOKS
import { useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, redirect, useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT CONSTANTS
import { EXPENSES_TYPES, EXPENSES_CATEGORIES, TYPE_TO_CATEGORIES } from '../../../../utils/constantsExpenses.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../../components/FormRowComponent.jsx'
import { FormRowSelectComponent } from '../../components/FormRowSelectComponent.jsx'
import { SubmitButtonComponent } from '../../components/SubmitButtonComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "edit-expense" path */
export const loaderEditExpense = async ({ params }) => {
	try {
		const { data } = await customFetch.get(`/expenses/${params.id}`)
		return data
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return redirect('/dashboard/all-expenses')
	}
}


// EDIT EXPENSE ACTION FUNCTION
/* used in App.jsx "edit-expense/:id" route action */
export const actionEditExpense = async ({request, params}) => {
	
	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const expenseData = Object.fromEntries(inputData)

	/* patch the existing data using expense form inputs */
	try {
		await customFetch.patch(`/expenses/${params.id}`, expenseData)
		toast.success("Expense edited", { position: "bottom-left" }) /* display a toast */
		return redirect('/dashboard/all-expenses') /* it must return something; redirects a user to all-expenses page after submission */
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return error /* it must return something */
	}
}


// EDIT EXPENSE PAGE JSX COMPONENT
export const EditExpensePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderEditExpense" function (also, refer to App.jsx, "edit-expense" path) */
	const { singleExpense } = useLoaderData()

	/* logic to render categories according to selected type */
	const [selectedType, setSelectedType] = useState(singleExpense?.typeExpense || '') /* state to track the type selection (pre-select the type when editing) */
	const [categoryList, setCategoryList] = useState(TYPE_TO_CATEGORIES[singleExpense?.typeExpense] || []) /* state for category list based on type (pre-load categories based on existing expense type) */
	const handleTypeSelectionChange = (e) => {
		const selectedValue = e.target.value
		setSelectedType(selectedValue) /* update selected type; and dropdown select logic (prevents the category selection before the type is selected) */
		setCategoryList(TYPE_TO_CATEGORIES[selectedValue] || []) /* set corresponding categories for the selected type */
	}

	/* date picker logic */
	const getCurrentDate = new Date(Date.now()) // get the current date, in the current time zone
	const formattedDate = getCurrentDate.toLocaleDateString('en-CA') // YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC
	const dateFromDatabase = singleExpense.dateExpense.split('T')[0] // get the date from the database, in the format yyy-mm-dd
	const [selectedDate, setSelectedDate] = useState(dateFromDatabase || formattedDate) /* state for the date's picker, defaults to the existing date (or today's date) */
	const handleDateSelectionChange = (e) => {
		setSelectedDate(e.target.value)
	}

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<h4 className='form-title'>
					Edit Expense
				</h4>
				<div className='form-center'>
					<FormRowComponent typeProp='number' nameProp='amountExpense' labelTextProp="Amount" defaultValueProp={singleExpense.amountExpense} />
					<FormRowSelectComponent nameProp='typeExpense' labelTextProp="Type" defaultValueProp={selectedType} listProp={Object.values(EXPENSES_TYPES)} onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryExpense' labelTextProp="Category" defaultValueProp={singleExpense.categoryExpense} listProp={categoryList.map(i => EXPENSES_CATEGORIES[i])} disabledProp={selectedType === ""} /> {/* only disable if type is not selected */}
					<FormRowComponent typeProp='text' nameProp='commentsExpense' labelTextProp="Comments" defaultValueProp={singleExpense.commentsExpense} />
					<FormRowComponent typeProp='text' nameProp='locationExpense' labelTextProp="Location" defaultValueProp={singleExpense.locationExpense} />
					<FormRowComponent typeProp='date' nameProp='dateExpense' labelTextProp="Date" defaultValueProp={selectedDate} onChangeProp={handleDateSelectionChange} />
					{/* "formBtnProp" is used in SubmitButtonComponent as a boolean, therefore no need to provide a value: if it's present - the class will apply */}
					<SubmitButtonComponent formBtnProp />
				</div>
			</Form>

		</StyledDashboardFormPage>
	)
}