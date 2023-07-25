import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from "zustand/middleware"

export const useStore = create(persist(
    (set, get) => ({
        favList:[],
        handleAddRemoveFav:async (country)=>{
            if(!get().IsCountryExists(country))
                set(state=>({favList:[...state.favList,country]}))
            else
                set(state=>({favList:[...state.favList.filter(coun=>coun.cca2!==country.cca2)]}));
        },
        IsCountryExists:(country)=>{
            let isExists = get().favList.filter(coun=>coun.cca2===country.cca2).length;
            return (isExists===0)?false:true;
        }
    }),
    {
      name: "fav-storage", 
      storage: createJSONStorage(() => AsyncStorage), 
    }
  ))