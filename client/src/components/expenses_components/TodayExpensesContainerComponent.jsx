// IMPORT JSX COMPONENTS
import { SingleExpenseComponent } from './SingleExpenseComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// TODAY EXPENSES CONTAINER JSX COMPONENT
export const TodayExpensesContainerComponent = ({todayExpensesProp}) => {

	/* if no expenses found */
	if (todayExpensesProp.length === 0) {
		return (
			<StyledTransactionsContainer>
				<h2>
					No expenses for today...
				</h2>
			</StyledTransactionsContainer>
		)
	}

	return (
		<StyledTransactionsContainer>
			<h4 className='form-title'>
				Today's entries
			</h4>
			<div className='transactions'>
				{todayExpensesProp.map((i) => {
					return (
						<SingleExpenseComponent key={i._id} {...i} />
					)
				})}
			</div>
		</StyledTransactionsContainer>
	)
}