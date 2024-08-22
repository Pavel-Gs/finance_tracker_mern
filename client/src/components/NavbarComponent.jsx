// IMPORT CUSTOM HOOKS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT REACT ICONS
import { FaAlignLeft } from 'react-icons/fa'
// IMPORT CUSTOM JSX COMPONENTS
import { LogoComponent } from './LogoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledNavbarComponent } from '../styled_components/StyledNavbarComponent.js'


// NAVBAR JSX COMPONENT
export const NavbarComponent = () => {
	// use global context data
	const {toggleSidebar} = useDashboardContext()

	return (
		<StyledNavbarComponent>
			<div className="nav-center">
				<button className='toggle-btn' type='button' onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>
				<div>
					<LogoComponent />
					<h4 className='logo-text'>
						dashboard
					</h4>
				</div>
				<div className="btn-container">
					toggle/logout
				</div>
			</div>
		</StyledNavbarComponent>
	)
}
