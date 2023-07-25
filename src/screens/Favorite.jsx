import { View, Text, useColorScheme,FlatList ,SafeAreaView,StatusBar,TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme';
import CountryCard from '../components/CountryCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { useStore } from '../store/useStore';

const Favorite = ({navigation}) => {
const scheme = useColorScheme();
const COL = COLORS[scheme]
// Fav List
const {favList} = useStore();
const CountryOnPress = (id)=>{
    navigation.navigate('Details',{
      countryId:id
    })
  }
return (
    <SafeAreaView style={{
     flex:1,
     backgroundColor:COL.primaryBG
    }}>
        <View style={{
            backgroundColor:COL.whiteC,
            paddingVertical:SIZES.padding.m*1.2,
            paddingHorizontal:SIZES.padding.m,
            elevation:4,
            shadowColor:COL.black,
            flexDirection:'row',
            justifyContent:'flex-start',
            alignItems:'center'
        }}>
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <View style={{
                        backgroundColor:COL.blackC,
                        width:SIZES.width/12,
                        height:SIZES.width/12,
                        borderRadius:2*SIZES.width,
                        justifyContent:'center',
                        alignItems:'center',
                        marginRight:SIZES.padding.xl*2
                }}>
                    <Icon name="chevron-back" color={COL.whiteC} size={SIZES.text.lg}/>
                </View>
            </TouchableWithoutFeedback>
            <Text style={{
                fontSize:SIZES.text.m*1.2,
                fontWeight:'500',
                color:COL.blackC
            }}>Favorites</Text>
        </View>
        <StatusBar backgroundColor={COL.black}/>
        <FlatList 
        style={{
        flex:1,
        }}
        contentContainerStyle={{
        paddingHorizontal:SIZES.padding.m,
        paddingTop:SIZES.padding.m,
        }}
        data={favList}
        renderItem={({item})=>(
        <CountryCard country={item} onPress={CountryOnPress}/>
        )}/>
    </SafeAreaView>
   )
}

export default Favorite