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
export const ExpensesStatsContainer = ({defaultStatsProp}) => {

	// Mapping object for icons
	const expenseTypeIcons = {
		'Alcohol & nicotine': <FaWineBottle />,
		'Food': <IoFastFood />,
		'Monthly': <FaRepeat />,
		'Commute': <FaBusAlt />,
		'Home': <GiHomeGarage />,
		'Medicine': <GiMedicines />,
		'Geodesy': <GrUserWorker />,
		'Recreational': <FaUmbrellaBeach />,
		default: <FaMinus /> // Default icon if no match is found
	}

	// Create statsList dynamically from defaultStatsProp
	const statsList = Object.entries(defaultStatsProp).map(([key, value], index) => ({
		titleProp: key || "N/A",
		countProp: value || 0,
		iconProp: expenseTypeIcons[key] || expenseTypeIcons.default
	}))

	return (
		<StyledStatsContainer>
			{statsList.map((i) => {
				return (
					<StatItemComponent key={i.titleProp} {...i} />
				)
			})}
		</StyledStatsContainer>
	)
}