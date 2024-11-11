// IMPORT ROUTER FUNCTIONS
import { useRouteError } from 'react-router-dom'


// ERROR ELEMENT JSX COMPONENT
export const ErrorElement = () => {

	/* invoke route errors */
	const error = useRouteError()
	console.log(error)

	return (
		<h4>
			There was an error...
		</h4>
	)
}