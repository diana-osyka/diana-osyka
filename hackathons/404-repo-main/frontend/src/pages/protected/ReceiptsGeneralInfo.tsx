import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { receiptInfo, receipts } from '../../constatns'
// import CircularProgress from '@mui/joy/CircularProgress'
import {
	ChevronLeft,
	ShoppingBag,
	Tag,
	Paperclip,
	Pencil,
	EyeOff,
	Sprout,
	ChevronRight,
	ToggleLeft,
} from 'lucide-react'
import { useGetSimilarProducts } from '../../api'
const ReceiptsGeneralInfo = () => {
	const [isLoading, setIsLoading] = React.useState(false)

	const { id } = useParams()
	if (!id) return <div>404</div>

	const receipt = receipts.find(item => item.id === id)
	const receipt_info = receiptInfo.find(item => item.productId === id)

	if (!receipt || !receipt_info) return <div>404</div>
	const rate = 3

  // useEffect(() => {
  //   const data = useGetSimilarProducts({id: id})
  //   console.log(data);
  // },[])
	return (
		<div className='w-full relative  '>
			<div className='w-full px-4'>
				<div className='bg-white w-full mt-14 p-4 items-center rounded-2xl'>
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

				<div className='bg-white w-full mt-4 p-4 rounded-2xl flex flex-col'>
					<div className='w-full flex flex-row items-center mb-4 justify-between'>
						<div className='flex flex-row items-center'>
							<Tag color='#265DBA' size={24} />
							<div className='border border-[#B6BABD] p-2 px-4 rounded-xl mx-4 '>
								<p className=''>{receipt_info.category}</p>
							</div>
						</div>
						<ChevronRight color='#BBBBBB' size={24} />
					</div>
					<hr
						className='mb-4 w-full self-end h-px'
						style={{ color: '#e5e7eb' }}
					/>
					<div className='w-full flex flex-row items-center bold justify-between'>
						<div className='flex flex-row items-center'>
							<EyeOff color='#265DBA' size={24} />
							<div className='p-2 px-4'>
								<p className='font-bold'>Exclude from analysis</p>
							</div>
						</div>
						<ChevronRight color='#BBBBBB' size={24} />
					</div>
					<hr
						className='my-4 w-full self-end h-px'
						style={{ color: '#e5e7eb' }}
					/>
					<div className='w-full flex flex-row items-center bold'>
						<Sprout color='#265DBA' size={24} />
						<Link to={`/receipts/${id}`}>
							<div className='bg-[#0cb33f] p-2 px-4 rounded-xl mx-4 text-white'>
								<p className='font-bold'>Eco details</p>
							</div>
						</Link>
					</div>
				</div>

				<div className='bg-white w-full mt-4 p-4 rounded-2xl flex flex-col'>
					<div className='w-full flex flex-row items-center bold justify-between'>
						<div className='flex flex-row items-center'>
							<Pencil color='#265DBA' size={24} />
							<div className='p-2 px-4'>
								<p className='font-medium text-[#58697B]'>
									Add note or #hashtag
								</p>
							</div>
						</div>
						<ChevronRight color='#BBBBBB' size={24} />
					</div>
					<hr
						className='my-4 w-full self-end h-px'
						style={{ color: '#e5e7eb' }}
					/>
					<div className='w-full flex flex-row items-center bold justify-between'>
						<div className='flex flex-row items-center'>
							<Paperclip color='#265DBA' size={24} />
							<div className='p-2 px-4'>
								<p className='font-medium text-[#58697B]'>Add attachment</p>
							</div>
						</div>
						<ChevronRight color='#BBBBBB' size={24} />
					</div>
				</div>
			</div>
			<div className='absolute top-0 w-full py-3 bg-white '>
				<div className='relative flex flex-row items-center justify-center w-full'>
					<p className='font-bold text-xl'>Receipt Info</p>

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

export default ReceiptsGeneralInfo
