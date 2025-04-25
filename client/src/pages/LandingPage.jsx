// IMPORT ROUTER COMPONENTS
import { Link } from 'react-router-dom'
// IMPORT JSX COMPONENTS
import { LogoComponent } from '../components/LogoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledLandingPage } from '../styled_components/StyledLandingPage.js'


// LANDING PAGE JSX COMPONENT
export const LandingPage = () => {
	return (<StyledLandingPage>
		<div className='overlay'>
			<header className='nav'>
				<LogoComponent />
			</header>
			<main className='hero'>
				<h1>
					Take Charge of Your Money
				</h1>
				<p>
					Finance Tracker helps you stay accountable, stay organized, and stay ahead.
					Effortless budgeting, powerful insights — all in one place.
				</p>
				<div className='cta-buttons'>
					<Link to='/register' className='btn primary'>
						Create Free Account
					</Link>
					<Link to='/login' className='btn secondary'>
						Log In
					</Link>
				</div>
			</main>
			<footer>
				<p>© {new Date().getFullYear()} On Budget</p>
			</footer>
		</div>
	</StyledLandingPage>)
}
