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
	const { toggleSidebar, currentMonthlyExpensesSum, currentAnnualExpensesSum, overallExpensesSum, currentMonthlyIncomeSum, currentAnnualIncomeSum, overallIncomeSum } = useDashboardContext()

	/* format data with a thousand separator */
	const formatCurrency = (a) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(a)
	}

	/* calculate savings */
	const currentMonthlySavings = currentMonthlyIncomeSum - currentMonthlyExpensesSum
	const currentAnnualSavings = currentAnnualIncomeSum - currentAnnualExpensesSum
	const overallSavings = overallIncomeSum - overallExpensesSum

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
							<p>+ {formatCurrency(currentMonthlyIncomeSum)}</p>
                            <p>- {formatCurrency(currentMonthlyExpensesSum)}</p>
                            <p>= {formatCurrency(currentMonthlySavings)}</p>
						</div>
						<div className='dashboard-stats'>
							<h6>Current year:</h6>
							<p>+ {formatCurrency(currentAnnualIncomeSum)}</p>
                            <p>- {formatCurrency(currentAnnualExpensesSum)}</p>
                            <p>= {formatCurrency(currentAnnualSavings)}</p>
						</div>
						<div className='dashboard-stats'>
							<h6>Overall:</h6>
							<p>+ {formatCurrency(overallIncomeSum)}</p>
                            <p>- {formatCurrency(overallExpensesSum)}</p>
                            <p>= {formatCurrency(overallSavings)}</p>
						</div>
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
