// IMPORT JSX COMPONENTS
import { BarChartComponent } from '../BarChartComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledBarChartComponent } from '../../styled_components/StyledBarChartComponent.js'


// EXPENSES CHARTS JSX COMPONENT
/* props are coming from StatsExpensesPage.jsx */
export const ExpensesChartsContainer = ({ currentAnnualExpensesProp }) => {
	return (
		<StyledBarChartComponent>
			<h4 style={{textAlign: 'left', textTransform: 'none'}}>
				Current annual expenses
			</h4>
			<BarChartComponent data={currentAnnualExpensesProp} />
		</StyledBarChartComponent>
	)
}