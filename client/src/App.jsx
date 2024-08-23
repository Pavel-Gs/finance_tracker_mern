// IMPORT CREATE ROOT REACT FUNCTION
import { createRoot } from 'react-dom/client'
// IMPORT ROUTER FUNCTIONS AND COMPONENTS
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// IMPORT JSX COMPONENTS
import { AdminPage } from './pages/AdminPage.jsx'
import { DashboardLayout } from './pages/DashboardLayout.jsx'
import { ErrorPage } from './pages/ErrorPage.jsx'
import { HomeLayout } from './pages/HomeLayout.jsx'
import { LandingPage } from './pages/LandingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { AddExpensePage } from './pages/expenses/AddExpensePage.jsx'
import { AddIncomePage } from './pages/income/AddIncomePage.jsx'
import { AllExpensesPage } from './pages/expenses/AllExpensesPage.jsx'
import { AllIncomePage } from './pages/income/AllIncomePage.jsx'
import { StatsExpensesPage } from './pages/expenses/StatsExpensesPage.jsx'
import { StatsIncomePage } from './pages/income/StatsIncomePage.jsx'
// IMPORT JSX FUNCTIONS
import { checkDefaultThemeFunction } from './utils/checkDefaultThemeFunction.jsx'
// IMPORT GLOBAL CSS
import './index.css'


// MANAGE DARK THEME
checkDefaultThemeFunction()


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
					element: <DashboardLayout />,
					children: [
						{
							index: true,
							element: <AddExpensePage />
						},
						{
							path: 'all-expenses',
							element: <AllExpensesPage />
						},
						{
							path: 'stats-expenses',
							element: <StatsExpensesPage />
						},
						{
							path: 'add-income',
							element: <AddIncomePage />
						},
						{
							path: 'all-income',
							element: <AllIncomePage />
						},
						{
							path: 'stats-income',
							element: <StatsIncomePage />
						},
						{
							path: 'profile',
							element: <ProfilePage />
						},
						{
							path: 'admin',
							element: <AdminPage />
						}
					]
				}
			]
		}
	]
)


// RENDER COMPONENTS
createRoot(document.getElementById('root')).render(
	<RouterProvider router={browserRoutes} />
)
