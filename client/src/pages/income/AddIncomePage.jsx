// IMPORT HOOKS
import { useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, redirect, useNavigation, useOutletContext, useLoaderData } from 'react-router-dom'
// IMPORT CONSTANTS
import { INCOME_TYPES, INCOME_CATEGORIES, TYPE_TO_CATEGORIES } from '../../../../utils/constantsIncome.js'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../../components/FormRowComponent.jsx'
import { FormRowSelectComponent } from '../../components/FormRowSelectComponent.jsx'
import { TodayIncomeContainerComponent } from '../../components/income_components/TodayIncomeContainerComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// ADD INCOME ACTION FUNCTION
/* used in App.jsx "add-income" route action */
export const actionAddIncome = async ({ request }) => {

	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const incomeData = Object.fromEntries(inputData)

	/* post new data using income form inputs */
	try {
		await customFetch.post('/income', incomeData)
		toast.success("Income added")
		return redirect('/dashboard/all-income') /* it must return something; redirects a user to all-income page after submission */
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return error /* it must return something */
	}
}


// ADD INCOME PAGE JSX COMPONENT
export const AddIncomePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the filtered return from the "loaderAllIncome" function (also, refer to App.jsx, "dashboard" index path (add income)) */
	const { todayIncome } = useLoaderData() /* filtered income (passed into TodayIncomeContainerComponent.jsx) */

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
	const [selectedDate, setSelectedDate] = useState(formattedDate) /* state for the date's picker, defaults to today's date */
	const handleDateSelectionChange = (e) => {
		setSelectedDate(e.target.value)
	}

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<h4 className='form-title'>
					Add Income
				</h4>
				<div className="form-center">
					<FormRowComponent typeProp='number' nameProp='amountIncome' labelTextProp="Amount" />
					<FormRowSelectComponent nameProp='typeIncome' labelTextProp="Type" listProp={Object.values(INCOME_TYPES)} onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryIncome' labelTextProp="Category" listProp={categoryList.map(i => INCOME_CATEGORIES[i])} disabledProp={selectedType === ""} />
					<FormRowComponent typeProp='text' nameProp='commentsIncome' labelTextProp="Comments" defaultValueProp={"N/A"} />
					<FormRowComponent typeProp='text' nameProp='locationIncome' labelTextProp="Location" defaultValueProp={currentUser.locationUser} />
					<FormRowComponent typeProp='date' nameProp='dateIncome' labelTextProp="Date" defaultValueProp={selectedDate} onChangeProp={handleDateSelectionChange} />
					<button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</Form>

			{/* passing filtered today's income as a prop */}
			<TodayIncomeContainerComponent todayIncomeProp = {todayIncome} />

		</StyledDashboardFormPage>
	)
}