// IMPORT ROUTER COMPONENTS
import { Link, useLocation, useNavigation } from 'react-router-dom'
// IMPORT CUSTOM HOOK
import { useAllExpensesContext } from '../../pages/expenses/AllExpensesPage.jsx'
// IMPORT REACT ICONS
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
// IMPORT STYLED COMPONENTS
import { StyledPaginationButtonsComponent } from '../../styled_components/StyledPaginationButtonsComponent.js'


export const PaginationButtonsExpensesComponent = () => {

	/* get the data from the global context */
	const { data: { numOfPages, currentPage } } = useAllExpensesContext()

	/* construct page buttons */
	const pages = Array.from (
		{
			length: numOfPages,
		},
		(_, index) => {return index + 1} /* "_" means we are going to access the undefined; "+1" because arrays are zero-indexed */
	)

	return (
		<StyledPaginationButtonsComponent>
			<button className='btn prev-btn'>
				<HiChevronDoubleLeft />
				prev
			</button>
			<div className='btn-container'>
				{pages.map((i) => {
					return (
						<button key={i} className={`btn page-btn ${i === currentPage && 'active'}`}>
							{i}
						</button>
					)
				})}
			</div>
			<button className='btn next-btn'>
				<HiChevronDoubleRight />
				next
			</button>
		</StyledPaginationButtonsComponent>
	)
}