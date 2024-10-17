// IMPORT ROUTER COMPONENTS
import { useNavigation } from 'react-router-dom'


// SUBMIT BUTTON JSX COMPONENT
export const SubmitButtonComponent = ({ formBtnProp }) => {

	/* invoke useNavigation */
	const navigation = useNavigation()
	const isSubmitting = navigation.state === 'submitting'

	return (
		<button className={`btn btn-block ${formBtnProp && 'form-btn'}`} type='submit' disabled={isSubmitting}>
			{isSubmitting ? "Submitting..." : "Submit"}
		</button>
	)
}