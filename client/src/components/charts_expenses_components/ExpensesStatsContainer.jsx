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
// IMPORT JSX COMPONENTS
import { StatItemComponent } from '../StatItemComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledStatsContainer } from '../../styled_components/StyledStatsContainer.js'


// EXPENSES STATS CONTAINER JSX COMPONENT
export const ExpensesStatsContainer = ({ countedExpensesTypesProp }) => {
	
    /* mapping object for icons */
    const expenseTypeIcons = {
        'Alcohol & nicotine': <FaWineBottle />,
        'Food': <IoFastFood />,
        'Monthly': <FaRepeat />,
        'Commute': <FaBusAlt />,
        'Home': <GiHomeGarage />,
        'Medicine': <GiMedicines />,
        'Geodesy': <GrUserWorker />,
        'Recreational': <FaUmbrellaBeach />,
        default: <FaMinus /> /* default icon if no match is found */
    }

    /* create statsList dynamically from countedExpensesTypesProp */
    const typesList = Object.entries(countedExpensesTypesProp).map(([key, value], index) => ({
        titleProp: key || "N/A",
        countProp: value.count || 0,
        totalAmountProp: value.totalAmount || 0,
        iconProp: expenseTypeIcons[key] || expenseTypeIcons.default
    }))

    /* calculate total count to determine if all counts are zero */
    const totalExpensesEntriesCount = Object.values(countedExpensesTypesProp).reduce((acc, { count }) => acc + count, 0);
    return (
        <>
            <h4 className='form-title' style={{ marginBottom: '1.5rem', textTransform: 'none' }}>
                {totalExpensesEntriesCount === 0 ? "No expense data" : "Total entries count"}
            </h4>
            <StyledStatsContainer>
                {typesList.map((i) => {
                    return (
                        <StatItemComponent key={i.titleProp} {...i} />
                    )
                })}
            </StyledStatsContainer>
        </>
    )
}