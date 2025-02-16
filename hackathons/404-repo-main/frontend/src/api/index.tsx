// src/api/index.ts
import { useQuery, useMutation } from '@tanstack/react-query'

import { useAuth } from '../providers/AuthProvider'

export interface LoginResponse {
	access_token: string
  username: string
}
export interface PredictionResponse {
  predicted_total_price: number
}

export const useLogin = async (
	username: string,
	password: string
): Promise<LoginResponse> => {
  console.log(username);
	const formDetails = new URLSearchParams()
	formDetails.append('username', username)
	formDetails.append('password', password)

	const response = await fetch('/api/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: formDetails,
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.detail || 'Authentication failed')
	}

	return await response.json()
}

export const useRegister = async (
	username: string,
	password: string
): Promise<void> => {
	const response = await fetch('/api/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.detail || 'Registration failed')
	}
}
export const useVerifyToken = async (token: string): Promise<void> => {
	const response = await fetch(`/api/verify-token/${token}`)
	if (!response.ok) {
		throw new Error('Token verification failed')
	}
}

export const useGetUser = async (token: string): Promise<void> => {
  const response = await fetch(`/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error('User retrieval failed')
  }
}

export const usePredictTotalPrice = () => {
  const { token } = useAuth();

  const predictTotalPrice = async (
    tax_base_basic: number,
    tax_base_reduced: number,
    vat_amount_basic: number,
    vat_amount_reduced: number,
    price: number,
    vat_rate: number
  ): Promise<PredictionResponse> => {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tax_base_basic,
        tax_base_reduced,
        vat_amount_basic,
        vat_amount_reduced,
        price,
        vat_rate,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Prediction failed');
    }

    return await response.json();
  };

  return { predictTotalPrice };
};


type PredictionRequest = {
  tax_base_basic: number
  tax_base_reduced: number
  vat_amount_basic: number
  vat_amount_reduced: number
  price: number
  vat_rate: number
}
export const usePredictTotalPriceMutation = () => {
  const { predictTotalPrice } = usePredictTotalPrice();

  return useMutation({
    mutationFn: async (data: PredictionRequest) => {
      return await predictTotalPrice(
        data.tax_base_basic,
        data.tax_base_reduced,
        data.vat_amount_basic,
        data.vat_amount_reduced,
        data.price,
        data.vat_rate
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetSimilarProducts = ({id}: {id:string}) => {

  return useQuery({
    queryKey: ['similarProducts',id],
    queryFn: async () => {
      console.log("here");
      const response = await fetch(`/api/get-average/${id}`)

      if (!response.ok) {
        throw new Error('Similar products retrieval failed')
      }
      return await response.json()
    }
  })
}  