// IMPORT CUSTOM HOOKS
import { useTodayExpensesContext } from '../../pages/expenses/AddExpensePage.jsx'
// IMPORT JSX COMPONENTS
import { SingleExpenseComponent } from './SingleExpenseComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// TODAY EXPENSES CONTAINER JSX COMPONENT
export const TodayExpensesContainerComponent = () => {

	/* use global context data */
	const { data } = useTodayExpensesContext()
	const { allExpenses } = data /* destructure expenses from the data */

	/* filter today's expenses from allExpenses */
	const getCurrentDate = new Date(Date.now()) // get the current date, in the current time zone
	const formattedDate = getCurrentDate.toLocaleDateString('en-CA') // YYYY-MM-DD format for Canada; avoid using ".toISOString()" - it will change the zone to UTC
	const todayExpenses = allExpenses.filter(i => {
		const filteredExpenses = new Date(i.createdAt).toLocaleDateString('en-CA')
		return filteredExpenses === formattedDate
	})

	/* if no expenses found */
	if (todayExpenses.length === 0) {
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
				{todayExpenses.map((i) => {
					return (
						<SingleExpenseComponent key={i._id} {...i} />

					)
				})}
			</div>
		</StyledTransactionsContainer>
	)
}