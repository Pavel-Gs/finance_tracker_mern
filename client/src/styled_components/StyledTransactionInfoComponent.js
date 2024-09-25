// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE EXPENSE INFO COMPONENT
export const StyledTransactionInfoComponent = styled.div`
	display: flex;
	align-items: center;
	.transaction-icon {
		font-size: 1rem;
		margin-right: 0.5rem;
		display: flex;
		align-items: center;
		svg {
			color: var(--text-secondary-color);
		}
	}
	.transaction-text {
		text-transform: capitalize;
		letter-spacing: var(--letter-spacing);
	}
`
