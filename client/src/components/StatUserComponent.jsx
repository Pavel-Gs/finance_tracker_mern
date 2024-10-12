// IMPORT ROUTER COMPONENTS
import { Link, Form } from 'react-router-dom'
// IMPORT REACT ICONS
import { RxDotFilled } from "react-icons/rx"
import { IoLocationSharp } from "react-icons/io5"
import { FaTrashAlt } from "react-icons/fa"
// IMPORT JSX COMPONENTS
import { ExpenseInfoComponent } from './expenses_components/ExpenseInfoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledSingleUserComponent } from '../styled_components/StyledSingleUserComponent.js'


// STAT ITEM JSX COMPONENT
/* props are coming from AdminPage.jsx; also used in the corresponding styled component */
export const StatUserComponent = ({ iconProp, nameProp, emailProp, roleProp, locationProp, orgProp }) => {
	return (
		<StyledSingleUserComponent>
			<div className='main-icon'>
				<Link className='btn edit-btn' onClick={(e) => {
					const confirmDelete = window.alert("This action currently can only be performed on the back-end. Please contact your sys-admin.")
				}}>
					{iconProp}
				</Link>
			</div>
			<div className='transaction-content'>
				<p>{nameProp}</p>
				<p>{emailProp}</p>
				<ExpenseInfoComponent text={`(${roleProp})`} />
				<ExpenseInfoComponent icon={<RxDotFilled />} text={`"${orgProp}"`} />
				<ExpenseInfoComponent icon={<IoLocationSharp />} text={locationProp} />
			</div>
			<footer className='actions'>
				
				{/* this <Form> component is coming from react-router-dom */}
				<Form onSubmit={(e) => {
					const confirmDelete = window.alert("This action currently can only be performed on the back-end. Please contact your sys-admin.")
				}}>
					<button className='btn delete-btn' type='submit'>
						<FaTrashAlt />
					</button>
				</Form>

			</footer>
		</StyledSingleUserComponent>
	)
}