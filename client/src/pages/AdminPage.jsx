// IMPORT ROUTER COMPONENTS
import { redirect, useLoaderData } from 'react-router-dom'
// IMPORT TOASTIFY FUNCTION
import { toast } from 'react-toastify'
// IMPORT CUSTOM INSTANCE ROUTE FUNCTION
import { customFetch } from '../utils/customFetch.js'
// IMPORT REACT ICONS
import { FaUser, FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
// IMPORT JSX COMPONENTS
import { StatItemComponent } from '../components/StatItemComponent.jsx'
import { StatUserComponent } from '../components/StatUserComponent.jsx'
// IMPORT STYLED COMPONENTS
import { StyledStatsContainer } from '../styled_components/StyledStatsContainer.js'


// CREATE A LOADER
/* for prefetching the data; used in App.jsx "admin" path */
export const loaderAdmin = async () => {
	try {
		const response = await customFetch.get('/admin/app-stats')
		return response.data
	} catch (error) {
		toast.error("You are not authorized to view that page")
		return redirect('/dashboard')
	}
}


// ADMIN PAGE JSX COMPONENT
export const AdminPage = () => {

	/* use the data from the loader; "useLoaderData" hook is using the return from the "loaderAdmin" function (also, refer to App.jsx, "admin" path) */
	const { allUsers, allUsersCount, allExpensesCount, allIncomeCount } = useLoaderData()

	return (
		<>
			<h4 className='form-title' style={{ marginBottom: '1.5rem' }}>
				Stats count
			</h4>
			<StyledStatsContainer>
				<StatItemComponent titleProp='Registered Users' countProp={allUsersCount} iconProp={<FaUser />} colorProp='#647acb' bcgProp='#e0e8f9' />
				<StatItemComponent titleProp='Expense Entries' countProp={allExpensesCount} iconProp={<FaMinusCircle />} colorProp='#e9b949' bcgProp='#fcefc7' />
				<StatItemComponent titleProp='Income Entries' countProp={allIncomeCount} iconProp={<FaPlusCircle />} colorProp='#e9b949' bcgProp='#fcefc7' />
			</StyledStatsContainer>

			<h4 className='form-title' style={{ marginBottom: '1.5rem' }}>
				Users list
			</h4>
			{allUsers.map(i => {
				return (
					<StatUserComponent key={i._id} iconProp={<FaUser />} nameProp={`${i.firstName} ${i.lastName}`} emailProp={i.emailUser} roleProp={i.role} locationProp={i.locationUser} orgProp={i.organization} colorProp='#647acb' bcgProp='#e0e8f9' />
				)
			})}
		</>
	)
}