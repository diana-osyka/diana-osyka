import { ChartNoAxesColumn, Home } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const BottomBar = () => {
	return (
		<div className='bg-[#0CB33F] w-full flex flex-row justify-around p-2'>
			<Link to='/receipts'>
				<div className='flex flex-col items-center'>
					<Home color='#ffffff' size={36} />
					<p className='text-[#ffffff]'>Home</p>
				</div>
			</Link>
			<Link to='/analysis'>
				<div className='flex flex-col items-center'>
					<ChartNoAxesColumn color='#ffffff' size={36} />
					<p className='text-[#ffffff]'>Analysis</p>
				</div>
			</Link>
		</div>
	)
}

export default BottomBar
