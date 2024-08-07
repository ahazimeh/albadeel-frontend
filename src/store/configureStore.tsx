import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://albadeel.co",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as any).product?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
    login: builder.mutation<any, any>({
      query: (name) => {
        return {
          url: "/login",
          method: "POST",
          body: name,
        };
      },
    }),
    register: builder.mutation<any, string>({
      query: (name) => {
        return {
          url: "register",
          method: "POST",
          body: name,
        };
      },
    }),
    getAlternative: builder.query<any, any>({
      query: (body) => {
        return {
          url: `getAlternative?${body}`,
          method: "GET",
        };
      },
    }),
    getAlternativeProducts: builder.query<any, any>({
      query: (body) => {
        return {
          url: `getAlternativeProducts?${body}`,
          method: "GET",
        };
      },
    }),
    getProduct: builder.query<any, any>({
      query: (barcode) => {
        return {
          url: `getProduct/${barcode}`,
          method: "GET",
        };
      },
    }),
    getAlternativeId: builder.query<any, any>({
      query: (body) => {
        if (body.brand)
          return {
            url: `getAlternativeId?text=${body.name}&brand=${body.brand}`,
          };
        return {
          url: `getAlternativeId?text=${body.name}`,
        };
      },
    }),
    getBrand: builder.query<any, any>({
      query: (name) => {
        return {
          url: `brand?brand=${name}`,
        };
      },
    }),
    getBrandInfo: builder.query<any, any>({
      query: (brand) => {
        return {
          url: `brand?brand=${brand}`,
        };
      },
    }),
    getBrands: builder.query<any, any>({
      query: (brand) => {
        return {
          url: `brands?text=${brand}`,
        };
      },
    }),

    getAlternativeBrand: builder.query<any, any>({
      query: (body) => {
        return {
          url: `getAlternativeBrand?${body}`,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetAlternativeQuery,
  useLazyGetAlternativeQuery,
  useLazyGetProductQuery,
  useLazyGetAlternativeIdQuery,
  useLazyGetBrandQuery,
  useLazyGetAlternativeProductsQuery,
  useGetBrandsQuery,
  useGetBrandInfoQuery,
  useLazyGetAlternativeBrandQuery,
} = pokemonApi;
