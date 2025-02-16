import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ReceiptProps } from '../../types'
import { formatDate } from '../../utils'

type Props = {
	id: string
	price: string
	// vat_amount: string
	organization_name: string
	date: string
}
const Card = ({
	id,
	price,
	organization_name,
	date,
	municipality,
}: ReceiptProps) => {
	const fresh_img =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3gDEf9mi6qUiYZGiuD2TFQJbsPQV5F3D9Q&s'
	const kaufland_logo =
		'https://upload.wikimedia.org/wikipedia/commons/6/65/Kaufland_Deutschland.png'
	// const

	// const handleClick = () => {
	//   console.log("here");
	//   return <Navigate to={`/receipts/${id}`} />
	// }

	const formattedDate = formatDate(date)
	return (
		<Link to={`/receipts-gen/${id}`}>
			<div className='flex flex-row  py-2 px-4 gap-2 w-full cursor-pointer border-b border-[#C4C4C4] items-center'>
				<img
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3gDEf9mi6qUiYZGiuD2TFQJbsPQV5F3D9Q&s'
					className='h-4'
				/>
				<div className='w-full flex flex-row justify-between items-center'>
					<div className='flex flex-col w-full'>
						<div className='w-5/6 '>
							<div className='flex flex-row items-center gap-2'>
								<div className='bg-[#0964F3] h-2 w-2 rounded-full'></div>
								<p className='text-base truncate text-ellipsis font-bold'>
									{organization_name.substring(0, 30)}
								</p>
							</div>
						</div>
						<p className='text-sm'>{formattedDate}</p>
					</div>
					<div className=''>
						<p className='font-bold'>-{price}€</p>
					</div>
				</div>
				{/* <p>{name}</p> */}
				{/* <p>{vat_amount}</p> */}
			</div>
		</Link>
	)
}

export default Card
