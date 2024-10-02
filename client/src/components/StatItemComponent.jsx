// IMPORT STYLED COMPONENTS
import { StyledStatItemComponent } from '../styled_components/StyledStatItemComponent.js'


// STAT ITEM JSX COMPONENT
/* props are coming from AdminPage.jsx; also used in the corresponding styled component */
export const StatItemComponent = ({ countProp, titleProp, iconProp, colorProp, bcgProp }) => {
	return (
		/* transient props are prefixed with a $, which ensures that they are not passed down to the DOM */
		<StyledStatItemComponent $color={colorProp} $bcg={bcgProp}>
			<header>
				<span className='count'>
					{countProp}
				</span>
				<span className='icon'>
					{iconProp}
				</span>
			</header>
			<h5 className='title'>
				{titleProp}
			</h5>
		</StyledStatItemComponent>
	)
}