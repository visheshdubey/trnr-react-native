import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Typography } from '../styles';
import DatePicker from '../components/DatePicker';

const SignIn = ({ navigation, route }) => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text style={styles.heading}>WELCOME BACK </Text>
        {/* <Text style={[styles.heading_2, {}]}>MEMBER </Text> */}
      </View>

      <Text style={[styles.body, { marginTop: 5 }]}>SIGNIN TO YOUR ACCOUNT</Text>
      <TextInput
        style={[styles.input, { width: '90%', marginTop: 50 }]}
        // onChangeText={onChangeText}
        // value={text}
        placeholder="EMAIL ADDRESS"
      />

      <TextInput
        style={[styles.input, { width: '90%' }]}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="PASSWORD"
        secureTextEntry={true}
      />

      <Button
        onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
        title="SIGNIN"
        fill="#000"
        color="#fff"
        style={{ marginTop: 50 }}
      ></Button>
      <Text style={styles.body} onPress={() => handleClick('SignUp', 'Sign Up')}>
        NEW MEMEBER? SIGN-UP HERE
      </Text>
    </SafeAreaView>
  );
};

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 70,
  },
  heading: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    fontSize: 28,
  },
  heading_2: {
    fontFamily: Typography.FONT_FAMILY_DISPLAY,
    fontSize: 32,
  },
  body: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
  },
  input: {
    fontFamily: Typography.FONT_FAMILY_HEADING,

    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});
