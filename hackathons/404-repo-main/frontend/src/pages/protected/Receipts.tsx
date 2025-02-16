import React from 'react'
import CardList from '../../components/receipts/CardList'
import { Banknote, ChevronLeft, ChevronRight, SquarePen } from 'lucide-react'
import edit from './../../assets/edit.png'
import BottomBar from '../../components/BottomBar'
import { Link } from 'react-router-dom'

const Receipts = () => {
	const total_price = 650.5
	const [active, setActive] = React.useState(1)
	const buttons = [
		{
			id: 1,
			name: 'Transactions',
		},
		{
			id: 2,
			name: 'Functions',
		},
		{
			id: 3,
			name: 'Info',
		},
	]
	return (
		<div className='w-full relative'>
			<div className='w-full'>
				<div className='w-full h-[140px] bg-[#0CB33F] relative'>
					<div className='bg-[#ffffff] absolute -bottom-14 t w-[90%] m-auto   left-0 right-0 p-4 rounded-xl'>
						<div className='flex flex-row justify-between items-center'>
							<div className=''>
								<p className='text-xl  font-bold'>SPACE účet</p>
								<p className='text-[#0CB33F] font-bold text-2xl'>
									{total_price}€
								</p>
								<p className=''>{total_price}€ own resources</p>
							</div>

							<div className=''>
								<div className='bg-[#0CB33F]/10 rounded-full p-4 flex'>
									<Banknote color='#0CB33F' size={40} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full flex  justify-center'>
					<div className='w-[90%] '>
						<div className='flex flex-row mt-16 gap-2 '>
							{buttons.map(item => (
								<button
									key={item.id}
									className={` p-2 ${
										active === item.id && 'bg-[#ffffff] rounded-lg'
									}`}
									onClick={() => setActive(item.id)}
								>
									<p className='text-[#1A63C1] font-bold'>{item.name}</p>
								</button>
							))}
						</div>

						<div className='bg-white p-4 rounded-xl mt-2 flex flex-row  items-center justify-between'>
							<div className='flex flex-row gap-2 items-center'>
								<SquarePen color='#1A63C1' size={23} />
								<div>
									<p className='font-bold'>Orders & Authorisations</p>
									<p className='text-[#5B656E] text-sm'>
										0 unexecuted orders & 2 authorisations
									</p>
								</div>
							</div>
							<ChevronRight color='#C4C4C4' size={23} />
						</div>

						<div className='w-full flex  justify-center mt-8'>
							<CardList />
						</div>
					</div>
				</div>
			</div>

			<div className='absolute bottom-0 w-full'>
				<BottomBar />
			</div>
		</div>
	)
}

export default Receipts
