// IMPORT ROUTER COMPONENTS
import { Link, Form, redirect } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT JSX COMPONENTS
import { LogoComponent } from '../components/LogoComponent.jsx'
import { FormRowComponent } from '../components/FormRowComponent.jsx'
import { SubmitButtonComponent } from '../components/SubmitButtonComponent.jsx'
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
	return (
		<StyledRegisterAndLoginPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<LogoComponent />
				<h4>
					Register
				</h4>
				<FormRowComponent typeProp='text' nameProp="firstName" labelTextProp="First Name" defaultValueProp="John" />
				<FormRowComponent typeProp='text' nameProp='lastName' labelTextProp="Last Name" defaultValueProp="Smith" />
				<FormRowComponent typeProp='text' nameProp="locationUser" labelTextProp="Location" defaultValueProp="Earth" />
				<FormRowComponent typeProp='email' nameProp="emailUser" labelTextProp="Email" defaultValueProp="john@gmail.com" />
				<FormRowComponent typeProp='password' nameProp="passwordUser" labelTextProp="Password" defaultValueProp="secret123" />
				<SubmitButtonComponent />
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
