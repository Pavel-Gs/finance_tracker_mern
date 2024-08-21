// IMPORT ROUTER COMPONENTS
import { Outlet } from 'react-router-dom'
// IMPORT JSX COMPONENTS
import { SmallSidebarComponent } from '../components/SmallSidebarComponent'
import { BigSidebarComponent } from '../components/BigSidebarComponent'
// IMPORT STYLED COMPONENTS
import { StyledDashboardLayout } from '../styled_components/StyledDashboardLayout.js'
import { NavbarComponent } from '../components/NavbarComponent.jsx'


// DASHBOARD LAYOUT JSX COMPONENT
export const DashboardLayout = () => {
	return (
		<StyledDashboardLayout>
			<main className="dashboard">
				<SmallSidebarComponent />
				<BigSidebarComponent />
				<div>
					<NavbarComponent />
					<div className="dashboard-page">
						{/* render all children elements for the route */}
						<Outlet />
					</div>
				</div>
			</main>
		</StyledDashboardLayout>
	)
}