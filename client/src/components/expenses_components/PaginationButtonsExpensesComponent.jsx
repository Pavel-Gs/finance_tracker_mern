// IMPORT ROUTER COMPONENTS
import { Link, useLocation, useNavigate } from 'react-router-dom'
// IMPORT CUSTOM HOOK
import { useAllExpensesContext } from '../../pages/expenses/AllExpensesPage.jsx'
// IMPORT REACT ICONS
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
// IMPORT STYLED COMPONENTS
import { StyledPaginationButtonsComponent } from '../../styled_components/StyledPaginationButtonsComponent.js'


// PAGINATION BUTTONS EXPENSES JSX COMPONENT
export const PaginationButtonsExpensesComponent = () => {

	/* get the data from the global context */
	const { data: { numOfPages, currentPage } } = useAllExpensesContext()

	/* construct page buttons */
	const pages = Array.from(
		{
			length: numOfPages,
		},
		(_, index) => { return index + 1 } /* "_" means we are going to access the undefined; "+1" because arrays are zero-indexed */
	)

	/* handle page change logic */
	const { search, pathname } = useLocation()
	const navigate = useNavigate()
	const handlePageChange = (i) => {
		const searchParams = new URLSearchParams(search)
		searchParams.set('page', i)
		navigate(`${pathname}?${searchParams.toString()}`)
	}

	/* limit pagination buttons display */
	const addPageButton = ({ i, activeClass }) => {
		return (
			<button key={i} className={`btn page-btn ${activeClass && 'active'}`} onClick={() => handlePageChange(i)}>
				{i}
			</button>
		)
	}
	const renderPageButtons = () => {
		const pageButtons = []
		/* first page button */
		pageButtons.push(addPageButton({ i: 1, activeClass: currentPage === 1 }))
		/* display dots */
		if (currentPage > 3) {
			pageButtons.push(<span className='page-btn dots' key='dots-1'>...</span>)
		}
		/* one page before */
		if (currentPage !== 1 && currentPage !== 2) {
			pageButtons.push(addPageButton({ i: currentPage - 1, activeClass: false }))
		}
		/* current page button */
		if (currentPage !== 1 && currentPage !== numOfPages) {
			pageButtons.push(addPageButton({ i: currentPage, activeClass: true }))
		}
		/* one page after */
		if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
			pageButtons.push(addPageButton({ i: currentPage + 1, activeClass: false }))
		}
		/* display dots */
		if (currentPage < numOfPages - 2) {
			pageButtons.push(<span className='page-btn dots' key='dots+1'>...</span>)
		}
		/* last page button */
		pageButtons.push(addPageButton({ i: numOfPages, activeClass: currentPage === numOfPages }))
		return pageButtons
	}

	return (
		<StyledPaginationButtonsComponent>

			{/* prev button */}
			<button className='btn prev-btn' onClick={() => {
				let prevPage = currentPage - 1
				if (prevPage < 1) prevPage = numOfPages
				handlePageChange(prevPage)
			}}>
				<HiChevronDoubleLeft />
				prev
			</button>

			{/* page buttons */}
			<div className='btn-container'>
				{renderPageButtons()}
			</div>

			{/* next button */}
			<button className='btn next-btn' onClick={() => {
				let nextPage = currentPage + 1
				if (nextPage > numOfPages) nextPage = 1
				handlePageChange(nextPage)
			}}>
				<HiChevronDoubleRight />
				next
			</button>
		</StyledPaginationButtonsComponent>
	)
}