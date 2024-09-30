// IMPORT ROUTER COMPONENTS
import { Link, Form } from 'react-router-dom'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
// IMPORT REACT ICONS
import { FaPlus } from "react-icons/fa"
import { BsBriefcaseFill } from "react-icons/bs"
import { BsBank2 } from "react-icons/bs"
import { MdAssignmentReturn } from "react-icons/md"
import { RxDotFilled } from "react-icons/rx"
import { IoLocationSharp } from "react-icons/io5"
import { FaCalendarAlt } from 'react-icons/fa'
import { FaUser } from "react-icons/fa"
import { FaCog } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa"
// IMPORT JSX COMPONENTS
import { IncomeInfoComponent } from './IncomeInfoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledSingleTransactionComponent } from '../../styled_components/StyledSingleTransactionComponent.js'


// EXTEND DAYJS FORMAT
day.extend(advancedFormat) // used with the alternative 1 or 2


// SINGLE INCOME JSX COMPONENT
/* props are coming from AllIncomeContainerComponent */
export const SingleIncomeComponent = ({ _id, amountIncome, typeIncome, categoryIncome, commentsIncome, locationIncome, dateIncome, createdBy, createdAt }) => {

	/* customize date format */
	//const customDate = day(createdAt).format('MMM Do, YYYY') /* alternative 1: using the date of creation; no need to offset by a day */
	//const customDate = day(dateExpense).add(1, 'day').format('MMM Do, YYYY') /* alternative 2: using the user's picked date; adding one day to dateExpense, to compensate for the offset (dateExpense does not have the time stamp in MongoDB) */
	const customDate = dateIncome.split('T')[0] /* alternative 3: using the exact user's picked date as a string, but without any kind of external formatting; no need to offset by a day */

	/* assign an icon to a corresponding income type */
	let incomeTypeIcon = <FaPlus />
	if (typeIncome === 'Jobs') { incomeTypeIcon = <BsBriefcaseFill /> }
	if (typeIncome === 'Banks') { incomeTypeIcon = <BsBank2 /> }
	if (typeIncome === 'Returns') { incomeTypeIcon = <MdAssignmentReturn /> }

	return (
		<StyledSingleTransactionComponent>
			<div className='main-icon'>
				<Link className='btn edit-btn' to={`../edit-income/${_id}`}>
					{incomeTypeIcon}
				</Link>
			</div>
			<div className='transaction-content'>
				<p>{amountIncome}</p>
				<p>{typeIncome}</p>
				<IncomeInfoComponent text={`(${categoryIncome})`} />
				<IncomeInfoComponent icon={<RxDotFilled />} text={`"${commentsIncome}"`} />
				<IncomeInfoComponent icon={<IoLocationSharp />} text={locationIncome} />
				<IncomeInfoComponent icon={<FaCalendarAlt />} text={customDate} />
				<IncomeInfoComponent icon={<FaUser />} text={createdBy.firstName} />
			</div>
			<footer className='actions'>
				{/* <Link className='btn edit-btn' to={`../edit-income/${_id}`}>
					<FaCog />
				</Link> */}

				{/* this <Form> component is coming from react-router-dom */}
				<Form method='post' action={`../delete-income/${_id}`} onSubmit={(e) => {
					const confirmDelete = window.confirm("Delete?") /* display confirmation dialog */
					if (!confirmDelete) { e.preventDefault() } /* prevent form submission if the user cancels the deletion */
				}}>
					<button className='btn delete-btn' type='submit'>
						<FaTrashAlt />
					</button>
				</Form>

			</footer>
		</StyledSingleTransactionComponent>
	)
}
