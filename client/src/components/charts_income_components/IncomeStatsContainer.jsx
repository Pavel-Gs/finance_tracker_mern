// IMPORT REACT ICONS
import { FaPlus } from "react-icons/fa"
import { BsBriefcaseFill } from "react-icons/bs"
import { BsBank2 } from "react-icons/bs"
import { MdAssignmentReturn } from "react-icons/md"
// IMPORT JSX COMPONENTS
import { StatItemComponent } from '../StatItemComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledStatsContainer } from '../../styled_components/StyledStatsContainer.js'


// INCOME STATS CONTAINER JSX COMPONENT
export const IncomeStatsContainer = ({ defaultStatsProp }) => {

	// Mapping object for icons
	const incomeTypeIcons = {
		'Jobs': <BsBriefcaseFill />,
		'Banks': <BsBank2 />,
		'Returns': <MdAssignmentReturn />,
		default: <FaPlus /> // Default icon if no match is found
	}

	// Create statsList dynamically from defaultStatsProp
	const statsList = Object.entries(defaultStatsProp).map(([key, value], index) => ({
		titleProp: key || "N/A",
		countProp: value || 0,
		iconProp: incomeTypeIcons[key] || incomeTypeIcons.default
	}))

	// Calculate total count to determine if all counts are zero
	const totalIncomeCount = Object.values(defaultStatsProp).reduce((acc, count) => acc + count, 0)

	return (
		<>
			<h4 className='form-title' style={{ marginBottom: '1.5rem', textTransform: 'none' }}>
				{totalIncomeCount === 0 ? "No income data" : "Total entries count"}
			</h4>
			<StyledStatsContainer>
				{statsList.map((i) => {
					return (
						<StatItemComponent key={i.titleProp} {...i} />
					)
				})}
			</StyledStatsContainer>
		</>
	)
}