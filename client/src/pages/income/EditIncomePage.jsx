// IMPORT REACT HOOKS
import { useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, redirect, useLoaderData } from 'react-router-dom'
// IMPORT REACT QUERY COMPONENTS
import { useQuery } from '@tanstack/react-query'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../../utils/customFetch.js'
// IMPORT CONSTANTS
import { INCOME_TYPES, INCOME_CATEGORIES, TYPE_TO_CATEGORIES } from '../../../../utils/constantsIncome.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../../components/FormRowComponent.jsx'
import { FormRowSelectComponent } from '../../components/FormRowSelectComponent.jsx'
import { SubmitButtonComponent } from '../../components/SubmitButtonComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// SET UP A QUERY
const singleIncomeQuery = (id) => {
	return {
		queryKey: ["singleIncomeQuery", id],
		queryFn: async () => {
			const { data } = await customFetch.get(`/income/${id}`)
			return data
		}
	}
}


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "edit-income" path */
export const loaderEditIncome = (queryClient) => async ({ params }) => {
	try {
		await queryClient.ensureQueryData(singleIncomeQuery(params.id))
		return params.id
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return redirect('/dashboard/all-income')
	}
}


// EDIT INCOME ACTION FUNCTION
/* used in App.jsx "edit-income/:id" route action */
export const actionEditIncome = (queryClient) => async ({request, params}) => {
	
	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const incomeData = Object.fromEntries(inputData)

	/* patch the existing data using income form inputs */
	try {
		await customFetch.patch(`/income/${params.id}`, incomeData)
		queryClient.invalidateQueries(["allIncomeQuery"])
		toast.success("Income edited") /* the default position is set in App.jsx */
		return redirect('/dashboard/all-income') /* it must return something; redirects a user to all-income page after submission */
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return error /* it must return something */
	}
}


// EDIT INCOME PAGE JSX COMPONENT
export const EditIncomePage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderEditIncome" function (also, refer to App.jsx, "edit-income" path) */
	const id = useLoaderData()
	const {data: {singleIncome}} = useQuery(singleIncomeQuery(id))

	/* logic to render categories according to selected type */
	const [selectedType, setSelectedType] = useState(singleIncome?.typeIncome || '') /* state to track the type selection (pre-select the type when editing) */
	const [categoryList, setCategoryList] = useState(TYPE_TO_CATEGORIES[singleIncome?.typeIncome] || []) /* state for category list based on type (pre-load categories based on existing expense type) */
	const handleTypeSelectionChange = (e) => {
		const selectedValue = e.target.value
		setSelectedType(selectedValue) /* update selected type; and dropdown select logic (prevents the category selection before the type is selected) */
		setCategoryList(TYPE_TO_CATEGORIES[selectedValue] || []) /* set corresponding categories for the selected type */
	}

	/* date picker logic */
	const getCurrentDate = new Date(Date.now()) // get the current date, in the current time zone
	const formattedDate = getCurrentDate.toLocaleDateString('en-CA') // YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC
	const dateFromDatabase = singleIncome.dateIncome.split('T')[0] // get the date from the database, in the format yyy-mm-dd
	const [selectedDate, setSelectedDate] = useState(dateFromDatabase || formattedDate) /* state for the date's picker, defaults to the existing date (or today's date) */
	const handleDateSelectionChange = (e) => {
		setSelectedDate(e.target.value)
	}

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<h4 className='form-title'>
					Edit Income
				</h4>
				<div className='form-center'>
					<FormRowComponent typeProp='number' nameProp='amountIncome' labelTextProp="Amount" defaultValueProp={singleIncome.amountIncome} />
					<FormRowSelectComponent nameProp='typeIncome' labelTextProp="Type" defaultValueProp={selectedType} listProp={Object.values(INCOME_TYPES)} onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryIncome' labelTextProp="Category" defaultValueProp={singleIncome.categoryIncome} listProp={categoryList.map(i => INCOME_CATEGORIES[i])} disabledProp={selectedType === ""} />
					<FormRowComponent typeProp='text' nameProp='commentsIncome' labelTextProp="Comments" defaultValueProp={singleIncome.commentsIncome} />
					<FormRowComponent typeProp='text' nameProp='locationIncome' labelTextProp="Location" defaultValueProp={singleIncome.locationIncome} />
					<FormRowComponent typeProp='date' nameProp='dateIncome' labelTextProp="Date" defaultValueProp={selectedDate} onChangeProp={handleDateSelectionChange} />
					{/* "formBtnProp" is used in SubmitButtonComponent as a boolean, therefore no need to provide a value: if it's present - the class will apply */}
					<SubmitButtonComponent formBtnProp />
				</div>
			</Form>

		</StyledDashboardFormPage>
	)
}