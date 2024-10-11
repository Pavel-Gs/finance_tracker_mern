// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE STAT ITEM COMPONENT
export const StyledStatUserComponent = styled.article`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 70px;
	padding: 0;
	margin: 0 0 0.5rem 0;
	background: var(--background-secondary-color);
	//border-bottom: 5px solid ${(props) => props.$color}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
	border-bottom: 5px solid var(--grey-300);
	border-radius: var(--border-radius);

	.icon {
		min-width: 80px;
		height: 100%;
		//background: ${(props) => props.$bcg}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		background: var(--grey-300);
		border-radius: var(--border-radius) 0 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 2rem;
			//color: ${(props) => props.$color}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
			color: var(--white);
		}
	}

	header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		grid-gap: 1rem;
		width: 100%;
		@media (max-width: 768px) {
			display: flex;
			flex-direction: column;
			}

		.name {
			display: block;
			font-weight: 700;
			font-size: 1.25rem;
			margin-left: 0.5rem;
			//color: ${(props) => props.$color}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
			@media (max-width: 768px) {
				font-size: 1rem;
			}
		}

		.info {
			text-transform: none;
			letter-spacing: var(--letter-spacing);
			margin: 0 0.5rem;
			font-size: 1.25rem;
			@media (max-width: 768px) {
				font-size: 1rem;
			}
		}
	}

	.other {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: right;
		height: 100%;
		text-transform: none;
		letter-spacing: var(--letter-spacing);
		font-size: 1.25rem;
		@media (max-width: 768px) {
			font-size: 1rem;
		}
		.role {
			padding: 0.5rem;
		}
		.organization {
			display: inline-block;
			min-width: 400px;
			//white-space: nowrap;
		}
	}
`
