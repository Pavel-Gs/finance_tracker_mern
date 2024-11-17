// IMPORT CUSTOM HOOKS
import { useAllExpensesContext } from '../../pages/expenses/AllExpensesPage.jsx'
// IMPORT JSX COMPONENTS
import { SingleExpenseComponent } from './SingleExpenseComponent.jsx'
import { PaginationButtonsExpensesComponent } from './PaginationButtonsExpensesComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// ALL EXPENSES CONTAINER JSX COMPONENT
export const AllExpensesContainerComponent = () => {

	/* use global context data */
	const { data } = useAllExpensesContext()
	const { allExpenses, currentExpensesSum, expensesEntries, numOfPages } = data.data /* I had to add another ".data" after the query integration */
	const formattedCurrentExpensesSum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentExpensesSum)
	
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
			<h5 style={{ textTransform: 'none' }}>
				Entries found: {expensesEntries}; {formattedCurrentExpensesSum}
			</h5>
			<div className='transactions'>
				{allExpenses.map((i) => {
					return (
						<SingleExpenseComponent key={i._id} {...i} />
					)
				})}
			</div>
			{numOfPages > 1 && <PaginationButtonsExpensesComponent />}
		</StyledTransactionsContainer>
	)
}