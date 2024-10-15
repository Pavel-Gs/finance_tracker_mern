// IMPORT REACT FUNCTIONS
import { useState } from 'react'
// IMPORT CUSTOM HOOKS
import { useDashboardContext } from '../pages/DashboardLayout.jsx'
// IMPORT REACT ICONS
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
// IMPORT STYLED COMPONENTS
import { StyledLogoutComponent } from '../styled_components/StyledLogoutComponent.js'


// LOGOUT JSX COMPONENT
export const LogoutComponent = () => {

	/* use global context data */
	const { currentUser, logoutUser } = useDashboardContext()
	const [showLogout, setShowLogout] = useState(false)

	return (
		<StyledLogoutComponent>
			<button className='btn logout-btn' type='button' onClick={() => setShowLogout(!showLogout)}>
				{currentUser?.avatar ? (
					<img src={currentUser.avatar} alt='avatar' className='img' />
				) : (
					<FaUserCircle />
				)}
				{currentUser?.firstName}
				<FaCaretDown />
			</button>
			<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
				<button className='dropdown-btn' type='button' onClick={logoutUser}>
					logout
				</button>
			</div>
		</StyledLogoutComponent>
	)
}
