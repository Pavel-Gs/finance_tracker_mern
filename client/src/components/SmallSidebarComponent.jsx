// IMPORT CUSTOM HOOKS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT REACT ICONS
import { FaTimes } from 'react-icons/fa'
// IMPORT JSX COMPONENTS
import { LogoComponent } from './LogoComponent.jsx'
import { NavLinksComponent } from './NavLinksComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledSmallSidebarComponent } from '../styled_components/StyledSmallSidebarComponent.js'


// SMALL SIDEBAR JSX COMPONENT
export const SmallSidebarComponent = () => {
	
	// use global context data
	const { showSidebar, toggleSidebar } = useDashboardContext()

	return (
		<StyledSmallSidebarComponent>
			<div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
				<div className="content">
					<button className='close-btn' type='button' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<LogoComponent />
					</header>
					<NavLinksComponent />
				</div>
			</div>
		</StyledSmallSidebarComponent>
	)
}
