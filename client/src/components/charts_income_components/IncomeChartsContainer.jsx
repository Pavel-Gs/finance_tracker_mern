// IMPORT JSX COMPONENTS
import { BarChartComponent } from '../BarChartComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledBarChartComponent } from '../../styled_components/StyledBarChartComponent.js'


// INCOME CHARTS JSX COMPONENT
/* props are coming from StatsIncomePage.jsx */
export const IncomeChartsContainer = ({ currentAnnualIncomeProp }) => {
	return (
		<StyledBarChartComponent>
			<h4 style={{textAlign: 'left', textTransform: 'none'}}>
				Current annual income
			</h4>
			<BarChartComponent data={currentAnnualIncomeProp} />
		</StyledBarChartComponent>
	)
}