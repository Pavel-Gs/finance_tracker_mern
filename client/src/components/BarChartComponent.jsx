// IMPORT RECHARTS COMPONENTS
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// IMPORT DAYJS FUNCTIONS (FOR DATE FORMATTING)
import dayjs from 'dayjs'


// BAR CHART JSX COMPONENT
export const BarChartComponent = ({data}) => {

	/* function to format the date to short month format */
	const formatMonth = (date) => dayjs(date).format('MMM')
	
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data} margin={{top: 20}}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' tickFormatter={formatMonth} />
				<YAxis allowDecimals={false} />
				<Tooltip formatter={(value) => [`${value.toLocaleString()}`, "Amount"]} />
				<Bar dataKey='totalAmount' fill='#2cb1bc' barSize={50} />
			</BarChart>
		</ResponsiveContainer>
	)
}