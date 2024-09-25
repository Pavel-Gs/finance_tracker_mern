// IMPORT STYLED COMPONENTS
import { StyledTransactionInfoComponent } from '../../styled_components/StyledTransactionInfoComponent.js'


// EXPENSE INFO JSX COMPONENT
export const ExpenseInfoComponent = ({ icon, text }) => {
	return (
		<StyledTransactionInfoComponent>
			<span className='transaction-icon'>
				{icon}
			</span>
			<span className='transaction-text'>
				{text}
			</span>
		</StyledTransactionInfoComponent>
	)
}