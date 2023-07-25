const { Dimensions } = require("react-native");

const {width,height} = Dimensions.get('window');

const Palatee = {
        white:'#FFFFFF',
        black:'#020205',

        blueGray:'#EAE8FF',
        resolutionBlue:'#18208E',
        pennBlue:'#010D3D'
}

const SIZES = {
    text:{
        xs:8,
        s:12,
        xm:14,
        m:16,
        xlg:20,
        lg:24,
        xxl:28,
        xl:32,
        xxl2:36,
        xl2:40,
    },
   

    borderRadius:{
        s:10,
        m:25
    },
    padding:{
        xs:4,
        s:10,
        m:15,
        lg:20,
        xl:25
    },
    width,height
}
// COLORS.black & COLORS.white => const white and black
// COLORS.blackC & COLORS.whiteC => Changes with dark&light Theme
const COLORS = {
    
    light:{
        ...Palatee,
        whiteC:'#FFFFFF',
        blackC:'#000000',
        primaryBG:Palatee.white,
        secondaryBG:Palatee.resolutionBlue,
        countryListItemBG:'#FFFFFF',
        SearchBarBG:'#FFFFFF',
        HomeHeaderColor:Palatee.resolutionBlue,
        DetailsSecondaryBG:'#E1E1E1',
        DetailsSecondayListItemColor:'#FFFFFF',
        DetailsSecondayListItemBG:Palatee.resolutionBlue,
        SearchPrimaryBG:'#FFFFFF',
        IconColor:'#000000',

    },
    dark:{
        ...Palatee,
        whiteC:'#000000',
        blackC:'#FFFFFF',
        primaryBG:'#252525',
        secondaryBG:Palatee.resolutionBlue,
        countryListItemBG:'#0D0D0D',
        SearchBarBG:'#1C1C1C',
        HomeHeaderColor:Palatee.resolutionBlue,
        DetailsSecondaryBG:'#2E2E2E',
        DetailsSecondayListItemBG:Palatee.resolutionBlue,
        DetailsSecondayListItemColor:'#FFFFFF',
        SearchPrimaryBG:'#FFFFFF',
        IconColor:'#0D0D0D',

    }
    
    }
export {
    SIZES,
    COLORS
}