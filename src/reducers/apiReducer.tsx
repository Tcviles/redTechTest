import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OrderType, OrderTypeEnum } from '../utils/types'

const apiKey = 'b7b77702-b4ec-4960-b3f7-7d40e44cf5f4'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://red-candidate-web.azurewebsites.net/',
        headers: {
            'ApiKey': apiKey,
        },
    }),
    endpoints: (builder) => ({
        getOrders: builder.query<OrderType[], void>({
            query: () => ({
                url: `/api/Orders`,
                method: 'GET'
            })
        }),
        putOrder: builder.mutation<void, OrderType>({
            query: (order) => ({
                url: `/api/Orders`,
                method: 'PUT',
                body: order
            })
        }),
        postOrder: builder.mutation<OrderType, OrderType>({
            query: (order) => ({
                url: `/api/Orders`,
                method: 'POST',
                body: order
            })
        }),
        getOrdersByType: builder.query<OrderType[], OrderTypeEnum>({
            query: (orderType) => ({
                url: `/api/Orders/ByType?orderType=${orderType}`,
                method: 'GET'
            })
        }),
        deleteOrdersOnDisc: builder.mutation<void, string[]>({
            query: (orderIds) => ({
                url: `/api/Orders/Delete`,
                method: 'POST',
                body: orderIds
            })
        }),
    }),
})

export const { 
    useGetOrdersQuery,
    usePostOrderMutation,
    usePutOrderMutation,
    useGetOrdersByTypeQuery,
    useDeleteOrdersOnDiscMutation
 } = api
