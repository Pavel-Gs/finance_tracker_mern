// IMPORT ROUTER COMPONENTS
import { Link, Form } from 'react-router-dom'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
// IMPORT REACT ICONS
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
day.extend(advancedFormat)


// SINGLE INCOME JSX COMPONENT
/* props are coming from AllIncomeContainerComponent */
export const SingleIncomeComponent = ({ amountIncome, typeIncome, categoryIncome, commentsIncome, locationIncome, dateIncome, createdBy, createdAt }) => {

	/* customize date format */
	/* as an alternative, could use "createdAt", instead of "dateIncome" */
	const customDate = day(dateIncome).add(1, 'day').format('MMM Do, YYYY') /* adding one day to dateIncome, to compensate for the offset (dateIncome does not have the time stamp in MongoDB) */

	/* assign an icon to a corresponding income type */
	let incomeTypeIcon = "+"
	if (typeIncome === 'Jobs') { incomeTypeIcon = <BsBriefcaseFill /> }
	if (typeIncome === 'Banks') { incomeTypeIcon = <BsBank2 /> }
	if (typeIncome === 'Returns') { incomeTypeIcon = <MdAssignmentReturn /> }

	return (
		<StyledSingleTransactionComponent>
			<div className='main-icon'>
				{incomeTypeIcon}
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
				<Link className='btn edit-btn'>
					<FaCog />
				</Link>
				<Form>
					<button className='btn delete-btn' type='submit'>
						<FaTrashAlt />
					</button>
				</Form>
			</footer>
		</StyledSingleTransactionComponent>
	)
}
