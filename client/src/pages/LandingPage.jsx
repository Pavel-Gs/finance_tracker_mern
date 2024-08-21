// IMPORT ROUTER COMPONENTS
import { Link } from 'react-router-dom'
// IMPORT CUSTOM JSX COMPONENTS
import { LogoComponent } from '../components/LogoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledLandingPage } from '../styled_components/StyledLandingPage.js'
// IMPORT IMAGES
import mainImg from '../assets/images/mainImg.svg'


// LANDING PAGE JSX COMPONENT
export const LandingPage = () => {
	return (
		<StyledLandingPage>
			<nav>
				<LogoComponent />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						$ <span>Tracking</span> app
					</h1>
					<p>
						OnBudget is an intuitive app designed to help you manage your finances effortlessly. It provides comprehensive tools for tracking your budget and expenses, offering detailed monthly and yearly statistics to give you a clear view of your financial health. With Finance Tracker, you can easily enter and modify your expenses and income, making it simple to stay on top of your financial goals and make informed decisions about your spending and saving.
					</p>
					<Link className='btn register-link' to='/register'>
						Register
					</Link>
					<Link className='btn' to='/login'>
						Login / Demo User
					</Link>
				</div>
				<img className='img main-img' src={mainImg} alt='finance tracker' />
			</div>
		</StyledLandingPage>
	)
}