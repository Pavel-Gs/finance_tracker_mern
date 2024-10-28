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
import { SubmitButtonComponent } from '../SubmitButtonComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../../styled_components/StyledDashboardFormPage.js'


// SEARCH EXPENSES CONTAINER JSX COMPONENT
export const SearchExpensesContainerComponent = () => {

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
			<Form className='form'>
				<h5 className='form-title'>
					Search form
				</h5>
				<div className='form-center'>
					<FormRowComponent typeProp='search' nameProp='commentsExpense' labelTextProp="Comments" defaultValueProp="N/A" />
					<FormRowSelectComponent nameProp='typeExpense' labelTextProp="Type" listProp={["all", ...Object.values(EXPENSES_TYPES)]} defaultValueProp="all" onChangeProp={handleTypeSelectionChange} />
					<FormRowSelectComponent nameProp='categoryExpense' labelTextProp="Category" listProp={["all", ...categoryList.map(i => EXPENSES_CATEGORIES[i])]} defaultValueProp="all" disabledProp={selectedType === ""} /> {/* only disable if type is not selected */}
					<FormRowComponent typeProp='date' nameProp='startDate' labelTextProp="Start date range" defaultValueProp={selectedDate} onChangeProp={handleDateSelectionChange} />
					<FormRowComponent typeProp='date' nameProp='endDate' labelTextProp="End date range" defaultValueProp={selectedDate} onChangeProp={handleDateSelectionChange} />
					<FormRowSelectComponent nameProp='sort' defaultValueProp='newest' listProp={Object.values(SORT_EXPENSES_BY)} />
					{/* temp */}
					{/* "formBtnProp" is used in SubmitButtonComponent as a boolean, therefore no need to provide a value: if it's present - the class will apply */}
					<SubmitButtonComponent formBtnProp />
				</div>
			</Form>
		</StyledDashboardFormPage>
	)
}