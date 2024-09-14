// IMPORT ROUTER COMPONENTS
import { Link, Form, redirect, useNavigation } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT JSX COMPONENTS
import { LogoComponent } from '../components/LogoComponent.jsx'
import { FormRowComponent } from '../components/FormRowComponent.jsx'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT STYLED COMPONENTS
import { StyledRegisterAndLoginPage } from '../styled_components/StyledRegisterAndLoginPage.js'


// REGISTER ACTION FUNCTION
/* used in App.jsx "register" route action */
export const actionRegister = async ({ request }) => {

	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const registerData = Object.fromEntries(inputData)

	/* fetch the data from register form inputs */
	try {
		await customFetch.post('/auth/register', registerData)
		toast.success("Registration successful") /* display a toast */
		return redirect('/login') /* it must return something; redirects a user to login page after registration */

	/* catch the error if fetch fails */
	} catch (error) {
		toast.error(error?.response?.data?.message) /* display a toast */
		return error /* it must return something */
	}
}


// REGISTER PAGE JSX COMPONENT
export const RegisterPage = () => {

	/* use navigation state (for buttons and submissions) */
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	return (
		<StyledRegisterAndLoginPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<LogoComponent />
				<h4>
					Register
				</h4>
				<FormRowComponent typeProp='text' nameProp="firstName" defaultValueProp="John" />
				<FormRowComponent typeProp='text' nameProp='lastName' labelTextProp="Last Name" defaultValueProp="Smith" />
				<FormRowComponent typeProp='text' nameProp="locationUser" defaultValueProp="Earth" />
				<FormRowComponent typeProp='email' nameProp="emailUser" defaultValueProp="john@gmail.com" />
				<FormRowComponent typeProp='password' nameProp="passwordUser" defaultValueProp="secret123" />
				<button className='btn btn-block' type='submit' disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
				<p>
					Already a member?
					<Link className='member-btn' to='/login'>
						Login
					</Link>
				</p>
			</Form>

		</StyledRegisterAndLoginPage>
	)
}
