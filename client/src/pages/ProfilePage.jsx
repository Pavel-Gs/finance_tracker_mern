// IMPORT ROUTER COMPONENTS
import { Form, redirect, useOutletContext } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT JSX COMPONENTS
import { FormRowComponent } from '../components/FormRowComponent.jsx'
import { SubmitButtonComponent } from '../components/SubmitButtonComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledDashboardFormPage } from '../styled_components/StyledDashboardFormPage.js'


// UPDATE USER ACTION FUNCTION
export const actionUpdateUser = async({request}) => {

	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const file = inputData.get('avatar')
	if (file && file.size > 512000) {
		toast.error('File is too big. Max 0.5 MB allowed.')
		return null
	}

	/* patch the existing data using profile form inputs */
	try {
		await customFetch.patch('/users/update-user', inputData)
		toast.success('Profile updated')
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
	return null
}


// PROFILE PAGE JSX COMPONENT
export const ProfilePage = () => {

	/* get the user from the outlet context */
	const { currentUser } = useOutletContext()
	const { firstName, lastName, emailUser, locationUser } = currentUser

	return (
		<StyledDashboardFormPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form method='post' encType='multipart/form-data' className='form'> {/* specify encType here, because we are sending an image (avatar image - a file) to the server as a form data (not as a JSON file) */}
				<h4 className='form-title'>
					Profile
				</h4>
				<div className='form-center'>
					<div className='form-row'>
						<label htmlFor='avatar' className='form-label'>
							Select an image file (max 0.5 MB)
						</label>
						<input type='file' id='avatar' name='avatar' accept='image/*' className='form-input' />
					</div>
					<FormRowComponent typeProp='text' nameProp='firstName' labelTextProp="First Name" defaultValueProp={firstName} />
					<FormRowComponent typeProp='text' nameProp='lastName' labelTextProp="Last Name" defaultValueProp={lastName} />
					<FormRowComponent typeProp='email' nameProp='emailUser' defaultValueProp={emailUser} />
					<FormRowComponent typeProp='text' nameProp='locationUser' defaultValueProp={locationUser} />
					{/* "formBtnProp" is used in SubmitButtonComponent as a boolean, therefore no need to provide a value: if it's present - the class will apply */}
					<SubmitButtonComponent formBtnProp />
				</div>

			</Form>

		</StyledDashboardFormPage>
	)
}