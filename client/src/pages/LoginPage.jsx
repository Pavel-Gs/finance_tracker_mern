// IMPORT ROUTER COMPONENTS
import { Link } from 'react-router-dom'
// IMPORT CUSTOM JSX COMPONENTS
import { LogoComponent } from '../components/LogoComponent.jsx'
import { FormRowComponent } from '../components/FormRowComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledRegisterAndLoginPage } from '../styled_components/StyledRegisterAndLoginPage.js'


// LOGIN PAGE JSX COMPONENT
export const LoginPage = () => {
	return (
		<StyledRegisterAndLoginPage>
			<form className='form'>
				<LogoComponent />
				<h4>
					Login
				</h4>
				<FormRowComponent typeProp='email' nameProp="Email" defaultValueProp="john@gmail.com" />
				<FormRowComponent typeProp='password' nameProp="Password" defaultValueProp="secret123" />
				<button className='btn btn-block' type='submit'>
					Submit
				</button>
				<button className='btn btn-block' type='button'>
					Explore the App
				</button>
				<p>
					Not a member yet?
					<Link className='member-btn' to='/register'>
						Register
					</Link>
				</p>
			</form>
		</StyledRegisterAndLoginPage>
	)
}
