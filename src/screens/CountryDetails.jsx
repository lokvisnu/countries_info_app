import { View, Text, StatusBar,useColorScheme,SafeAreaView,ScrollView, Image,PermissionsAndroid,Platform,TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsPageHeader from '../components/DetailsPageHeader';
import { SIZES,COLORS } from '../../constants/theme'
import { useGlobalStore } from '../store/useGlobalStore';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Ionicons'
import { check, request, RESULTS, PERMISSIONS } from 'react-native-permissions'


const CountryDetails = ({navigation,route}) => {
    //Params
    const {countryId} = route.params;
    const{countryList} = useGlobalStore();
    // Colour Theme
    const scheme = useColorScheme();
    const COL = COLORS[scheme]
    // UseState
    const[countryDetails,setCountryDetails] = useState(null)
    useEffect(()=>{
            const CountryDetails = countryList.filter((item)=>(item.cca2===countryId))[0]

            setCountryDetails(CountryDetails)    
    },[])


    //Downloading Image 

    
      const downloadImage = () => {
        
        let date = new Date();
        let image_URL = countryDetails.flags.png;    
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.DownloadDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
            alert('Image Downloaded Successfully.');
          });
      };
    
      const getExtention = filename => {
        // To get the file extension
        return /[.]/.exec(filename) ?
                 /[^.]+$/.exec(filename) : undefined;
      };
    //
    const TopCountryDetails =({label,detail})=>{
        return(
            <Text style={{
                color:COL.blackC,
                fontSize:SIZES.text.m*0.89,
                textAlign:'center',
                fontWeight:'500'
            }}>
                {detail}
                <Text style={{
                    color:COL.blackC,
                    fontSize:SIZES.text.s*0.8,
                    textAlign:'center',
                    fontWeight:'300',
                    textTransform:'uppercase'
                }}> {`\n${label}`}</Text> 
            </Text>
        )
    }
    const SecondaryCountryDetails = ({detail,label,isList,textTransform='none'})=>{

        if(!detail||(detail === undefined)||(isList&&detail.length<=0))
            return(<></>)
        return(
            <View style={{flexDirection:'row'}}>
                <View style={{
                backgroundColor:'transparent',
                flexDirection:'column',
                marginBottom:SIZES.padding.s,
                alignItems:'flex-start',
                justifyContent:'center',
            }}>
            
                {!isList&&
                    <View style={{
                        paddingHorizontal:SIZES.padding.s,
                        paddingVertical:SIZES.padding.xs,
                        backgroundColor:COL.DetailsSecondayListItemBG,
                        borderRadius:SIZES.borderRadius.m,
                    }}>
                        <Text style={{
                            color:COL.white,
                            fontSize:SIZES.text.m*0.89,
                            fontWeight:'500',
                            textAlign:'left',
                            textTransform:`${textTransform}`
                        }}>{detail}</Text>
                    </View>
                }
                {isList&&// Render a horizontal list of all the detail items
                    <ScrollView horizontal 
                    style={{
                        width:SIZES.width - 2*SIZES.padding.m,
                        flexDirection:'row'
                    }}
                    contentContainerStyle={{
                        flexDirection:'row',
                        gap:SIZES.padding.s,
                        alignItems:'center',
                        justifyContent:'flex-start'
                    }}>
                        {  
                            detail.map((item,i)=>(
                                <View key={i}
                                style={{
                                    paddingHorizontal:SIZES.padding.s,
                                    paddingVertical:SIZES.padding.xs,
                                    backgroundColor:COL.DetailsSecondayListItemBG,
                                    borderRadius:SIZES.borderRadius.m,
                                }}>
                                    <Text style={{
                                        color:COL.DetailsSecondayListItemColor,
                                        fontSize:SIZES.text.m*0.89,
                                        fontWeight:'500',
                                        textAlign:'left',
                                    }}>{item}</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                }
               
                    <Text style={{
                        color:COL.blackC,
                        fontSize:SIZES.text.s*0.8,
                        textAlign:'left',
                        fontWeight:'400',
                        textTransform:'uppercase',
                        paddingLeft:SIZES.padding.s,
                        paddingTop:SIZES.padding.xs*0.45
                        }}>{label}</Text>
                </View>
            </View>
            
        )
    }
    const CountryDetailsView =()=>{
        return(
            <>
                    <SecondaryCountryDetails detail={countryDetails.name.official} label={'Official Name'} isList={false}/>
                    <SecondaryCountryDetails detail={countryDetails.capital} label={'Capital City'} isList={true}/>
                    <View style={{
                        flexDirection:'row',
                        gap:SIZES.padding.xs
                    }}>
                        <SecondaryCountryDetails detail={countryDetails.capitalInfo.latlng[0]} label={'Catipal Latitude'} isList={false}/>
                        <SecondaryCountryDetails detail={countryDetails.capitalInfo.latlng[1]} label={'Catipal Longitude'} isList={false}/>
                    </View>
                    <SecondaryCountryDetails detail={countryDetails.currencies} label={'Currency'} isList={true}/>
                    <SecondaryCountryDetails detail={countryDetails.languages} label={'Languages'} isList={true}/>
                    <SecondaryCountryDetails detail={countryDetails.timezones} label={'Timezones'} isList={true}/>
                    <SecondaryCountryDetails detail={countryDetails.area} label={'Area Occupied'} isList={false}/>
                    <SecondaryCountryDetails detail={countryDetails.tld} label={'Top Level Domain'} isList={true}/>
                    <SecondaryCountryDetails detail={countryDetails.population} label={'Population'} isList={false}/>
                    <SecondaryCountryDetails detail={countryDetails.idd} label={'Country Phone Code'} isList={true}/>
                    <SecondaryCountryDetails detail={countryDetails.continents} label={'Continents'} isList={true}/>
                    <SecondaryCountryDetails detail={countryDetails.car.side} label={'Car Driving Side'} textTransform={'capitalize'}/>
                    <SecondaryCountryDetails detail={countryDetails.maps.googleMaps} label={'Map Link'} isList={false}/>

            </>
        )
    }
  return (
    <SafeAreaView style={{
        flex:1,
    }}>
        <StatusBar/>
       { countryDetails&&
       <View style={{
        flex:1 }}>
         <DetailsPageHeader name={countryDetails.name.common} onBackPress={()=>navigation.goBack()} country={countryDetails}/>
        <View style={{
            backgroundColor:'transparent',
            flex:1,
            flexDirection:'column',
            justifyContent:'flex-start'
        }}>
            <View style={{
                backgroundColor:COL.whiteC,
                flex:1,
                overflow:'visible',
                borderRadius:SIZES.borderRadius.m,
                position:'absolute',
                height:SIZES.height,
                width:1.005*SIZES.width,
                top:-1*SIZES.height/40,
                flexDirection:'column'
            }}>
                <View style={{
                    paddingHorizontal:SIZES.padding.m,
                    paddingVertical:SIZES.padding.s,
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                }}>

                    <Text style={{
                        color:COL.blackC,
                        fontSize:SIZES.text.xxl,
                        fontWeight:'600'
                    }}>{countryDetails.name.common}</Text>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-around',
                        width:"100%",
                        paddingTop:SIZES.padding.s
                    }}>
                        <TopCountryDetails label={'Region'} detail={countryDetails.region}/>
                        <TopCountryDetails label={'Lat'} detail={countryDetails.latlng[0]}/>
                        <TopCountryDetails label={'Long'} detail={countryDetails.latlng[1]}/>
                        <Image source={{uri:countryDetails.flags.png}} style={{
                            width:SIZES.width/6,
                            height:SIZES.height/22,
                            resizeMode:'center',
                            borderColor:COL.blackC,
                            borderWidth:1
                        }}/>
                        <TouchableWithoutFeedback onPress={()=>downloadImage()}>
                            <Icon name={'arrow-down-circle-sharp'} size={SIZES.text.lg} color={COL.blackC}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <ScrollView style={{
                    backgroundColor:COL.DetailsSecondaryBG,
                    borderRadius:SIZES.borderRadius.m,
                }}
                contentContainerStyle={{
                    flexDirection:'column',
                    justifyContent:'flex-start',
                    alignItems:'flex-start',
                    paddingHorizontal:SIZES.padding.m,
                    paddingTop:SIZES.padding.m,
                    paddingBottom:SIZES.padding.xl*11
                }}>
                    <CountryDetailsView/>
                </ScrollView>
            </View>
        </View>
       </View>
      }
        
    </SafeAreaView>
    
  )
}

export default CountryDetails