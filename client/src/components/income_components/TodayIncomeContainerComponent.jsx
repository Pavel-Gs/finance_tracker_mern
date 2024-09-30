// IMPORT JSX COMPONENTS
import { SingleIncomeComponent } from './SingleIncomeComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// TODAY INCOME CONTAINER JSX COMPONENT
export const TodayIncomeContainerComponent = ({ todayIncomeProp }) => {

	/* if no income found */
	if (todayIncomeProp.length === 0) {
		return (
			<StyledTransactionsContainer>
				<h4 className='form-title'>
					No income for today...
				</h4>
			</StyledTransactionsContainer>
		)
	}

	return (
		<StyledTransactionsContainer>
			<h4 className='form-title'>
				Today's entries
			</h4>
			<div className='transactions'>
				{todayIncomeProp.map((i) => {
					return (
						<SingleIncomeComponent key={i._id} {...i} />
					)
				})}
			</div>
		</StyledTransactionsContainer>
	)
}