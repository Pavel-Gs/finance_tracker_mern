// IMPORT JSX COMPONENTS
import { BarChartComponent } from '../BarChartComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledBarChartComponent } from '../../styled_components/StyledBarChartComponent.js'


// EXPENSES CHARTS JSX COMPONENT
/* props are coming from StatsExpensesPage.jsx */
export const ExpensesChartsContainer = ({ overallAnnualExpensesArrayProp }) => {
	return (
		<StyledBarChartComponent>
			<h4 style={{textAlign: 'left', textTransform: 'none'}}>
				Overall expenses per year
			</h4>
			<BarChartComponent data={overallAnnualExpensesArrayProp} />
		</StyledBarChartComponent>
	)
}