// IMPORT CUSTOM HOOKS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT REACT ICONS
import { FaAlignLeft } from 'react-icons/fa'
// IMPORT JSX COMPONENTS
import { LogoComponent } from './LogoComponent.jsx'
import { LogoutComponent } from './LogoutComponent.jsx'
import { ThemeToggleComponent } from './ThemeToggleComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledNavbarComponent } from '../styled_components/StyledNavbarComponent.js'


// NAVBAR JSX COMPONENT
/* props are coming from DashboardLayout.jsx, from the loader data */
export const NavbarComponent = () => {

	/* use global context data */
	const { toggleSidebar, currentMonthlyExpenses, currentMonthlyIncome } = useDashboardContext()

	// Format with a thousand separator
	const formattedCurrentMonthlyExpenses = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthlyExpenses)
	const formattedCurrentMonthlyIncome = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthlyIncome)
	const currentMonthlySavings = currentMonthlyIncome - currentMonthlyExpenses
	const formattedCurrentMonthlySavings = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthlySavings)

	return (
		<StyledNavbarComponent>
			<div className="nav-center">
				<button className='toggle-btn' type='button' onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>
				<div>
					<div className='dashboard-stats-container'>
						<LogoComponent />
						<div className='dashboard-stats-current'>
							<h6>Current month:</h6>
							<p>+ {formattedCurrentMonthlyIncome}</p>
							<p>- {formattedCurrentMonthlyExpenses}</p>
							<p>= {formattedCurrentMonthlySavings}</p>
						</div>
						{/* <div className='dashboard-stats'>
							<h6>Current year:</h6>
							<p>+ {formattedCurrentMonthlyIncome}</p>
							<p>- {formattedCurrentMonthlyExpenses}</p>
							<p>= {formattedCurrentMonthlySavings}</p>
						</div> */}
						{/* <div className='dashboard-stats'>
							<h6>All time:</h6>
							<p>+ {formattedCurrentMonthlyIncome}</p>
							<p>- {formattedCurrentMonthlyExpenses}</p>
							<p>= {formattedCurrentMonthlySavings}</p>
						</div> */}
					</div>
				</div>
				<div className="btn-container">
					<ThemeToggleComponent />
					<LogoutComponent />
				</div>
			</div>
		</StyledNavbarComponent>
	)
}
