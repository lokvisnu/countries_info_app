import { View, Text ,useColorScheme, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons'
const HomeHeader = ({onSearchPress,FavOnPress}) => {
    const scheme = useColorScheme();
    return (
      <View style={{
        paddingHorizontal:SIZES.padding.m,
        flexDirection:'column',
        alignItems:'flex-start',
        paddingTop:SIZES.padding.s,
        paddingBottom:SIZES.padding.m,
        backgroundColor:COLORS[scheme].HomeHeaderColor,
        shadowColor: COLORS[scheme].whiteC,
        elevation:10
      }}>
        <View style={{
          flexDirection:'row',
          justifyContent:'flex-start',
          alignItems:'center',
          width:SIZES.width-2*SIZES.padding.m
        }}>
          <Text style={{
            color:COLORS[scheme].white,
            fontSize:SIZES.text.lg,
            fontWeight:'700',
          }}>
            {`Explore.\nDiscover.\n`}
            <Text style={{color:COLORS[scheme].black}}>
              Different Countries.
            </Text>
          </Text>
          <TouchableWithoutFeedback onPress={FavOnPress}>
            <View 
            style={{
              backgroundColor:COLORS[scheme].white,
              width:SIZES.width/12,
              height:SIZES.width/12,
              borderRadius:2*SIZES.width,
              justifyContent:'center',
              alignItems:'center',
              marginLeft:'auto',
            }}>
              <Icon name="heart-sharp" color={COLORS[scheme].IconColor} size={SIZES.text.lg}/>
            </View>
            </TouchableWithoutFeedback>
          
        </View>
        <TouchableWithoutFeedback onPress={()=>onSearchPress()}>
          <View style={{
            backgroundColor:COLORS[scheme].SearchBarBG,
            borderRadius:SIZES.borderRadius.s,
            paddingVertical:SIZES.padding.xs,
            paddingHorizontal:SIZES.padding.s,
            marginTop:SIZES.padding.lg,
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center' ,
            width:SIZES.width - 2*SIZES.padding.m,
            height:40
            }}>
            {/*Search Bar*/}
            <Icon name="search"  size={SIZES.text.lg} color={COLORS[scheme].blackC} style={{opacity:0.6}}/>
            <Text style={{
              fontSize:SIZES.text.m,
              color:COLORS[scheme].blackC,
              marginLeft:SIZES.padding.m,
              fontWeight:'500',
              opacity:0.6
            }}>Search Countries</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

    
  )
}

export default HomeHeader