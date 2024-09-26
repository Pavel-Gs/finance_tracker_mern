// IMPORT CUSTOM HOOKS
import { useAllExpensesContext } from '../../pages/expenses/AllExpensesPage.jsx'
// IMPORT JSX COMPONENTS
import { SingleExpenseComponent } from './SingleExpenseComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// ALL EXPENSES CONTAINER JSX COMPONENT
export const AllExpensesContainerComponent = () => {

	/* use global context data */
	const { data } = useAllExpensesContext()
	const { allExpenses } = data /* destructure expenses from the data */

	/* if no expenses found */
	if (allExpenses.length === 0) {
		return (
			<StyledTransactionsContainer>
				<h2>
					No expenses found...
				</h2>
			</StyledTransactionsContainer>
		)
	}

	return (
		<StyledTransactionsContainer>
			<div className='transactions'>
				{allExpenses.map((i) => {
					return (
						<SingleExpenseComponent key={i._id} {...i} />

					)
				})}
			</div>
		</StyledTransactionsContainer>
	)
}