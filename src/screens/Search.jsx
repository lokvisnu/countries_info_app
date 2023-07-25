import { View, Text, useColorScheme, TextInput, TouchableOpacity, SectionList, StatusBar,Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import CountryCard from '../components/CountryCard'
import { LOG } from '../../Log'
import { useGlobalStore } from '../store/useGlobalStore'
const Search = ({navigation,route}) => {
  const scheme = useColorScheme()
  const COL = COLORS[scheme];
  const {query:QUERY} = route.params;
  const [filteredList,setFilteredList] = useState([])
  const [suggestionList,setSuggestionList] = useState([]);
  const [query,setQuery] = useState(QUERY)//Search Query string
  const [filter,setFilter] = useState({})
  const [isFilter,setIsFilter] = useState(false);
  const[currentFilterSection,setCurrentFilterSection] = useState(0);
  const [isSort,setIsSort] = useState(false)
  const [sort,setSort] = useState(null)
  const [isSearching,setIsSearching] = useState(false);
  const[filteringOptions,setFilteringOptions] = useState({});
  const{countryList} = useGlobalStore();
  const filteringCriterias = ['currencies','region','languages'] // The properties of Objectes in the countryList Array
  const bottomValue = useState(new Animated.Value(-5*(SIZES.height)/6))[0];
  const SortingOptions = [{
    id:0,
    name:'Population High To Low',
    property:'population',
    order:1
  },
  {
    id:1,
    name:'Population Low To High',
    property:'population',
    order:0
  },
  {
    id:2,
    name:'Area Low To High',
    property:'area',
    order:0
  },
  {
    id:3,
    name:'Area High To Low',
    property:'area',
    order:1
  }] // The properties of Objects in the countryList Array
  useEffect(()=>{
    // Getting Different Filtering Options

    // Initialization
    
    const IntitializeFilterOptions = async ()=>{
      let filteringOption = new Object({});
      filteringCriterias.forEach((criteria)=>filteringOption[criteria] = [])
      countryList.forEach(item => {
        filteringCriterias.forEach(criteria => {
          const value = item[criteria];
          if (value) {
            if (Array.isArray(value)) {
              value.forEach(val => {
                if (!filteringOption[criteria].includes(val)) {
                  filteringOption[criteria].push(val);
                }
              });
            } else if (typeof value === 'string' && !filteringOption[criteria].includes(value)) {
              filteringOption[criteria].push(value);
            }
          }
        });
      });
      setFilteringOptions(filteringOption);
    }
    ResetFilter()
    IntitializeFilterOptions()
    // Extracting the Accepted Value for the filtering from the array 
  },[countryList]) 
  useEffect(()=>
  {
   
    if(isSearching)
    {
      let Query = query.toString().trim().toLocaleLowerCase();
      if(Query=== '')
        setSuggestionList([])
    else
    {
        let filteredSuggestion = [];
        countryList.forEach((val)=>{
          if(val.name.common.toLowerCase().includes(Query)||val.name.official.toLowerCase().includes(Query))
            filteredSuggestion.push(val.name.common)
        })
        setSuggestionList(filteredSuggestion)
      }  
    }
  },[query,isSearching,countryList])
  useEffect(()=>{
    SearchFilter()
  },[query,isSearching,isFilter,isSort])
  useEffect(()=>{
    //Opening Filter and Sort Section Animation
    if(isFilter||isSort)
      handleFilterSortOpenClose(false)
  },[isFilter,isSort])

  // Saerch Filter Sorting The List
  const SearchFilter = async ()=>{
       const IsFilter = (filterOptions,country)=>{
        for (var i=0;i<filterOptions.length;i++) {
          var key = filterOptions[i]
          if (Array.isArray(filter[key])) {
            if (!filter[key].some(filterValue => country[key].includes(filterValue))) {
              return false;
            }
          } else {
            if (country[key] !== filter[key]) {
              return false;
            }
          }
        }
        return true;
    }
      let filteredCountryList = []
      let filterOptions = Object.keys(filter);
      filterOptions = filterOptions.filter(itm=>filter[itm].length>0)
      let Query = query.toString().trim().toLocaleLowerCase();
      filteredCountryList = []
      countryList.forEach((val)=>{
        if((val.name.common.toLowerCase().includes(Query)||val.name.official.toLowerCase().includes(Query)))
        {
          if(filterOptions.length>0)
          {
            if(IsFilter(filterOptions,val))
              filteredCountryList.push(val);
          }
          else
            filteredCountryList.push(val);
        }
      })
      if(sort!==null)
        filteredCountryList = await Sort(filteredCountryList)
      setFilteredList([...filteredCountryList])
  }
  
  const Sort = async (list)=>{
    const property = SortingOptions[sort].property;

    list.sort((a,b)=>{
      if(SortingOptions[sort].order===0)
        return parseInt(a[property]) - parseInt(b[property]) 
      else(SortingOptions[sort].order)
        return parseInt(b[property]) - parseInt(a[property])  
    })
    return list
  }

  // 
  const renderSuggestionList = ({item})=>{
    return(
      <TouchableOpacity onPress={()=>SuggestionItemOnClick(item)}
      style={{
        flexDirection:'row',
        justifyContent:'flex-start',
        backgroundColor:COL.primaryBG,
        borderBottomColor:COL.countryListItemBG,
        borderBottomWidth:1,
        paddingVertical:SIZES.padding.m,
        paddingHorizontal:SIZES.padding.m,
        alignItems:'center'
      }}>
        <Icon name={'search'} color={COL.blackC} size={SIZES.text.lg} style={{opacity:0.8}}/>      
        <Text style={{
          fontSize:SIZES.text.m*0.85,
          marginLeft:SIZES.padding.m,
          color:COL.blackC
        }}>{item}</Text>
        </TouchableOpacity>
    )
  }
  const SuggestionItemOnClick = (val)=>{
    
    setQuery(val)
    setIsSearching(false)
  }
  const CountryOnPress = (id)=>{
    navigation.navigate('Details',{
      countryId:id
    })
  }
  const Reset = async()=>{
    if(isFilter)
      ResetFilter();
    else if(isSort)
      setSort(null)
  }
  const ResetFilter = async ()=>{
    setFilter(prev=>{
      prev = new Object();
      filteringCriterias.forEach((criteria)=>prev[criteria] = [])
      return prev
    })
  }
  const animationTiming = 1000;
  const handleFilterSortOpenClose =(IsClose)=>{
    if(!IsClose)
    {
      Animated.timing(bottomValue,{
        toValue:0,
        duration:animationTiming,
        useNativeDriver:false
      }).start()
    }
    else{
      setTimeout(()=>{
        setIsFilter(false);
        setIsSort(false);
      },animationTiming)

      Animated.timing(bottomValue,{
        toValue:(65),
        duration:2*animationTiming/6,
        useNativeDriver:false
      }).start()
      setTimeout(()=>{
        Animated.timing(bottomValue,{
          toValue:(-5.3*(SIZES.height)/6),
          duration:4*animationTiming/6,
          useNativeDriver:false
        }).start()
      },animationTiming/6)
    }
  }
  return (
    <>
      <StatusBar backgroundColor={COL.black}/>
      <View style={{
        backgroundColor:COL.primaryBG,
        flex:1,
        position:'relative'
      }}>
        <View style={{
          backgroundColor:COL.primaryBG,
          elevation:5,
          shadowColor:'black',
          zIndex:1,
          height:SIZES.height/12.5,
          flexDirection:'row',
          paddingHorizontal:SIZES.padding.m,
          alignItems:'center'
        }}>
      {/** Search Bar*/}
          <TouchableWithoutFeedback style={{width:40,height:"100%",justifyContent:'center'}}onPress={()=>navigation.goBack()}>
            <Icon name={(isSearching)?'search':'chevron-back'} color={COL.blackC} size={SIZES.text.lg} style={{opacity:0.8}}/>
          </TouchableWithoutFeedback>
          <TextInput placeholder='Search Countries' 
          autoFocus={isSearching}
          onFocus={()=>setIsSearching(true)}
          placeholderTextColor={COL.blackC}
          clearButtonMode='always'
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType={'done'}
          
          onChangeText={(text)=>setQuery(text)}
          onSubmitEditing={()=>setIsSearching(false)}
          value={query}
            style={{
              height:'100%',
              flex:1,
              color:COL.blackC,
              fontSize:SIZES.text.m*0.95
            }}/>
        </View>
      {/**Search Suggestion List */}
        {
          isSearching&&
          <FlatList
          contentContainerStyle={{flex:1}}
          data={suggestionList}
          renderItem={renderSuggestionList}
          />
        }
      {/**List of Countries */}
        {
          !isSearching  &&
          <FlatList
          style={{
            flex:1,
            zIndex:1,
          }}
          horizontal={false}
          contentContainerStyle={{
            paddingHorizontal:SIZES.padding.m,
            paddingTop:SIZES.padding.m,
          }}
          data={filteredList}
          renderItem={({item})=>(
            <CountryCard country={item} onPress={CountryOnPress}/>
          )}
          ListEmptyComponent={()=>(
          <View style={{
            paddingHorizontal:SIZES.padding.lg
          }}>
            <Text style={{
              color:'red',
              fontWeight:'500'
              }}>Searched Country Not Available</Text>
          </View>
          )}/>
        }
      {/** Filter & Sort */}
        {
          //  
          (isFilter||isSort)&&
          <View style={{
            backgroundColor:'black',
            position:'absolute',
            width:SIZES.width,
            height:SIZES.height,
            zIndex:3,
            top:0,
            left:0,
            opacity:0.65
          }}>
          </View>
        }
        {
          // Filter and Sort Section
          (isFilter||isSort)&&
          <Animated.View style={{
            width:SIZES.width,
            height:4*SIZES.height/6,
            backgroundColor:'white',
            opacity:1,
            position:'absolute',
            zIndex:3,
            bottom:bottomValue,
            left:0,
            borderRadius:SIZES.borderRadius.m*0.65,
          }}>
            <View style={{
              flexDirection:'row',
              width:'100%',
              justifyContent:'flex-start',
              alignItems:'center',
              paddingVertical:SIZES.padding.m,
              paddingHorizontal:SIZES.padding.m
            }}>
              <TouchableWithoutFeedback  onPress={()=>{
                  handleFilterSortOpenClose(true)
                }}><Icon name={'chevron-back'} color={'black'} size={SIZES.text.lg} /></TouchableWithoutFeedback>
              <Text style={{
                  flex:1,
                  color:'black',
                  fontSize:SIZES.text.m,
                  fontWeight:'500',
                  textTransform:'capitalize',
                  textAlign:'center'
                }}>{isFilter?'Filter':(isSort)?'Sort':''}</Text>
              <Text style={{
                color:'black',
                fontSize:SIZES.text.m,
                fontWeight:'500',
                textTransform:'capitalize',
                textAlign:'center',
                paddingRight:SIZES.padding.s
              }} onPress={()=>Reset()}> Reset</Text>
            </View>
            {
              isFilter&&
              <FilterSection filter={filter} filteringOptions={filteringOptions} setFilter={setFilter} setCurrentFilterSection={setCurrentFilterSection} currentFilterSection={currentFilterSection}/>
            }
            {
              isSort&&
              <SortSection SortingOptions={SortingOptions} sort={sort} setSort={setSort}/>
            }
          </Animated.View>
        }
      
      {
        // Filter and Sort Buttons at the bottom
        !isSearching&&
        <View style={{
          flexDirection:'row',
          width:SIZES.width,
          gap:8,
          zIndex:2,
          backgroundColor:COL.primaryBG,
          paddingVertical:SIZES.padding.m*1.3,
          shadowRadius: 2,
          elevation: 20,
          shadowColor:COL.black,
          shadowOpacity:1.0,
          alignItems:'center',
          justifyContent:'space-around',
        }}>
          <TouchableWithoutFeedback 
          onPress={()=>{
            setIsFilter(true);
          }}
          style={{
              borderRightColor:'lightgray',
              borderRightWidth:1.2,
              justifyContent:'center',
            }}>
            <Text style={{
                textAlign:'center',
                color:COL.blackC,
                fontWeight:'500',
                fontSize:SIZES.text.m*0.95,
                paddingHorizontal:SIZES.padding.xl*3
              }}>
              Filter
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback  
          onPress={()=>{
            setIsSort(true);
          }}
          style={{
            paddingHorizontal:SIZES.padding.xl*3
            }}>
            <Text style={{
              textAlign:'center',
              color:COL.blackC,
              fontWeight:'500',
              fontSize:SIZES.text.m*0.95
            }}>
              Sort
            </Text>
          </TouchableWithoutFeedback>
        </View>}
      </View>
    </>
    
  )
}

const FilterSection =({setCurrentFilterSection,currentFilterSection,filter,setFilter,filteringOptions})=>
{
  const scheme = useColorScheme()
  const COL = COLORS[scheme];
  const RenderFilterTitles =({name,index})=>{
    return(
      <Text
      onPress={()=>setCurrentFilterSection(index)} 
      style={{
          color:'black',
          fontSize:SIZES.text.m,
          fontWeight:'500',
          textTransform:'capitalize',
          textAlign:'left',
          backgroundColor:'white',
          paddingHorizontal:SIZES.padding.m,
          paddingVertical:SIZES.padding.m,
          backgroundColor:(index===currentFilterSection)?COL.white:'#F2F2F2'
      }}>
        {name}
      </Text>
    )
  }
  const RenderFilterOptions = ({item})=>{
        const title = Object.keys(filteringOptions)[currentFilterSection];
        const [IsEnabled,setIsEnabled] = useState((filter[title].indexOf(item)>(-1)))
        const FilterItemOnPress =()=>{
              setFilter((prev)=>{
                if(!IsEnabled)
                  prev[title].push(item)
                else
                  prev[title] = prev[title].filter((i)=>i!==item)
                return prev;
              })
              setIsEnabled((prev)=>(!prev));
        }
    return(

            <Text onPress={FilterItemOnPress} 
            style={[{
              color:IsEnabled?'white':COL.pennBlue,
              fontSize:SIZES.text.m*0.78,
              fontWeight:'500',
              textAlign:'center',
              paddingHorizontal:SIZES.padding.s,
              paddingVertical:SIZES.padding.xs*0.65,
              backgroundColor:IsEnabled?COL.pennBlue:'white',
              borderRadius:SIZES.borderRadius.m,
              borderColor:COL.pennBlue,
              borderWidth:1.5,
              marginBottom:SIZES.padding.s,
            }]}>{item}</Text>
    )
  }
  return(
    <View style={{
      flexDirection:'row',
      flex:1
    }}>
      <View style={{
        flexDirection:'column',
        flex:1,
        backgroundColor:'#F2F2F2'
      }}>
      { Object.keys(filteringOptions)&&
        Object.keys(filteringOptions).map((option,i)=><RenderFilterTitles name={option} index={i} key={i}/>)
      }
      </View>
      <View style={{
        flex:2,
        height:'100%',
        backgroundColor:COL.white

      }}>
        <FlatList style={{
          flex:1,
        }}
        contentContainerStyle={{
          flexDirection:'column',
          paddingHorizontal:SIZES.padding.m,
          paddingTop:SIZES.padding.m,
          alignItems:'flex-start'

        }}
        data={filteringOptions[Object.keys(filteringOptions)[currentFilterSection]]}
        renderItem={({item})=>(<RenderFilterOptions item={item}/>)}/>
      </View>
    </View>
  )}

  const SortSection = ({SortingOptions,setSort,sort})=>{
    const scheme = useColorScheme()
    const COL = COLORS[scheme];
    const RenderSortItem =  ({item})=>{
          const IsEnabled = ((sort!==null)?sort === item.id:false)
          const SortItemOnPress = async ()=>{
                setSort(()=>{
                  if(!IsEnabled)
                    return item.id
                  else
                    return null  
                })
          }
      return(

              <Text onPress={SortItemOnPress} 
              style={[{
                color:IsEnabled?'white':COL.pennBlue,
                fontSize:SIZES.text.m*0.86,
                fontWeight:'500',
                textAlign:'center',
                paddingHorizontal:SIZES.padding.s,
                paddingVertical:SIZES.padding.xs*0.65,
                backgroundColor:IsEnabled?COL.pennBlue:'white',
                borderRadius:SIZES.borderRadius.m,
                borderColor:COL.pennBlue,
                borderWidth:1.5,
                marginBottom:SIZES.padding.s,
              }]}>{item.name}</Text>
      )
    }
    return(
      <FlatList
        style={{flex:1}}
        contentContainerStyle={{
          flexDirection:'column',
          paddingLeft:SIZES.padding.xl*3.5,
          paddingTop:SIZES.padding.m,
          alignItems:'flex-start'
        }}
        data={SortingOptions}
        renderItem={({item})=><RenderSortItem item={item}/>}
      />
    )
  }
export default Search