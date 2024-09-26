// IMPORT CUSTOM HOOKS
import { useAllIncomeContext } from '../../pages/income/AllIncomePage.jsx'
// IMPORT JSX COMPONENTS
import { SingleIncomeComponent } from './SingleIncomeComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledTransactionsContainer } from '../../styled_components/StyledTransactionsContainer.js'


// ALL INCOME CONTAINER JSX COMPONENT
export const AllIncomeContainerComponent = () => {

	/* use global context data */
	const { data } = useAllIncomeContext()
	const { allIncome } = data /* destructure income from the data */

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
			<div className='transactions'>
				{allIncome.map((i) => {
					return (
						<SingleIncomeComponent key={i._id} {...i} />
					)
				})}
			</div>
		</StyledTransactionsContainer>
	)
}