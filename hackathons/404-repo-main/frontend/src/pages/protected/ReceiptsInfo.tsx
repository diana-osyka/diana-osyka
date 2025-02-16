import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { receiptInfo, receipts } from '../../constatns'
// import CircularProgress from '@mui/joy/CircularProgress'
import {
	ChevronLeft,
	ChevronRight,
	ShoppingBag,
	SquarePen,
	Tag,
} from 'lucide-react'
import CircularProgressBar from '../../components/CircularProgressBar'

import outlined_star from '../../assets/outlined_star.png'
import filled_star from '../../assets/star.png'
const ReceiptsInfo = () => {
	const { id } = useParams()
	if (!id) return <div>404</div>
	const products = [
		{
			id: 1,
			name: 'NESTEA CITRÓN 1,5l',
		},
		{
			id: 2,
			name: 'Šmak majon.400ml',
		},
		{
			id: 3,
			name: 'Jablko cvikla200ml',
		},
		{
			id: 4,
			name: 'margar.Plmarin 250',
		},
	]
	const localReceipt = 89
	const receipt = receipts.find(item => item.id === id)
	const receipt_info = receiptInfo.find(item => item.productId === id)

	if (!receipt || !receipt_info) return <div>404</div>
	const rate = 5

	return (
		<div className='w-full relative  '>
			<div className='w-full px-4 mt-16'>
				<div className='bg-white w-full  p-4 items-center rounded-2xl'>
					<div className='flex flex-col gap-2'>
						<div className='flex flex-row justify-between items-center'>
							<div>
								<p className='uppercase font-bold text-lg'>
									{receipt.organization_name}
								</p>
								<p className='text-2xl font-bold'>-{receipt.price}€</p>
							</div>
							<div className='p-4 bg-[#0CB33F]/10 rounded-full '>
								<ShoppingBag color='#0CB33F' />
							</div>
						</div>
						<div className='bg-[#E8F5FF] p-2 w-fit rounded-lg px-4'>
							<p className='text-[#265DBA] text-base'>Share</p>
						</div>
					</div>
				</div>

				<div className='bg-white w-full mt-4 p-4 rounded-2xl flex flex-row items-center justify-between'>
					<Tag color='#265DBA' size={24} />
					<div className='border border-[#B6BABD] p-2 px-4 rounded-xl'>
						<p className=''>{receipt_info.category}</p>
					</div>
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
						<p className='mt-2  text-sm'>132.20t</p>
					</div>
					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold'>Water</p>
						<CircularProgressBar
							value={5}
							size={70}
							color='#3D7DEB'
							textSize={14}
						/>
						<p className='mt-2 text-sm'>115.20l</p>
					</div>

					<div className='bg-white flex-1 p-2 px-4 flex flex-col items-center rounded-xl'>
						<p className='mb-2 font-bold'>Energy</p>
						<CircularProgressBar
							value={12}
							size={70}
							color='#7A27E3'
							textSize={14}
						/>
						<p className='mt-2  text-sm'>232.20kWh</p>
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
					<p className='font-bold my-2'>Products</p>
					{products.map(item => (
						<Link to={`/product/${item.id}/${id}`} key={item.id}>
							<div >
								<div className='flex flex-row justify-between items-center bg-white p-4 px-3 border-b border-[#C4C4C4]  '>
									<div className='flex flex-row items-center gap-3'>
										<SquarePen color='#265DBA' size={24} />
										<p className='text-base'>{item.name}</p>
									</div>
									<ChevronRight size={18} color='#C4C4C4' />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className='absolute top-0 w-full py-3 bg-white '>
				<div className='relative flex flex-row items-center justify-center w-full'>
					<p className='font-bold text-xl'>EcoScore</p>

					<div className='absolute left-4'>
						<Link to={`/receipts-gen/${id}`}>
							<ChevronLeft color='#000000' size={35} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReceiptsInfo
