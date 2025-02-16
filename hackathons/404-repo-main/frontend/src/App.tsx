import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './pages/auth/AuthLayout'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import RootLayout from './pages/protected/RootLayout'
import Home from './pages/protected/Home'
import Receipts from './pages/protected/Receipts'
import ReceiptsInfo from './pages/protected/ReceiptsInfo'
import Analisis from './pages/protected/Analisis'
import ReceiptsGeneralInfo from './pages/protected/ReceiptsGeneralInfo'
import ProductInfo from './pages/protected/ProductInfo'

function App() {
	return (
		<div className='flex h-screen'>
			<Routes>
				{/* <Route element={<AuthLayout />}>
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/sign-up' element={<SignUp />} />
				</Route> */}

				<Route element={<RootLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/receipts' element={<Receipts />} />
					<Route path='/receipts/:id' element={<ReceiptsInfo />} />
					<Route path='/analysis' element={<Analisis />} />
					<Route path='/receipts-gen/:id' element={<ReceiptsGeneralInfo />} />
          <Route path='/product/:id/:transaction_id' element={<ProductInfo />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
