// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'

// CSS FOR THE NAV BAR
export const StyledNavbarComponent = styled.nav`
	height: var(--nav-height);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
	background: var(--background-secondary-color);
	.nav-center {
		display: flex;
		width: 90vw;
		align-items: center;
		justify-content: space-between;
	}
	.toggle-btn {
		background: transparent;
		border-color: transparent;
		font-size: 1.75rem;
		color: var(--primary-500);
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.logo-text {
		display: none;
	}

	.dashboard-stats-container {
		display: flex;
		align-items: center;

		.dashboard-stats-current {
			display: flex;
			flex-direction: column;
			text-align: right;
			margin-left: 1rem;
			@media (max-width: 520px) {
				display: none;
			}
		}

		.dashboard-stats {
			display: flex;
			flex-direction: column;
			text-align: right;
			margin-left: 1rem;
			@media (max-width: 992px) {
				display: none;
			}
		}
	}
	
	.logo {
		display: flex;
		align-items: center;
		margin-left: 1rem;
		width: 100px;
		height: 100%;
	}
	.btn-container {
		display: flex;
		align-items: center;
	}
	@media (min-width: 992px) {
		position: sticky;
		top: 0;
		.nav-center {
			width: 90%;
		}
		.logo {
			display: none;
		}
		.logo-text {
			display: block;
		}
	}
`
