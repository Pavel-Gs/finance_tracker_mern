// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE STATS CONTAINER
export const StyledStatsContainer = styled.section`
	display: grid;
	row-gap: 1rem;
	margin-bottom: 2rem;
	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
	}
	@media (min-width: 1120px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`
