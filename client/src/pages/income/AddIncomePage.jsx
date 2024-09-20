// IMPORT HOOKS
import { useState } from 'react'
// IMPORT ROUTER COMPONENTS
import { Form, redirect, useNavigation, useOutletContext } from 'react-router-dom'
// IMPORT CONSTANTS
import { INCOME_TYPES, INCOME_CATEGORIES, TYPE_TO_CATEGORIES } from '../../../../utils/constantsIncome.js'
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
export const AddIncomePage = () => {

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
					<FormRowComponent typeProp='text' nameProp='commentIncome' labelTextProp="Comments" />
					<FormRowComponent typeProp='text' nameProp='locationIncome' labelTextProp="Location" defaultValueProp={currentUser.locationUser} />
					<button className='btn btn-block form-btn' type='submit' disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</button>
				</div>
			</Form>

		</StyledDashboardFormPage>
	)
}