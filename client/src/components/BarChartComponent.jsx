// IMPORT RECHARTS COMPONENTS
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


// BAR CHART JSX COMPONENT
export const BarChartComponent = ({data}) => {
	return (
		<ResponsiveContainer width='100%' height={300}>
			<BarChart data={data} margin={{top: 20}}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='date' />
				<YAxis allowDecimals={false} />
				<Tooltip formatter={(value) => [`${value.toLocaleString()}`, "Amount"]} />
				<Bar dataKey='totalAmount' fill='#2cb1bc' barSize={50} />
			</BarChart>
		</ResponsiveContainer>
	)
}