// IMPORT REACT HOOKS
import { useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, useSubmit } from 'react-router-dom'
// IMPORT CUSTOM HOOK
import { useAllExpensesContext } from '../../pages/expenses/AllExpensesPage.jsx'
// IMPORT MODEL CONSTANTS
import { EXPENSES_TYPES, EXPENSES_CATEGORIES, TYPE_TO_CATEGORIES, SORT_EXPENSES_BY } from '../../../../utils/constantsExpenses.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../FormRowComponent.jsx'
import { FormRowSelectComponent } from '../FormRowSelectComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// SEARCH EXPENSES CONTAINER JSX COMPONENT
export const SearchExpensesContainerComponent = () => {

	/* use data from the context */
	const { searchValues } = useAllExpensesContext()
	const { commentsExpense, typeExpense, categoryExpense, startDate, endDate, sort } = searchValues /* used as default values, so they stay after page refresh */

	/* invoke useSubmit hook */
	const submit = useSubmit()

	/* logic to render categories according to selected type */
	const [selectedType, setSelectedType] = useState('') /* state to track the type selection */
	const [categoryList, setCategoryList] = useState([]) /* state for category list based on type */
	const handleTypeSelectionChange = (e) => {
		const selectedValue = e.target.value
		setSelectedType(selectedValue) /* update selected type; and dropdown select logic (prevents the category selection before the type is selected) */
		setCategoryList(TYPE_TO_CATEGORIES[selectedValue] || []) /* set corresponding categories for the selected type */
		/* reset category to "all" when selecting another type */
		e.currentTarget.form.categoryExpense.value = "all"
		submit(e.currentTarget.form) /* submit the form automatically on change, and apply the selected search parameters */
	}

	/* date picker logic */
	const getCurrentDate = new Date(Date.now()) /* get the current date, in the current time zone */
	const formattedDate = getCurrentDate.toLocaleDateString('en-CA') /* YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC */
	const [selectedDate, setSelectedDate] = useState(formattedDate) /* state for the date's picker, defaults to today's date */
	const [error, setError] = useState('') /* state to track validation error */
	const handleDateSelectionChange = (e) => {
		const { name, value } = e.target
		if (name === 'startDate') {
			if (new Date(value) > new Date(endDate)) {
				setError('Start date cannot be after end date')
				return
			}
			setSelectedDate(value)
		} else if (name === 'endDate') {
			if (new Date(value) < new Date(startDate)) {
				setError('End date cannot be before start date')
				return
			}
			setSelectedDate(value)
		}
		setError('') /* clear error if validation passes */
		submit(e.currentTarget.form) /* submit the form automatically on change, and apply the selected search parameters */
	}

	/* debounce logic (set timeout to user's input submit) */
	const debounce = (onChange) => {
		let timeout
		return (e) => {
			const form = e.currentTarget.form
			clearTimeout(timeout) /* reset timeout after each keystroke */
			timeout = setTimeout(() => {
				onChange(form)
			}, 1000) /* only submit the form after the timeout */
		}
	}

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form'>
				<h5 className='form-title'>
					Search form
				</h5>
				<div className='form-center'>
					<FormRowComponent typeProp='search' nameProp='commentsExpense' labelTextProp="Comments" defaultValueProp={commentsExpense} onChangeProp={debounce((form) => {submit(form)})} />
					<FormRowSelectComponent nameProp='typeExpense' labelTextProp="Type" listProp={["all", ...Object.values(EXPENSES_TYPES)]} defaultValueProp={typeExpense} onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryExpense' labelTextProp="Category" listProp={["all", ...categoryList.map(i => EXPENSES_CATEGORIES[i])]} defaultValueProp={categoryExpense} disabledProp={selectedType === ""} onChangeProp={(e) => {submit(e.currentTarget.form)}} /> {/* only disable if type is not selected */}
					<FormRowComponent typeProp='date' nameProp='startDate' labelTextProp="Start date range" defaultValueProp={startDate} onChangeProp={handleDateSelectionChange} />
					<FormRowComponent typeProp='date' nameProp='endDate' labelTextProp="End date range" defaultValueProp={endDate} onChangeProp={handleDateSelectionChange} />
					<FormRowSelectComponent nameProp='sort' listProp={Object.values(SORT_EXPENSES_BY)} defaultValueProp={sort} onChangeProp={(e) => {submit(e.currentTarget.form)}} />
				</div>
				{error && <p className='error'>{error}</p>} {/* display error message if any */}
			</Form>
		</StyledDashboardFormPage>
	)
}