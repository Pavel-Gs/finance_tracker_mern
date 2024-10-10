// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE STAT ITEM COMPONENT
export const StyledStatUserComponent = styled.article`
	padding: 0;
	background: var(--background-secondary-color);
	border-bottom: 5px solid ${(props) => props.$color}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
	border-radius: var(--border-radius);
	
	header {
		display: flex;
		align-items: top;
		justify-content: space-between;
	}
	.count {
		display: block;
		font-weight: 700;
		font-size: 50px;
		margin-left: 0.5rem;
		color: ${(props) => props.$color}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		/* line-height: 2; */
	}
	.title {
		margin: 0;
		text-transform: capitalize;
		letter-spacing: var(--letter-spacing);
		text-align: left;
		margin: 0.5rem;
		font-size: 1.25rem;
	}
	.icon {
		width: 70px;
		height: 60px;
		background: ${(props) => props.$bcg}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		border-radius: 0 var(--border-radius) 0 var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 2rem;
			color: ${(props) => props.$color}; /* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		}
	}
`

