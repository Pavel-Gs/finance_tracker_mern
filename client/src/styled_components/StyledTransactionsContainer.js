// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE TRANSACTIONS CONTAINER
export const StyledTransactionsContainer = styled.section`
	margin-top: 4rem;
	h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
		margin-bottom: 1.5rem;
	}
	.transactions {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}
	@media (min-width: 1120px) {
		.transactions {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}
`
