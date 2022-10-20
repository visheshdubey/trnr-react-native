import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TochableOpacity,
} from 'react-native';
import Button from '../components/Button';
import NetworkRequest from '../components/NetworkRequest';
import SmallButton from '../components/SmallButton';
import { useGetShopifyUserMutation } from '../services/shopify';
import { Mixins, Typography } from '../styles';
import { GET_USER_VAR } from '../utils/ApiConstants';

const Profile = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [edit, onChangeEdit] = React.useState(false);
  const [phone, onChangePhone] = React.useState(null);

  const [error, onChangeError] = React.useState(false);

  const [getShopifyUser, result] = useGetShopifyUserMutation();
  const toggleEdit = () => {
    onChangeEdit(!edit);
  };

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };
  const token = 'ffbfa1117922b2ef059342adb7dcbb4b';
  React.useEffect(() => {
    //this token must come from ASYNC STORAGE
    getShopifyUser(GET_USER_VAR(token))
      .then((result, err) => {
        onChangeError(false);
        onChangeFirstName(result.data?.data.customer.firstName);
        onChangeLastName(result.data?.data.customer.lastName);
        onChangeEmail(result.data?.data.customer.email);
        onChangePhone(result.data.data.customer.phone);
      })
      .catch((err) => {
        onChangeError(true);
        console.log(error);
      });
  }, [edit]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <NetworkRequest error={result.error || error} data={result.data} isLoading={result.isLoading}>
        <View style={styles.container}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View
                style={{
                  width: Mixins.scaleSize(340),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.heading}>
                  {'Hi, '}
                  {firstName}
                </Text>

                {edit ? (
                  <SmallButton
                    onPress={toggleEdit}
                    title="CLOSE"
                    fill="#000"
                    color="#F66"
                  ></SmallButton>
                ) : (
                  <SmallButton
                    onPress={toggleEdit}
                    title="EDIT"
                    fill="#fff"
                    color="#000"
                  ></SmallButton>
                )}
              </View>
              <TextInput
                style={[
                  styles.input,
                  { width: Mixins.scaleSize(340), marginTop: Mixins.scaleSize(50) },
                ]}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="EMAIL ADDRESS"
                editable={edit}
              />
              <View
                style={{
                  width: Mixins.scaleSize(340),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(165) }]}
                  onChangeText={onChangeFirstName}
                  value={firstName}
                  placeholder="FIRST NAME"
                  editable={edit}
                />
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(165) }]}
                  onChangeText={onChangeLastName}
                  value={lastName}
                  placeholder="LAST NAME"
                  editable={edit}
                />
              </View>

              <TextInput
                style={[styles.input, { width: Mixins.scaleSize(340) }]}
                onChangeText={onChangePhone}
                value={phone}
                placeholder="PHONE NUMBER (WITH COUNTRY CODE AND NO SPACE )"
                editable={edit}
              />

              {edit ? (
                <>
                  <Button
                    onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
                    title="SAVE"
                    fill="#000"
                    color="#fff"
                    style={{ marginTop: Mixins.scaleSize(20) }}
                  ></Button>
                  <Button
                    onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
                    title="CLOSE"
                    fill="#fafafa"
                    color="#f66"
                    style={{ marginTop: Mixins.scaleSize(20) }}
                  ></Button>
                </>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </NetworkRequest>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 30,
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_48,
  },
  editField: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: Typography.FONT_SIZE_14,
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1.2,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: Typography.FONT_SIZE_32,
  },
  body: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
  },
  input: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    height: Mixins.scaleSize(40),
    color: '#000',
    borderRadius: 5,
    marginVertical: Mixins.scaleSize(10),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
});
