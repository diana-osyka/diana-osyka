import React from 'react'
import Card from './Card'
import { receipts } from '../../constatns'

const CardList = () => {
  
  return (
    <div className='flex flex-col w-full gap-2 overflow-hidden bg-white rounded-xl '>

      {receipts.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          price={item.price}
          organization_name={item.organization_name}
          date={item.date}
          municipality={item.municipality}
        />
      ))}
    </div>
  )
}

export default CardList