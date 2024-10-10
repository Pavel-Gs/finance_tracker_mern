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
	console.log(allUsers)

	return (
		<>
			<h4 className='form-title' style={{ marginBottom: '1.5rem' }}>
				Stats count
			</h4>
			<StyledStatsContainer>
				<StatItemComponent titleProp='Registered Users' countProp={allUsersCount} colorProp='#647acb' bcgProp='#e0e8f9' iconProp={<FaUser />} />
				<StatItemComponent titleProp='Expense Entries' countProp={allExpensesCount} colorProp='#e9b949' bcgProp='#fcefc7' iconProp={<FaMinusCircle />} />
				<StatItemComponent titleProp='Income Entries' countProp={allIncomeCount} colorProp='#e9b949' bcgProp='#fcefc7' iconProp={<FaPlusCircle />} />
			</StyledStatsContainer>

			<h4 className='form-title' style={{ marginBottom: '1.5rem' }}>
				Users list
			</h4>
			{allUsers.map(i => {
				return (
					<StatUserComponent key={i._id} titleProp={`${i.firstName} ${i.lastName}`} countProp={i.email} colorProp='#647acb' bcgProp='#e0e8f9' iconProp={<FaUser />} />
				)
			})}
		</>
	)
}