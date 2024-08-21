// IMPORT CREATE ROOT REACT FUNCTION
import { createRoot } from 'react-dom/client'
// IMPORT ROUTER FUNCTIONS AND COMPONENTS
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// IMPORT CUSTOM JSX COMPONENTS
import { DashboardLayout } from './pages/DashboardLayout.jsx'
import { ErrorPage } from './pages/ErrorPage.jsx'
import { HomeLayout } from './pages/HomeLayout.jsx'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
// IMPORT GLOBAL CSS
import './index.css'


// SET BROWSER ROUTING
const browserRoutes = createBrowserRouter(
	[
		{
			path: '/',
			element: <HomeLayout />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <LandingPage />
				},
				{
					path: 'register',
					element: <RegisterPage />
				},
				{
					path: 'login',
					element: <LoginPage />
				},
				{
					path: 'dashboard',
					element: <DashboardLayout />
				}
			]
		}
	]
)


// RENDER COMPONENTS
createRoot(document.getElementById('root')).render(
	<RouterProvider router={browserRoutes} />
)
