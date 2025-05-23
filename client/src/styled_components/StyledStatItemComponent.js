// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE STAT ITEM COMPONENT
export const StyledStatItemComponent = styled.article`
	padding: 0;
	background: var(--background-secondary-color);
	border-bottom: 5px solid var(--grey-300);
	border-radius: var(--border-radius);

	header {
		display: flex;
		align-items: top;
		justify-content: space-between;
		.count {
			display: block;
			font-size: 1.5rem;
			margin-left: 0.5rem;
			@media (max-width: 1488px) {
				font-size: 1rem;
			}
		}
		.title {
			margin: 0;
			text-transform: capitalize;
			letter-spacing: var(--letter-spacing);
			text-align: center;
			margin: 0.5rem;
			font-size: 1.25rem;
			.entries {
				font-size: 1rem;
				color: var(--grey-300);
				margin-top: 0.25rem;
			}
		}
		.icon {
			width: 70px;
			height: 60px;
			background: var(--grey-300);
			border-radius: 0 var(--border-radius) 0 0;
			display: flex;
			align-items: center;
			justify-content: center;
			svg {
				font-size: 2rem;
				color: var(--white);
			}
			@media (max-width: 1610px) {
				height: 80px;
			}
		}
	}
`

