// IMPORT CUSTOM HOOKS
import { useAllIncomeContext } from '../../pages/income/AllIncomePage.jsx'
// IMPORT JSX COMPONENTS
import { SingleIncomeComponent } from './SingleIncomeComponent.jsx'
import { PaginationButtonsIncomeComponent } from './PaginationButtonsIncomeComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// ALL INCOME CONTAINER JSX COMPONENT
export const AllIncomeContainerComponent = () => {

	/* use global context data */
	const { data } = useAllIncomeContext()
	const { allIncome, currentIncomeSum, incomeEntries, numOfPages } = data.data /* I had to add another ".data" after the query integration */
	const formattedCurrentIncomeSum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentIncomeSum)

	/* if no income found */
	if (allIncome.length === 0) {
		return (
			<StyledTransactionsContainer>
				<h2>
					No income found...
				</h2>
			</StyledTransactionsContainer>
		)
	}

	return (
		<StyledTransactionsContainer>
			<h5 style={{ textTransform: 'none' }}>
				Entries found: {incomeEntries}; {formattedCurrentIncomeSum}
			</h5>
			<div className='transactions'>
				{allIncome.map((i) => {
					return (
						<SingleIncomeComponent key={i._id} {...i} />
					)
				})}
			</div>
			{numOfPages > 1 && <PaginationButtonsIncomeComponent />}
		</StyledTransactionsContainer>
	)
}