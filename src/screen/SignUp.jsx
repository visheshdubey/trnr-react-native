import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  View,
} from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import DatePicker from '../components/DatePicker';

const SignUp = ({ navigation, route }) => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
      <TextInput
        style={[styles.input, { width: Mixins.scaleSize(340), marginTop: Mixins.scaleSize(50) }]}
        // onChangeText={onChangeText}
        // value={text}
        placeholder="EMAIL ADDRESS"
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
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="FIRST NAME"
        />
        <TextInput
          style={[styles.input, { width: Mixins.scaleSize(165) }]}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="LAST NAME"
        />
      </View>
      <TextInput
        style={[styles.input, { width: Mixins.scaleSize(340) }]}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="PASSWORD"
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.input, { width: Mixins.scaleSize(340) }]}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="DATE"
      />

      <DatePicker style={{ width: Mixins.scaleSize(340) }}></DatePicker>

      <Button
        onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
        title="CREATE ACCOUNT"
        fill="#000"
        color="#fff"
        style={{ marginTop: Mixins.scaleSize(50) }}
      ></Button>
      <Text style={styles.body} onPress={() => handleClick('SignIn', 'Sign In')}>
        ALREADY MEMEBER? SIGN-IN HERE
      </Text>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(12),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
});
