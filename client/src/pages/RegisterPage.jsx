// IMPORT ROUTER COMPONENTS
import { Link } from 'react-router-dom'
// IMPORT JSX COMPONENTS
import { LogoComponent } from '../components/LogoComponent.jsx'
import { FormRowComponent } from '../components/FormRowComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledRegisterAndLoginPage } from '../styled_components/StyledRegisterAndLoginPage.js'


// REGISTER PAGE JSX COMPONENT
export const RegisterPage = () => {
	return (
		<StyledRegisterAndLoginPage>
			<form className='form'>
				<LogoComponent />
				<h4>
					Register
				</h4>
				<FormRowComponent typeProp='text' nameProp="Name" defaultValueProp="john" />
				<FormRowComponent typeProp='text' nameProp='lastName' labelTextProp="Last Name" defaultValueProp="smith" />
				<FormRowComponent typeProp='text' nameProp="Location" defaultValueProp="earth" />
				<FormRowComponent typeProp='email' nameProp="email" defaultValueProp="john@gmail.com" />
				<FormRowComponent typeProp='password' nameProp="Password" defaultValueProp="secret123" />
				<button className='btn btn-block' type='submit'>
					Submit
				</button>
				<p>
					Already a member?
					<Link className='member-btn' to='/login'>
						Login
					</Link>
				</p>
			</form>
		</StyledRegisterAndLoginPage>
	)
}
