// IMPORT REACT ICONS
import { IoLocationSharp } from "react-icons/io5"
// IMPORT STYLED COMPONENTS
import { StyledStatUserComponent } from '../styled_components/StyledStatUserComponent.js'


// STAT ITEM JSX COMPONENT
/* props are coming from AdminPage.jsx; also used in the corresponding styled component */
export const StatUserComponent = ({ iconProp, nameProp, emailProp, roleProp, locationProp, orgProp, colorProp, bcgProp }) => {
	return (
		/* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		<StyledStatUserComponent $color={colorProp} $bcg={bcgProp}>
			<span className='icon'>
				{iconProp}
			</span>
			<header>
				<span className='name'>
					{nameProp}
				</span>
				<span className='info'>
					{emailProp}
				</span>
				<span className='info'>
					<IoLocationSharp />{locationProp}
				</span>
			</header>
			<div className='other'>
				<span className='role'>
					User's role: <span>{roleProp}</span>
				</span>
				<span className='organization'>
					Organization name: {orgProp}
				</span>
			</div>
		</StyledStatUserComponent>
	)
}