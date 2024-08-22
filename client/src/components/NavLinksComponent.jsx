// IMPORT ROUTER COMPONENTS
import { NavLink } from 'react-router-dom'
// IMPORT CUSTOM HOODS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT CUSTOM COMPONENTS
import { linksList } from '../utils/linksList.jsx'


// NAV LINKS JSX COMPONENT
export const NavLinksComponent = ({ isBigSidebarProp }) => {
	// use global context data
	const { toggleSidebar, user } = useDashboardContext()

	return (
		<div className="nav-links">
			{linksList.map((i) => {
				return (
					<NavLink className='nav-link' to={i.linkPath} key={i.id} onClick={
						isBigSidebarProp ? null : toggleSidebar
					} end> {/* added "end" prop, so the first link won't show as active at all times  */}
						<span className='icon'>
							{i.linkIcon}
						</span>
						{i.linkText}
					</NavLink>
				)
			})}
		</div>
	)
}