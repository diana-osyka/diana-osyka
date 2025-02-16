import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import ProgressBar from '../../components/ProgressBar'
import GraphBar from '../../components/GraphBar'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import CircularProgressBar from '../../components/CircularProgressBar'
import outlined_star from '../../assets/outlined_star.png'
import filled_star from '../../assets/star.png'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Analisis = () => {
	const localReceipt = 12
	const rate = 2

	const advice = [
		{
			id: 1,
			name: '12 square meters of coral reefs',
		},
		{
			id: 2,
			name: '100 hectares of forest',
		},
		{
			id: 3,
			name: '10 turtles’ nesting beaches',
		},
		{
			id: 4,
			name: '14 square meters of ice intact in the Arctic',
		},
	]
	return (
		<div className='w-full relative'>
			<div className='mx-4 mt-14'>
				<div className='bg-white p-6 rounded-2xl'>
					<p className='text-lg font-bold mb-1'>Eco-score</p>
					<div className=''>
						<GraphBar />
					</div>
					<div className='flex flex-row justify-between mt-4 mb-2'>
						<p className='font-bold'>Your Eco-Score</p>
						<p className='font-bold'>November 2024</p>
					</div>
					<ProgressBar value={50} />
				</div>
				{/* <CircularProgress value={75} /> */}
				<div className='flex flex-row gap-2 mt-4'>
					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold'>CO2</p>
						<CircularProgressBar
							value={12}
							size={70}
							color='#0CB33F'
							textSize={14}
						/>
						<p className='mt-2  text-sm'>18232.20t</p>
					</div>
					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold'>Water</p>
						<CircularProgressBar
							value={44}
							size={70}
							color='#3D7DEB'
							textSize={14}
						/>
						<p className='mt-2 text-sm'>1152.20l</p>
					</div>

					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold'>Energy</p>
						<CircularProgressBar
							value={72}
							size={70}
							color='#7A27E3'
							textSize={14}
						/>
						<p className='mt-2  text-sm'>12332.20kWh</p>
					</div>
				</div>

				<div className='flex flex-row gap-2 mt-4'>
					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold text-xs'>Reputation of companies</p>
						<div className='flex flex-row gap-1'>
							{[...Array(rate)].map((_, index) => (
								<img
									key={index}
									src={filled_star}
									alt='star'
									className='w-5 h-5'
								/>
							))}
							{[...Array(5 - rate)].map((_, index) => (
								<img
									key={index}
									src={outlined_star}
									alt='star'
									className='w-5 h-5'
								/>
							))}
						</div>
					</div>
					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold text-xs'>Local businesses</p>
						{/* <input
						type='checkbox'
						className='w-5 h-5 checked:bg-primary checked:border-[#0CB33F]'
						checked={true}
					/> */}
						<div className='w-full flex flex-row items-center gap-1'>
							<p>{localReceipt}%</p>
							<div
								className='bg-[#109F1B] w-full h-2 '
								style={{ width: `${localReceipt}%` }}
							></div>
						</div>
					</div>
				</div>

				<div>
					<p className='font-bold my-2'>This month you saved:</p>
					{advice.map(item => (
						<Link to={`/product/${item.id}`}>
							<div key={item.id}>
								<div className='flex flex-row justify-between items-center bg-white p-4 px-3 border-b border-[#C4C4C4]  '>
									<div className='flex flex-row items-center gap-3'>
										<Check color='#0cb33f' size={24} />
										<p className='text-base'>{item.name}</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className='absolute top-0 w-full py-2 bg-white '>
				<div className='relative flex flex-row items-center justify-center w-full'>
					<p className='font-bold text-xl'>Analysis</p>

					<div className='absolute left-4'>
						<Link to='/receipts'>
							<ChevronLeft color='#000000' size={35} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Analisis
