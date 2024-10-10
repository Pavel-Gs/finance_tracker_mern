// IMPORT STYLED COMPONENTS
import { StyledStatUserComponent } from '../styled_components/StyledStatUserComponent.js'


// STAT ITEM JSX COMPONENT
/* props are coming from AdminPage.jsx; also used in the corresponding styled component */
export const StatUserComponent = ({ countProp, titleProp, iconProp, colorProp, bcgProp }) => {
	return (
		/* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		<StyledStatUserComponent $color={colorProp} $bcg={bcgProp}>
			<header>
				<span className='icon'>
					{iconProp}
				</span>
				<span className='count'>
					{countProp}
				</span>
				<h5 className='title'>
					{titleProp}
				</h5>
			</header>
			{/* <h5 className='title'>
				{titleProp}
			</h5> */}
		</StyledStatUserComponent>
	)
}