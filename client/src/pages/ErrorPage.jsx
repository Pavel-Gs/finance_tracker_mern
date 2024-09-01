// IMPORT ROUTER COMPONENTS
import { Link, useRouteError } from 'react-router-dom'
// IMPORT STYLED COMPONENTS
import { StyledErrorPage } from '../styled_components/StyledErrorPage.js'
// IMPORT IMAGES
import notFoundImg from '../assets/images/notFoundImg.svg'


// ERROR PAGE JSX COMPONENT
export const ErrorPage = () => {

	/* the return for 404 error */
	const errorInfo = useRouteError()
	if (errorInfo.status === 404) {
		return (
			<StyledErrorPage>
				<div>
					<img src={notFoundImg} alt='not found' />
					<h3>
						Page not found
					</h3>
					<p>
						The page you are looking for is not found or does not exist
					</p>
					<Link to='/dashboard'>
						back home
					</Link>
				</div>
			</StyledErrorPage>
		)
	}

	/* the return for all other errors */
	return (
		<StyledErrorPage>
			<div>
				<h3>
					something went wrong
				</h3>
			</div>
		</StyledErrorPage>
	)
}
