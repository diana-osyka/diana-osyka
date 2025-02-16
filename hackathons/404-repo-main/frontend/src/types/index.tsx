export type ReceiptProps = {
  id: string,
  price: string,
  organization_name: string,
  date: string,
  municipality: string
}

export type ReceiptInfoType = {
  productId: string,
  eco_score: number,
  carbon_footprint: number,
  work_rate: number,
  local_organization: boolean,
  category: string
}

export type ProductsType = {
  id: string,
  name: string,
  img_url: string
}

