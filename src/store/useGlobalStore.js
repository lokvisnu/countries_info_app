import { create } from "zustand";
import { fetchAllCountriesSearch } from "../../api/restcountries";


export const useGlobalStore = create((set,get)=>({
    countryList:[],
    isLoading:true,
    getCountryList: async ()=>{
        const countryList = await fetchAllCountriesSearch();
        set(()=>({countryList:countryList,isLoading:false}))
    },
}))
