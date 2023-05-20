import {StyleSheet, Platform, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from '../Helping/AppColor';
const {width, height} = Dimensions.get('screen');
export default CssStyle = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  successBox: {
    width: responsiveWidth(70),
    height: Platform.OS == 'ios' ? height / 3 - 24 : height / 3 - 10,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  mainContainerModelCopied: {
    backgroundColor: '#00000040',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataReset: {
    paddingVertical: 30,
    color: 'black',
    // letterSpacing: 0.7,
    fontSize: 16,
  },
  headerText: {
    paddingTop: 30,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingText: {
    color: AppColors.buttonText,
    fontSize: 18,
    marginVertical: responsiveHeight(3),
    fontFamily: 'Interstate-regular',
  },
  signInText: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 34,
    width: responsiveWidth(67),
    lineHeight: responsiveHeight(5),
    marginLeft: responsiveWidth(2),
  },
  signInInfo: {
    color: 'white',
    letterSpacing: 0.2,
    width: responsiveWidth(60),
    marginVertical: responsiveHeight(1.8),
    marginLeft: responsiveWidth(2.8),
  },
  textInsideSettingComponent: {
    color: 'white',
    fontFamily: 'Interstate-bold',
    fontSize: 41,
  },
  textInfoSetting: {
    color: 'white',
    fontSize: 14,
    marginVertical: responsiveHeight(2),
    marginLeft: responsiveWidth(1),
  },
});
