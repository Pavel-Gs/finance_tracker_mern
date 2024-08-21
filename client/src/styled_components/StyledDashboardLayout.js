// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE DASHBOARD LAYOUT
export const StyledDashboardLayout = styled.section`
	.dashboard {
		display: grid;
		grid-template-columns: 1fr;
	}
	.dashboard-page {
		width: 90vw;
		margin: 0 auto;
		padding: 2rem 0;
	}
	@media (min-width: 992px) {
		.dashboard {
			grid-template-columns: auto 1fr;
		}
		.dashboard-page {
			width: 90%;
		}
	}
`

