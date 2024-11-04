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
export const NavbarComponent = () => {

	/* use global context data */
	const { toggleSidebar, currentMonthlyExpensesSum, currentAnnualExpensesSum, currentMonthlyIncomeSum, currentAnnualIncomeSum } = useDashboardContext()

	// Format with a thousand separator
	const formattedCurrentMonthlyExpensesSum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthlyExpensesSum)
	const formattedCurrentMonthlyIncomeSum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthlyIncomeSum)
	const currentMonthlySavings = currentMonthlyIncomeSum - currentMonthlyExpensesSum
	const formattedCurrentMonthlySavings = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMonthlySavings)
	const formattedCurrentAnnualExpensesSum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentAnnualExpensesSum)
	const formattedCurrentAnnualIncomeSum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentAnnualIncomeSum)
	const currentAnnualSavings = currentAnnualIncomeSum - currentAnnualExpensesSum
	const formattedCurrentAnnualSavings = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentAnnualSavings)

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
							<p>+ {formattedCurrentMonthlyIncomeSum}</p>
							<p>- {formattedCurrentMonthlyExpensesSum}</p>
							<p>= {formattedCurrentMonthlySavings}</p>
						</div>
						<div className='dashboard-stats'>
							<h6>Current year:</h6>
							<p>+ {formattedCurrentAnnualIncomeSum}</p>
							<p>- {formattedCurrentAnnualExpensesSum}</p>
							<p>= {formattedCurrentAnnualSavings}</p>
						</div>
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
