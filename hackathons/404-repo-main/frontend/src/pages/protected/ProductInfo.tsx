import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../../constatns'
import { ChevronLeft, Check, X } from 'lucide-react'
import ProgressBar from '../../components/ProgressBar'
import outlined_star from '../../assets/outlined_star.png'
import filled_star from '../../assets/star.png'
import CircularProgressBar from '../../components/CircularProgressBar'
const ProductInfo = () => {
	const { id, transaction_id } = useParams()
	const product = products.find(item => item.id === id)

	if (!product) return <div>404</div>
	const isLocal = true
	const rate = 2
	return (
		<div className='w-full relative'>
			<div className='w-full px-5'>
				<div className=' mt-16 bg-white rounded-xl overflow-hidden p-12 relative'>
					<div className='absolute top-3 left-6 font-bold'>
						<p>{product.name}</p>
					</div>
					<div className='w-full flex items-center justify-center '>
						<img src={product.img_url} className='w-full object-cover' />
					</div>
					{/* <div className='flex flex-row items-center justify-between'>
          <p className='text-sm'>{product.name}</p>
          <div className='bg-[#3D71FB] p-2'>
            <p className='text-white w-fit text-sm'>See alternatives</p>
          </div>
        </div> */}
				</div>

				<p className='font-bold text-lg mt-3'>Eco-Score of this product </p>
				<ProgressBar value={49} />

				<div>
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
							<p className='mb-2 font-bold text-xs'>Company's reputation</p>
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
							<p className='mb-2 font-bold text-xs'>Local business</p>
							{/* <input
						type='checkbox'
						className='w-5 h-5 checked:bg-primary checked:border-[#0CB33F]'
						checked={true}
					/> */}
							<div>{isLocal ? <Check color='#0cb33f' size={24} /> : <X />}</div>
						</div>
					</div>
				</div>
			</div>

			<div className='absolute top-0 w-full py-3 bg-white '>
				<div className='relative flex flex-row items-center justify-center w-full'>
					<p className='font-bold text-xl'>Eco-score analysis</p>

					<div className='absolute left-4'>
						<Link to={`/receipts/${transaction_id}`}>
							<ChevronLeft color='#000000' size={35} />
						</Link>
					</div>
				</div>
			</div>

			<div className='w-full absolute bottom-4'>
        <div className='mx-2'>
          <div className='w-full   bg-[#109F1B] p-2 rounded-xl '>
            <p className='text-white text-xl text-center'>See alternatives </p>
          </div>

        </div>
			</div>
		</div>
	)
}

export default ProductInfo
