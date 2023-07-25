import { View, Text, ImageBackground,useColorScheme, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SIZES,COLORS } from '../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { fetchCountryBanner } from '../../api/restcountries';
import { useStore } from '../store/useStore'

const DetailsPageHeader = ({name,country,onBackPress}) => {
    const {handleAddRemoveFav,IsCountryExists,favList} = useStore();
    const scheme = useColorScheme();
    const COL = COLORS[scheme]
    const IsFav = IsCountryExists(country);
    const [IsLoading,setIsLoading] = useState(true);
    const[banner,setBannerSrc] = useState(null)
    useEffect(()=>{
        const fetch = async ()=>{
            const src = await fetchCountryBanner(name)
            setBannerSrc(src)
        }
        if(name)
            fetch()
       
       },[name])
    //console.log(source)
    const HeaderButtonRender =()=>{
        return(
            <>
                <TouchableWithoutFeedback onPress={()=>onBackPress()}>
                    <View style={{
                        backgroundColor:COL.white,
                        width:SIZES.width/12,
                        height:SIZES.width/12,
                        borderRadius:2*SIZES.width,
                        justifyContent:'center',
                        alignItems:'center',
                        marginRight:'auto'
                    }}>
                        <Icon name="chevron-back" color={COL.IconColor} size={SIZES.text.lg}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{
                    handleAddRemoveFav(country)
                }}>
                    <View style={{
                        backgroundColor:'transparent',
                        width:SIZES.width/12,
                        height:SIZES.width/12,
                        borderRadius:2*SIZES.width,
                        justifyContent:'center',
                        alignItems:'center',
                        marginLeft:'auto'
                    }}>
                        <Icon name={IsFav?"md-heart":"heart-outline" } color={'red'} size={SIZES.text.lg}/>
                    </View>
                </TouchableWithoutFeedback>
            </>
        )
    }
  return (
    <>

    {(banner)?<ImageBackground 
      source={{uri:banner.large}}
      loadingIndicatorSource={{uri:banner.tiny}}
      onLoad={()=>setTimeout(()=>setIsLoading(false),500)}
      blurRadius={IsLoading?30:0}
      style={{
        paddingHorizontal:SIZES.padding.m,
        flexDirection:'row',
        alignItems:'flex-start',
        paddingTop:SIZES.padding.s,
        paddingBottom:SIZES.padding.m,
        backgroundColor:banner.avgColor,
        height:2.3*SIZES.height/7
      }}>
        <HeaderButtonRender/>
      </ImageBackground>:
      <View 
        style={{
            paddingHorizontal:SIZES.padding.m,
            flexDirection:'row',
            alignItems:'flex-start',
            paddingTop:SIZES.padding.s,
            paddingBottom:SIZES.padding.m,
            backgroundColor:'gray',
            height:2.3*SIZES.height/7,
            backgroundColor:banner?banner.avgColor:'lightgray',
            blurRadius:40
      }}>
        <HeaderButtonRender/>
    </View>}
    </>
  )
}

export default DetailsPageHeader