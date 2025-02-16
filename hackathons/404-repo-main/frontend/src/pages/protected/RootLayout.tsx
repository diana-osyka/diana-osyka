import React from 'react'
import SideBar from '../../components/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import { useAuth } from '../../providers/AuthProvider'
import Navbar from '../../components/Navbar'

const RootLayout = () => {
	// const { token } = useAuth()

	// if (!token) {
	// 	return <Navigate to='/sign-in' />
	// }
	return (
		<div className='w-full '>
			{/* <Navbar /> */}
			<section className='flex flex-1 h-full'>
				<Outlet />
			</section>
			{/* <Footer /> */}
		</div>
	)
}

export default RootLayout
