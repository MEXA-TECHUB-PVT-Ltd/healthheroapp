import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {AppColors} from './AppColor';

const Contact = ({contact, setAddedItem, addedItem, currentUserPhone}) => {
  //   const storedCountryCode = useSelector(state => state.auth.countryCode);

  const [add, setAdd] = useState(false);

  const addItem = (num, id) => {
    if (num.includes('+')) {
      addedItem.push({
        id: id,
        number: num,
      });
      setAddedItem([...addedItem]);
    } else {
      if (num[0] == 0) {
        const a = num.replace(0, '');
        addedItem.push({
          id: id,
          //   number: `${storedCountryCode}${a}`,
        });
        setAddedItem([...addedItem]);
      } else {
        addedItem.push({
          id: id,
          //   number: `${storedCountryCode}${num}`,
        });
        setAddedItem([...addedItem]);
      }
    }
  };
  console.log(contact);
  const deleteItem = id => {
    const result = addedItem?.filter((item, index) => {
      return item.id !== id;
    });
    setAddedItem([...result]);
  };

  const width = Dimensions.get('screen').width - 30;
  return (
    <View
      style={
        {
          // flex: 1,
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          // borderBottomWidth: 0.5,
          // borderBottomColor: '#d9d9d9',
        }
      }>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {add ? (
          <TouchableOpacity
            style={[
              styles.buttonGender,
              {
                backgroundColor: '#0A1F58',
                borderColor: AppColors.buttonText,
                borderWidth: 1,
                width: responsiveWidth(84),
              },
            ]}
            onPress={() => {
              setAdd(false), addItem(contact.item, contact.id);
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontFamily: 'Interstate-regular',
              }}>
              {contact.item}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonGender, {backgroundColor: '#626377'}]}
            onPress={() => {
              setAdd(true), deleteItem(contact.item);
            }}>
            <Text
              style={{
                color: 'white',
                // fontWeight: '500',
                fontFamily: 'Interstate-regular',
              }}>
              {contact.item}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonGender: {
    paddingVertical: responsiveHeight(2.6),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(1),
    // flexDirection: "row",
    alignItems: 'center',
    marginBottom: responsiveHeight(3.7),
    width: responsiveWidth(85),
  },
});
export default Contact;
