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


// LOGIN ACTION FUNCTION
/* used in App.jsx "login" route action */
export const actionLogin = async({request}) => {

	/* "formData()" function is coming from JavaScript API */
	const inputData = await request.formData()
	const loginData = Object.fromEntries(inputData)
	
	/* post new data using login form inputs */
	try {
		await customFetch.post('/auth/login', loginData)
		toast.success("Login successful")
		return redirect('/dashboard')
	} catch (error) {
		toast.error(error?.response?.data?.message)
		return error
	}
}


// LOGIN PAGE JSX COMPONENT
export const LoginPage = () => {
	return (
		<StyledRegisterAndLoginPage>

			{/* this <Form> component is coming from react-router-dom */}
			<Form className='form' method='post'>
				<LogoComponent />
				<h4>
					Login
				</h4>
				<FormRowComponent typeProp='email' nameProp="emailUser" labelTextProp="Email" defaultValueProp="john@gmail.com" />
				<FormRowComponent typeProp='password' nameProp="passwordUser" labelTextProp="Password" defaultValueProp="secret123" />
				<SubmitButtonComponent />	
				<p>
					Not a member yet?
					<Link className='member-btn' to='/register'>
						Register
					</Link>
				</p>
			</Form>

		</StyledRegisterAndLoginPage>
	)
}
