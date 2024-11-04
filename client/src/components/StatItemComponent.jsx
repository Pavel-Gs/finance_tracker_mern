// IMPORT STYLED COMPONENTS
import { StyledStatItemComponent } from '../styled_components/StyledStatItemComponent.js'


// STAT ITEM JSX COMPONENT
/* props are coming from AdminPage.jsx; also used in the corresponding styled component */
export const StatItemComponent = ({ countProp, titleProp, iconProp }) => {
	return (
		<StyledStatItemComponent>
			<header>
				<span className='count'>
					{countProp}
				</span>
				<h5 className='title'>
					<p>
						{titleProp}
					</p>
					<p className='entries'>
						entries: {countProp}
					</p>
				</h5>
				<span className='icon'>
					{iconProp}
				</span>
			</header>
		</StyledStatItemComponent>
	)
}