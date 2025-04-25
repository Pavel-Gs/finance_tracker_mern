// IMPORT STYLED UNITY FUNCTION
import styled from 'styled-components'


// CSS FOR THE LANDING PAGE
export const StyledLandingPage = styled.main`
	background: linear-gradient(135deg, #28b1bed8, #e1e7e6);
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	//font-family: 'Inter', sans-serif;

	.overlay {
		width: 100%;
		max-width: 800px;
		padding: 2rem;
	}

	.nav {
		display: flex;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.hero h1 {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #1b1f3b;
	}

	.hero p {
		font-size: 1.25rem;
		color: #3b3f5c;
		margin-bottom: 2rem;
	}

	.cta-buttons {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.75rem 1.75rem;
		font-size: 1rem;
		border-radius: 30px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.btn.primary {
		background-color: #28b2be;
		color: white;
	}

	.btn.secondary {
		border: 2px solid #28b2be;
		color: #e5f5f3;
		background: transparent;
	}

	.btn:hover {
		transform: scale(1.05);
	}

	footer {
		margin-top: 3rem;
		font-size: 0.875rem;
		color: #777;
	}
`
