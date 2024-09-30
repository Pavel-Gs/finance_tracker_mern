// IMPORT CREATE ROOT REACT FUNCTION
import { createRoot } from 'react-dom/client'
// IMPORT ROUTER FUNCTIONS AND COMPONENTS
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// IMPORT TOASTIFY COMPONENTS
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
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
import { EditExpensePage } from '../src/pages/expenses/EditExpensePage.jsx'
import { AddIncomePage } from './pages/income/AddIncomePage.jsx'
import { EditIncomePage } from '../src/pages/income/EditIncomePage.jsx'
import { AllExpensesPage } from './pages/expenses/AllExpensesPage.jsx'
import { AllIncomePage } from './pages/income/AllIncomePage.jsx'
import { StatsExpensesPage } from './pages/expenses/StatsExpensesPage.jsx'
import { StatsIncomePage } from './pages/income/StatsIncomePage.jsx'
// IMPORT JSX FUNCTIONS
import { checkDefaultThemeFunction } from './utils/checkDefaultThemeFunction.jsx'
// IMPORT ACTIONS AND LOADERS
import { actionRegister } from './pages/RegisterPage.jsx'
import { actionLogin } from './pages/LoginPage.jsx'
import { actionAddExpense } from './pages/expenses/AddExpensePage.jsx'
import { actionEditExpense } from '../src/pages/expenses/EditExpensePage.jsx'
import { actionDeleteExpense } from './pages/expenses/DeleteExpensePage.jsx'
import { actionAddIncome } from './pages/income/AddIncomePage.jsx'
import { actionEditIncome } from '../src/pages/income/EditIncomePage.jsx'
import { actionDeleteIncome } from './pages/income/DeleteIncomePage.jsx'
import { loaderDashboard } from './pages/DashboardLayout.jsx'
import { loaderAllExpenses } from './pages/expenses/AllExpensesPage.jsx'
import { loaderEditExpense } from '../src/pages/expenses/EditExpensePage.jsx'
import { loaderAllIncome } from './pages/income/AllIncomePage.jsx'
import { loaderEditIncome } from '../src/pages/income/EditIncomePage.jsx'
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
					element: <RegisterPage />,
					action: actionRegister
				},
				{
					path: 'login',
					element: <LoginPage />,
					action: actionLogin
				},
				{
					path: 'dashboard',
					element: <DashboardLayout />,
					loader: loaderDashboard,
					children: [
						{
							index: true,
							element: <AddExpensePage />,
							action: actionAddExpense,
							loader: loaderAllExpenses /* CLIENT-side filtering (for larger data sets, write new back-end controller); using the same loader as for allExpenses, but with the returned filtered data for today's expenses (entries) only */
						},
						{
							path: 'edit-expense/:id',
							element: <EditExpensePage />,
							action: actionEditExpense,
							loader: loaderEditExpense
						},
						{
							path: 'delete-expense/:id',
							action: actionDeleteExpense
						},
						{
							path: 'all-expenses',
							element: <AllExpensesPage />,
							loader: loaderAllExpenses
						},
						{
							path: 'stats-expenses',
							element: <StatsExpensesPage />
						},
						{
							path: 'add-income',
							element: <AddIncomePage />,
							action: actionAddIncome,
							loader: loaderAllIncome /* CLIENT-side filtering (for larger data sets, write new back-end controller); using the same loader as for allIncome, but with the returned filtered data for today's income (entries) only */
						},
						{
							path: 'edit-income/:id',
							element: <EditIncomePage />,
							action: actionEditIncome,
							loader: loaderEditIncome
						},
						{
							path: 'delete-income/:id',
							action: actionDeleteIncome
						},
						{
							path: 'all-income',
							element: <AllIncomePage />,
							loader: loaderAllIncome
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
	<>
		{/* use browser routing */}
		<RouterProvider router={browserRoutes} />

		{/* use react-toastify */}
		<ToastContainer position='top-center' />
	</>
)
