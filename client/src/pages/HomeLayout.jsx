// IMPORT ROUTER COMPONENTS
import { Outlet } from 'react-router-dom'


// HOME LAYOUT JSX COMPONENT
export const HomeLayout = () => {
	return (
		<>
			{/* render all children elements for the route */}
			<Outlet />
		</>
	)
}