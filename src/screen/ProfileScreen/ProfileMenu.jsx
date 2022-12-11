import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { Mixins, Typography } from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../services/features/userSlice';
import { storeDataObject } from '../../services/local';

import Button from '../../components/Button';
import { moderateScale } from '../../styles/mixins';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// useDispatch
const ProfileMenu = ({ navigation }) => {
  // const [getShopifyUser, result] = useGetShopifyUserMutation();
  const token = useSelector((state) => state.user.accessToken);
  const bottomTabHeight = useBottomTabBarHeight();
  function handleNavigation() {
    navigation.navigate('MyAccount', 'Profile');
    console.log('yoo');
  }
  const dispatch = useDispatch();
  const setLocal = async (data) => {
    await storeDataObject(data);
  };
  const handleLogout = () => {
    dispatch(logout());
    setLocal({});
  };

  // React.useEffect(() => {
  //   const callApi = async () => {
  //     try {
  //       await getShopifyUser(GET_USER_VAR(token));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   callApi();
  // }, []);

  return (
    <SafeAreaView style={[styles.container, { marginBottom: bottomTabHeight }]}>
      <View style={{ flex: 1, width: Mixins.scaleSize(340) }}>
        <View>
          {/* <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_18 }}>PROFILE</Text> */}
          <Text style={{ fontFamily: Typography.FONT_FAMILY_HEADING, fontSize: Typography.FONT_SIZE_32, marginTop: -5 }}>{'VISHESH'}</Text>
        </View>
        <View style={{ marginTop: Mixins.moderateScale(20) }}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('MyAcc')}>
            <View style={styles.listStyle}>
              <Icon name="account-circle" size={26} color="black" />
              <Text style={styles.listText}>{'\t\t'}My Account</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => navigation.navigate('About')}>
            <View style={styles.listStyle}>
              <Icon name="information" size={26} color="black" />
              <Text style={styles.listText}>{'\t\t'}About TRNR</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Privacy')}>
            <View style={styles.listStyle}>
              {/* <Icon name="account-circle" size={22} color="black" /> */}
              <Text style={styles.listText}>Privacy Policy</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('APPLICATION_TNC')}>
            <View style={styles.listStyle}>
              {/* <Icon name="account-circle" size={22} color="black" /> */}
              <Text style={styles.listText}>Terms & Condition</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Button onPress={handleLogout} title="LOG OUT" fill="#E2E5E9" color="#333" style={{ position: 'absolute', bottom: moderateScale(30) }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  listStyle: {
    flexDirection: 'row',
    paddingVertical: Mixins.moderateScale(30),
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  listText: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_20,
    // marginLeft: Mixins.moderateScale(20),
  },
});

export default ProfileMenu;
