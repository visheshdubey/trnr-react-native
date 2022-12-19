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
import { useGetProfileQuery } from '../../services/strapi';
// useDispatch
const ProfileMenu = ({ navigation }) => {
  const bottomTabHeight = useBottomTabBarHeight();
  const { data, isError, isFetching, isLoading } = useGetProfileQuery();

  const dispatch = useDispatch();
  const setLocal = async (data_1) => {
    await storeDataObject(data_1);
  };
  const handleLogout = () => {
    dispatch(logout());
    setLocal({});
  };
  return (
    <SafeAreaView style={[styles.container, { marginBottom: bottomTabHeight }]}>
      <View style={{ flex: 1, width: Mixins.scaleSize(340) }}>
        <View style={{ marginTop: moderateScale(34) }}>
          <Text style={{ fontFamily: Typography.FONT_FAMILY_BODY, fontSize: Typography.FONT_SIZE_18 }}>PROFILE</Text>
          <Text style={{ fontFamily: Typography.FONT_FAMILY_HEADING, fontSize: Typography.FONT_SIZE_32 }}>{isError ? 'HI!' : data?.firstName.toUpperCase()}</Text>
        </View>
        <View style={{ marginTop: Mixins.moderateScale(20) }}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('MyAcc')}>
            <View style={styles.listStyle}>
              <Icon name="account-circle" size={26} color="black" />
              <Text style={styles.listText}>{'  '}MY ACCOUNT</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('About')}>
            <View style={styles.listStyle}>
              <Icon name="information" size={26} color="black" />
              <Text style={styles.listText}>{'  '}ABOUT TRNR</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('APPLICATION_POLICY')}>
            <View style={styles.listStyle}>
              {/* <Icon name="account-circle" size={22} color="black" /> */}
              <Text style={styles.listText}>PRIVACY POLICY</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('APPLICATION_TNC')}>
            <View style={styles.listStyle}>
              {/* <Icon name="account-circle" size={22} color="black" /> */}
              <Text style={styles.listText}>TERMS & CONDITION</Text>
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
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_16,
    // marginLeft: Mixins.moderateScale(20),
  },
});

export default ProfileMenu;
