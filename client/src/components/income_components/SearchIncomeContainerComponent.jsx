// IMPORT REACT HOOKS
import { useState, useEffect } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, useSubmit } from 'react-router-dom'
// IMPORT CUSTOM HOOK
import { useAllIncomeContext } from '../../pages/income/AllIncomePage.jsx'
// IMPORT MODEL CONSTANTS
import { INCOME_TYPES, INCOME_CATEGORIES, TYPE_TO_CATEGORIES, SORT_INCOME_BY } from '../../../../utils/constantsIncome.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../FormRowComponent.jsx'
import { FormRowSelectComponent } from '../FormRowSelectComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// SEARCH INCOME CONTAINER JSX COMPONENT
export const SearchIncomeContainerComponent = () => {

	/* use data from the context */
	const { searchValues } = useAllIncomeContext()
	const { commentsIncome, typeIncome, categoryIncome, startDate, endDate, sort } = searchValues /* used as default values, so they stay after page refresh */

	/* invoke useSubmit hook */
	const submit = useSubmit()

	/* logic to render categories according to selected type */
	const [selectedType, setSelectedType] = useState(typeIncome || "") /* state to track the type selection */
	const [categoryList, setCategoryList] = useState(TYPE_TO_CATEGORIES[typeIncome] || []) /* state for category list based on type */

	useEffect(() => {
		setSelectedType(typeIncome || "")
		setCategoryList(TYPE_TO_CATEGORIES[typeIncome] || [])
	}, [typeIncome]) /* handle updates correctly when typeIncome changes; add a useEffect to ensure that changes in typeIncome from context are reflected in the state. This is especially helpful if React Query causes asynchronous updates */

	const handleTypeSelectionChange = (e) => {
		const selectedValue = e.target.value
		setSelectedType(selectedValue) /* update selected type; and dropdown select logic (prevents the category selection before the type is selected) */
		setCategoryList(TYPE_TO_CATEGORIES[selectedValue] || []) /* set corresponding categories for the selected type */
		/* reset category to "all" when selecting another type */
		e.currentTarget.form.categoryIncome.value = "all"
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

	if (!searchValues) return <p>Loading search form...</p>

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form'>
				<h5 className='form-title'>
					Search form
				</h5>
				<div className='form-center'>
					<FormRowComponent typeProp='search' nameProp='commentsIncome' labelTextProp="Comments" defaultValueProp={commentsIncome} onChangeProp={debounce((form) => {submit(form)})} />
					<FormRowSelectComponent nameProp='typeIncome' labelTextProp="Type" listProp={["all", ...Object.values(INCOME_TYPES)]} defaultValueProp={typeIncome} onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryIncome' labelTextProp="Category" listProp={["all", ...categoryList.map(i => INCOME_CATEGORIES[i])]} defaultValueProp={categoryIncome} disabledProp={!selectedType && categoryList.length === 0} onChangeProp={(e) => {submit(e.currentTarget.form)}} /> {/* only disable if type is not selected or there are no categories */}
					<FormRowComponent typeProp='date' nameProp='startDate' labelTextProp="Start date range" defaultValueProp={startDate} onChangeProp={handleDateSelectionChange} />
					<FormRowComponent typeProp='date' nameProp='endDate' labelTextProp="End date range" defaultValueProp={endDate} onChangeProp={handleDateSelectionChange} />
					<FormRowSelectComponent nameProp='sort' listProp={Object.values(SORT_INCOME_BY)} defaultValueProp={sort} onChangeProp={(e) => {submit(e.currentTarget.form)}} />
				</div>
				{error && <p className='error'>{error}</p>} {/* display error message if any */}
			</Form>
		</StyledDashboardFormPage>
	)
}