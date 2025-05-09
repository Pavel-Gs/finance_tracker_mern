// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE SINGLE EXPENSE COMPONENT
export const StyledSingleTransactionComponent = styled.article`
	background: var(--background-secondary-color);
	border-radius: var(--border-radius);
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: var(--shadow-2);
	min-height: 2rem;

	.main-icon {
		height: 100%;
		.edit-btn {
			color: var(--white);
			display: grid;
			height: 100%;
			place-items: center;
			border-radius: var(--border-radius) 0 0 var(--border-radius);
			font-size: 1.5rem;
			font-weight: 700;
			text-transform: uppercase;
			margin-right: 0.5rem;
		}
	}
	.transaction-content {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 1.5fr 1fr;
		align-items: center;
		grid-gap: 1rem;
		width: 100%;
		@media (max-width: 1600px) {
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
		@media (max-width: 1080px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
		@media (max-width: 600px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.delete-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		width: 35px;
		height: 36px;
		font-size: 0.85rem;
		border-radius: 0 var(--border-radius) var(--border-radius) 0;
		@media (max-width: 1600px) {
			height: 70px;
		}
		@media (max-width: 1080px) {
			height: 100px;
		}
		@media (max-width: 600px) {
			height: 152px;
		}
	}
`
