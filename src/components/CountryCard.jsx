import { View, Text,TouchableWithoutFeedback, useColorScheme, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { useStore } from '../store/useStore'

const CountryListItem = ({country,onPress}) => {
    const scheme = useColorScheme();
    const COL = COLORS[scheme]
    const {handleAddRemoveFav,IsCountryExists} = useStore();
    const IsFav = IsCountryExists(country);
  return (
    <TouchableWithoutFeedback 
      onPress={()=>onPress(country.cca2)}>
        <View style={{
            backgroundColor:COL.countryListItemBG,
            paddingHorizontal:SIZES.padding.xl,
            paddingVertical:SIZES.padding.lg,
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center',
            shadowColor:COL.black,
            elevation:4,
            marginBottom:SIZES.padding.s,
            borderRadius:SIZES.borderRadius.s,
        }}>
            <View style={{
              overflow:'hidden',
              width:SIZES.width*0.142,
              height:SIZES.width*0.142,
              borderRadius:SIZES.width,
              
            }}>
              <Image source={{uri:(country.flags.png)?country.flags.png:''}} style={{
                width:'100%',
                height:'100%',
                resizeMode:'cover'
              }}/>
            </View>
            <View style={{
              flexDirection:'column',
              flex:9,
              marginLeft:SIZES.padding.s
            }}>
              <Text style={{
                fontSize:SIZES.text.m,
                fontWeight:'500',
                color:COL.blackC
              }}>{country.name.common}</Text>
               <Text style={{
                fontSize:SIZES.text.s,
                fontWeight:'300',
                color:COL.blackC
              }}>{country.region}</Text>
            </View>
            <TouchableWithoutFeedback onPress={()=>{
              handleAddRemoveFav(country);
            }}>
                <Icon 
                  name={IsFav?"md-heart":"heart-outline" }
                  color={COLORS[scheme].blackC} 
                  size={SIZES.text.lg} 
                  style={{
                    marginLeft:'auto'
                  }}/>
            </TouchableWithoutFeedback>
            
        </View>
    </TouchableWithoutFeedback>
    
  )
}

export default CountryListItem