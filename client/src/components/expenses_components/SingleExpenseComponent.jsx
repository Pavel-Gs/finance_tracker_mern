// IMPORT ROUTER COMPONENTS
import { Link, Form, useLocation } from 'react-router-dom'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
// IMPORT REACT ICONS
import { FaMinus } from "react-icons/fa"
import { FaWineBottle } from "react-icons/fa"
import { IoFastFood } from "react-icons/io5"
import { FaRepeat } from "react-icons/fa6"
import { FaBusAlt } from "react-icons/fa"
import { GiHomeGarage } from "react-icons/gi"
import { GiMedicines } from "react-icons/gi"
import { GrUserWorker } from "react-icons/gr"
import { FaUmbrellaBeach } from "react-icons/fa6"
import { RxDotFilled } from "react-icons/rx"
import { IoLocationSharp } from "react-icons/io5"
import { FaCalendarAlt } from 'react-icons/fa'
import { FaUser } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa"
import { GiPayMoney } from "react-icons/gi"
import { HiMiniCurrencyDollar } from "react-icons/hi2"
import { IoSchoolSharp } from "react-icons/io5"
// IMPORT JSX COMPONENTS
import { ExpenseInfoComponent } from './ExpenseInfoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledSingleTransactionComponent } from '../../styled_components/StyledSingleTransactionComponent.js'


// EXTEND DAYJS FORMAT
day.extend(advancedFormat) // used with the alternative 1 or 2


// SINGLE EXPENSE JSX COMPONENT
/* props are coming from AllExpensesContainerComponent */
export const SingleExpenseComponent = ({ _id, amountExpense, typeExpense, categoryExpense, commentsExpense, locationExpense, dateExpense, createdBy, createdAt }) => {

	/* customize date format */
	//const customDate = day(createdAt).format('MMM Do, YYYY') /* alternative 1: using the date of creation; no need to offset by a day */
	//const customDate = day(dateExpense).add(1, 'day').format('MMM Do, YYYY') /* alternative 2: using the user's picked date; adding one day to dateExpense, to compensate for the offset (dateExpense does not have the time stamp in MongoDB) */
	const customDate = dateExpense.split('T')[0] /* alternative 3: using the exact user's picked date as a string, but without any kind of external formatting; no need to offset by a day */

	/* use useLocation hook to get the current route */
	const location = useLocation()
	const isDashboardIndex = location.pathname === '/dashboard'

	/* assign an icon to a corresponding expense type */
	let expenseTypeIcon = <FaMinus />
	if (typeExpense === 'Alcohol & nicotine') { expenseTypeIcon = <FaWineBottle /> }
	if (typeExpense === 'Food') { expenseTypeIcon = <IoFastFood /> }
	if (typeExpense === 'Monthly') { expenseTypeIcon = <FaRepeat /> }
	if (typeExpense === 'Commute') { expenseTypeIcon = <FaBusAlt /> }
	if (typeExpense === 'Home') { expenseTypeIcon = <GiHomeGarage /> }
	if (typeExpense === 'Medicine') { expenseTypeIcon = <GiMedicines /> }
	if (typeExpense === 'Geodesy') { expenseTypeIcon = <GrUserWorker /> }
	if (typeExpense === 'Recreational') { expenseTypeIcon = <FaUmbrellaBeach /> }
	if (typeExpense === 'Education') { expenseTypeIcon = <IoSchoolSharp /> }

	return (
		<StyledSingleTransactionComponent>
			<div className='main-icon'>
				<Link className='btn edit-btn' to={`${isDashboardIndex ? 'edit-expense' : '../edit-expense'}/${_id}`}> {/* use different path according to the current route, since SingleExpenseComponent being used in different locations */}
					{expenseTypeIcon}
				</Link>
			</div>
			<div className='transaction-content'>
				<ExpenseInfoComponent icon={<HiMiniCurrencyDollar style={{fontSize: '1.5rem'}} />} text={amountExpense} />
				<ExpenseInfoComponent icon={<GiPayMoney style={{fontSize: '1.5rem'}} />} text={typeExpense} />
				<ExpenseInfoComponent text={categoryExpense} />
				<ExpenseInfoComponent icon={<RxDotFilled />} text={`"${commentsExpense}"`} />
				<ExpenseInfoComponent icon={<IoLocationSharp />} text={locationExpense} />
				<ExpenseInfoComponent icon={<FaCalendarAlt />} text={customDate} />
				<ExpenseInfoComponent icon={<FaUser />} text={createdBy.firstName} />
			</div>
			<footer className='actions'>
				<Form method='post' action={`${isDashboardIndex ? 'delete-expense' : '../delete-expense'}/${_id}`} onSubmit={(e) => { {/* use different path according to the current route, since SingleExpenseComponent being used in different locations */}
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
