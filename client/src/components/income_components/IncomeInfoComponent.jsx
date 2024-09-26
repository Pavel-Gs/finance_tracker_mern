// IMPORT STYLED COMPONENTS
import { StyledTransactionInfoComponent } from '../../styled_components/StyledTransactionInfoComponent.js'


// INCOME INFO JSX COMPONENT
export const IncomeInfoComponent = ({ icon, text }) => {
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