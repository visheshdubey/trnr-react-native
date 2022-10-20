import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TochableOpacity,
} from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import DatePicker from '../components/DatePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formValidation } from '../utils/formValidations';
import {
  useAccessTokenShopifyUserMutation,
  useCreateShopifyUserMutation,
} from '../services/shopify';
import {
  ACCESS_TOKEN_USER_VAR,
  CREATE_USER_VAR,
  STRAPI_ADD_USER_DATA,
} from '../utils/ApiConstants';
import { useAddUserDataMutation } from '../services/strapi';

const SignUp = ({ navigation, route }) => {
  const [email, onChangeEmail] = React.useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [confirmPassword, onChangeConfirmPassword] = React.useState(null);
  const [gender, setGender] = React.useState('MALE');
  const [DOB, setDOB] = React.useState(null);
  const [country, onChangeCountry] = React.useState(null);
  const [terms, setTerms] = React.useState(true);
  const [label, onChangeLabel] = React.useState({
    emailLabel: null,
    fnLabel: null,
    pswdLabel: null,
    cpswdLabel: null,
    hasErrorLabels: false,
  });

  const [createShopifyUserMutation, createResult] = useCreateShopifyUserMutation();
  const [addUserData, userResult] = useAddUserDataMutation();
  const [accessTokenShopifyUserMutation, tokenResult] = useAccessTokenShopifyUserMutation();

  const toggleGender = (x) => {
    setGender(x);
  };
  const toggleTerms = () => {
    setTerms(!terms);
  };
  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  const handleSubmit = () => {
    let formErr = formValidation(email, firstName, password, confirmPassword);
    onChangeLabel((previousValue) => ({
      ...previousValue,
      ...formErr,
    }));

    if (!label.hasErrorLabels) {
      createShopifyUserMutation(CREATE_USER_VAR(firstName, lastName, email, password, terms))
        .then((result) => console.log(JSON.stringify(result)))
        .then((result) =>
          addUserData(STRAPI_ADD_USER_DATA(firstName, lastName, email, DOB, gender, terms))
        )
        .then((result) => console.log(JSON.stringify(result)))
        .then((result) => accessTokenShopifyUserMutation(ACCESS_TOKEN_USER_VAR(email, password)))
        .then((result) => console.log(JSON.stringify(result)));

      //SAVE THIS ACCESSTOKEN AND USER ID IN ASYNC STORAGE
    }
  };
  // Object.keys(formErr).forEach(function (key, idx) {
  //   console.log(key + ': ' + formErr[key]);
  // });
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical={false}
        bounces={false}
        bouncesZoom={false}
        maximumZoomScale={0}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Logo />
              <View
                style={{
                  width: Mixins.WINDOW_WIDTH,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: Mixins.scaleSize(30),
                }}
              >
                <Text style={styles.heading}>LET'S BECOME A </Text>
                <Text style={[styles.heading_2, {}]}>MEMBER </Text>
              </View>
              <Text style={[styles.body, { marginTop: Mixins.scaleSize(5) }]}>
                AND RECIEVE THOUSANDS OF BENEFITS
              </Text>
              {/* ------------------------EMAIL ADDRESS------------------------------------------ */}
              <TextInput
                style={[
                  styles.input,
                  { width: Mixins.scaleSize(340), marginTop: Mixins.scaleSize(50) },
                ]}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="EMAIL ADDRESS"
              />
              {label.emailLabel ? <Text>{label.emailLabel}</Text> : null}
              {/* ----------------------------USER NAME ------------------------------------------ */}
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
                />
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(165) }]}
                  onChangeText={onChangeLastName}
                  value={lastName}
                  placeholder="LAST NAME"
                />
              </View>
              {label.fnLabel ? <Text>{label.fnLabel}</Text> : null}
              {/* --------------------------------PASSWORD--------------------------------------------- */}
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
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="PASSWORD"
                  secureTextEntry={true}
                />
                <TextInput
                  style={[styles.input, { width: Mixins.scaleSize(165) }]}
                  onChangeText={onChangeConfirmPassword}
                  value={confirmPassword}
                  placeholder="CONFIRM PASSWORD"
                  secureTextEntry={true}
                />
              </View>
              {label.pswdLabel ? <Text>{label.pswdLabel}</Text> : null}
              {label.cpswdLabel ? <Text>{label.cpswdLabel}</Text> : null}
              {/* -----------------------------GENDER----------------------------------- */}

              <View
                style={[
                  {
                    width: Mixins.scaleSize(340),
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginVertical: Mixins.scaleSize(5),
                  },
                ]}
              >
                <Text style={[styles.body]} onPress={() => toggleGender('MALE')}>
                  {gender == 'MALE' ? (
                    <Icon name="check-square-o" color="#000" size={18} />
                  ) : (
                    <Icon name="square-o" color="#000" size={18} />
                  )}
                  {'  '}
                  MALE
                </Text>
                <Text style={[styles.body]} onPress={() => toggleGender('FEMALE')}>
                  {gender == 'FEMALE' ? (
                    <Icon name="check-square-o" color="#000" size={18} />
                  ) : (
                    <Icon name="square-o" color="#000" size={18} />
                  )}
                  {'  '}
                  FEMALE
                </Text>
                <Text style={[styles.body]} onPress={() => toggleGender('OTHER')}>
                  {gender == 'OTHER' ? (
                    <Icon name="check-square-o" color="#000" size={18} />
                  ) : (
                    <Icon name="square-o" color="#000" size={18} />
                  )}
                  {'  '}
                  OTHER
                </Text>
              </View>

              {/* <Text
                style={[styles.input, { width: Mixins.scaleSize(340) }]}
                onChangeText={onChangePhone}
                value={country}
                placeholder="SELECT YOUR COUNTRY"
                onPress={() => navigation.navigate('Country_Selector')}
              /> */}

              <DatePicker
                style={{ width: Mixins.scaleSize(340), marginVertical: Mixins.scaleSize(10) }}
              />
              <Text style={[styles.body, { marginTop: Mixins.scaleSize(5) }]} onPress={toggleTerms}>
                {terms ? (
                  <Icon name="check-square-o" color="#000" size={18} />
                ) : (
                  <Icon name="square-o" color="#000" size={18} />
                )}
                {'  '}AGREE TO OUR{' '}
                <Text style={{ textDecorationLine: 'underline' }}>TERMS AND CONDITIONS?</Text>
              </Text>
              <Button
                onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
                title="CREATE ACCOUNT"
                fill="#000"
                color="#fff"
                style={{ marginVertical: Mixins.scaleSize(30) }}
              ></Button>
              <Text style={[styles.body]} onPress={() => handleClick('SignIn', 'Sign In')}>
                {' '}
                ALREADY A MEMEBER?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>SIGN-IN HERE</Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // paddingVertical: Mixins.scaleSize(70),
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingVertical: Mixins.scaleSize(70),
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    fontSize: Typography.FONT_SIZE_28,
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
    borderRadius: 5,
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(15),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
});
