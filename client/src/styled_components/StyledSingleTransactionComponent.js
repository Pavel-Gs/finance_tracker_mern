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

	.main-icon {
		background: var(--text-secondary-color);
		color: var(--white);
		width: 40px;
		height: 100%;
		display: grid;
		place-items: center;
		border-radius: var(--border-radius) 0 0 var(--border-radius);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
		margin-right: 1rem;
	}
	.transaction-content {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1.5fr 2fr 1fr 1.5fr 1fr;
		align-items: center;
		grid-gap: 1rem;
		width: 100%;
	}
	.actions {
		display: flex;
		align-items: center;
		.edit-btn {
			height: 35px;
			font-size: 0.85rem;
			display: flex;
			align-items: center;
			margin-right: 0.5rem;
			margin-left: 0.25rem;
			border-radius: 0 0 0 0;
		}
		.delete-btn {
			height: 35px;
			font-size: 0.85rem;
			display: flex;
			align-items: center;
			border-radius: 0 var(--border-radius) var(--border-radius) 0;
		}
	}
`
