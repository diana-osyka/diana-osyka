import { ProductsType, ReceiptInfoType, ReceiptProps } from '../types'

export const receipts: ReceiptProps[] = [
  {
    id: '1',
    price: '2,97',
    organization_name: 'BILLA s.r.o.',
    date: '2.4.2022 15:09',
    municipality: 'Bratislava - mestská časť Ružinov'
  },
  {
    id: '2',
    price: '100',
    organization_name: 'Kaufland Slovenská republika v.o.s.',
    date: '5.3.2022 13:56',
    municipality: 'Bratislava - mestská časť Ružinov'

  },
  {
    id: '3',
    price: '100',
    organization_name: 'Lidl Slovenská republika, s.r.o.',
    date: '5.3.2022 14:36',
    municipality: 'Bešeňová'
  }
  
]

export const receiptInfo: ReceiptInfoType[] = [{
  productId: '1',
  eco_score: 80,
  carbon_footprint: 100,
  work_rate: 3,
  local_organization: true,
  category: 'Stravovanie'
},
{
  productId: '2',
  eco_score: 40,
  carbon_footprint: 12,
  work_rate: 4,
  local_organization: false,
  category: 'Stravovanie'

},
{
  productId: '3',
  eco_score: 60,
  carbon_footprint: 80,
  work_rate: 2,
  local_organization: true,
  category: 'Zdravie a osobná starostlivosť'
}
]

export const products:ProductsType[] = [
  {
    id: '1',
    name: 'NESTEA CITRÓN 1,5l',
    img_url: 'https://lunys.sk/wp-content/uploads/2022/02/620c6fba4e5ef.jpg'
  },
  {
    id: '2',
    name: 'Šmak majon.400ml',
    img_url:'https://lunys.sk/wp-content/uploads/2020/05/Majone%CC%81za-50-SPAK-5kg.jpg'
  },

  {
    id: '3',
    name: 'Jablko cvikla200ml',
    img_url: 'https://cdn.myshoptet.com/usr/www.emilovesady.sk/user/shop/big/97_cvikla-200ml.png?63527cd9'
  },
  {
    id: '4',
    name: 'margar.Plmarin 250',
    img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6wLfmaeZ3KC_C_HMFTK3EFpaYzKB2ogb-uw&s'
  },
]


