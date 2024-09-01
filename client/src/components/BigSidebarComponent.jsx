// IMPORT CUSTOM HOOKS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT JSX COMPONENTS
import { NavLinksComponent } from './NavLinksComponent.jsx'
import { LogoComponent } from './LogoComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledBigSidebarComponent } from '../styled_components/StyledBigSidebarComponent.js'


// BIG SIDEBAR JSX COMPONENT
export const BigSidebarComponent = () => {
	
	/* use global context data */
	const { showSidebar } = useDashboardContext()

	return (
		<StyledBigSidebarComponent>
			<div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
				<div className="content">
					<header>
						<LogoComponent />
					</header>
					<NavLinksComponent isBigSidebarProp />
				</div>
			</div>
		</StyledBigSidebarComponent>
	)
}