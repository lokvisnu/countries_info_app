import axios from 'axios'
import React,{useState} from 'react'
import { createClient } from 'pexels'
import { LOG } from '../Log'
const baseURL = 'https://restcountries.com/v3.1'
const allCountriesFetchURL = `${baseURL}/all`
const CountryFetchURL = `${baseURL}/alpha`

const makeRequest = async (url,params)=>{
    try{
        const response = await axios.get(url,{params})
        if(response.status===200)
            return response.data
        else
            throw new Error('Request Failed')
    }
    catch(error){
        LOG(error,'Make Request')
        const response = await makeRequest(url,params)
        return response
    }
    
}

/*export const fetchAllCountries = async ()=>{
    try{
        let data = await makeRequest(allCountriesFetchURL,{fields:{fields:'name,,cca2,region,flags'}})
        let res = data.map((item)=>{
           
            return {
            id:item.cca2,
            flagSrc:item.flags.png,
            name:item.name.common,
            officialName:item.name.official,
            region:item.region
        }})
        return res;
    }
    catch(error){
        console.log(error)
    }
    
}*/
export const fetchAllCountriesSearch = async ()=>{
    try{
        let data = await makeRequest(allCountriesFetchURL,{fields:'name,independent,tld,cca2,currencies,idd,capital,region,languages,latlng,area,population,flags,maps,car,timezones,continents,capitalInfo'})
        data = await formatMultipleCountries(data)
        return data;
    }
    catch(error){
        console.log(error)
    }
}
const formatMultipleCountries = async (data)=>{
    //Formatting Multiple Country List
    let newData = [];
    for(var i =0;i<data.length;i++){
        let newItem = await formatCountryData(data[i]);
        newData.push(newItem)
    }
    return newData
}
const formatCountryData = async (data)=>{
    //converting Currency Object to Array
    let currArr = Object.values(data.currencies);
    let currencies = [];
    currArr.forEach(cur=>{
        cur = Object.values(cur);
        cur = `${cur[0]}(${cur[1]})`
        currencies.push(cur)
    })
    //formatting Languages to array
    let languages = Object.values(data.languages);
    //fromatting Country Pfone Codes
    let ph_r = data.idd.root;
    let idd = []
    data.idd.suffixes.forEach(i=>idd.push(ph_r+i))
    //Independent
    let ind = data.independent;

    //LOG(typeof data.independent == 'boolean')
    data = {...data,currencies:currencies,languages:languages,idd:idd,independent:`${ind}`}
    return data
}

export const fetchCountryBanner = async (query)=>{
    // Fetch Country Banner from Free Pexels API
    const client = createClient('fj0iVDCM5VHBBKomgwV9xcczKBbmNhwUMdmdnbIfLtUsbwnw4s2h3ZNG');
    let photos = await client.photos.search({ query:`${query}`, per_page: 1 });
    if(photos.photos.length<=0)
        photos = await client.photos.search({ query:`country landscape`, per_page: 1 });
   // console.log(`${query} ${photos.photos[0].src.original}`)
    return {large:photos.photos[0].src.original,tiny:photos.photos[0].src.tiny,avgColor:photos.photos[0].avg_color};
}
