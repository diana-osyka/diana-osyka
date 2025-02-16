import React, { useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { usePredictTotalPrice, usePredictTotalPriceMutation } from '../../api'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { Navigate } from 'react-router-dom'

const Home = () => {
  
  return <Navigate to='/receipts' />
}

export default Home