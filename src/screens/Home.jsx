import { View, Text, StatusBar, useColorScheme, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS,SIZES } from '../../constants/theme'
import HomeHeader from '../components/HomeHeader'
import CountryCard from '../components/CountryCard'
import { useGlobalStore } from '../store/useGlobalStore'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import Icon from 'react-native-vector-icons/Ionicons'

const Home = ({navigation}) => {
  const scheme = useColorScheme();
  const COL = COLORS[scheme]

  const{countryList:countriesList,getCountryList,isLoading} = useGlobalStore()

const CountryOnPress = (id)=>{
  navigation.navigate('Details',{
    countryId:id
  })
}
const FavOnPress =()=>{
  navigation.navigate('Favorite');
}
 useEffect(()=>{ 
  getCountryList()
 },[getCountryList])

 const onSearchPress = ()=>{
  navigation.navigate('Search');
 }
 const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
 const CountryCardLoading =()=>{
  return(
    <View style={{
      backgroundColor:COL.countryListItemBG,
      paddingHorizontal:SIZES.padding.xl,
      paddingVertical:SIZES.padding.lg,
      flexDirection:'row',
      justifyContent:'flex-start',
      alignItems:'center',
      shadowColor:COL.black,
      elevation:5,
      marginBottom:SIZES.padding.s,
      borderRadius:SIZES.borderRadius.s,
  }}>
      <ShimmerPlaceHolder style={{
        width:SIZES.width*0.142,
        height:SIZES.width*0.142,
        borderRadius:SIZES.width
      }}/>
      <View style={{
        flexDirection:'column',
        flex:9,
        marginLeft:SIZES.padding.s
      }}>
        <ShimmerPlaceHolder style={{
          width:150,
          height:20,
          marginBottom:SIZES.padding.xs
        }}/>
         <ShimmerPlaceHolder style={{
          width:100,
          height:20
        }}/>
      </View>
        <Icon name="heart-outline" color={COL.blackC} size={SIZES.text.lg} style={{marginLeft:'auto'}}/>
    </View>
  )
 }
  return (
   <SafeAreaView style={{
    flex:1,
    backgroundColor:COL.primaryBG
   }}>
    <StatusBar backgroundColor={COL.HomeHeaderColor}/>
    <HomeHeader onSearchPress={onSearchPress} FavOnPress={FavOnPress}/>
    {!isLoading?
    <FlatList 
    style={{
      flex:1,
    }}
    contentContainerStyle={{
      paddingHorizontal:SIZES.padding.m,
      paddingTop:SIZES.padding.m,
    }}
    data={countriesList}
    renderItem={({item})=>(
      <CountryCard country={item} onPress={CountryOnPress}/>
    )}/>:
    <FlatList 
      style={{
        flex:1,
      }}
      contentContainerStyle={{
        paddingHorizontal:SIZES.padding.m,
        paddingTop:SIZES.padding.m,
      }}
      data={new Array(10)}
      renderItem={()=><CountryCardLoading/>}
    />}
    
   </SafeAreaView>
  )
}

export default Home