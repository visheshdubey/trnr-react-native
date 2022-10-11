import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { Mixins, Typography } from '../styles';
import DatePicker from '../components/DatePicker';
import * as ScreenOrientation from 'expo-screen-orientation';
import moment from 'moment/moment';
import RadioButtonRN from 'radio-buttons-react-native';
import { Picker } from '@react-native-picker/picker';
import { WHITE } from '../styles/colors';
const SignUp = ({ navigation, route }) => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);
  const [orientationIsLandscape, setOrientation] = React.useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState('Javascript');

  async function changeScreenOrientation() {
    if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    } else if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const toggleOrientation = () => {
    setOrientation(!orientationIsLandscape);
    changeScreenOrientation();
  };

  const handleClick = (x, y) => {
    navigation.navigate(x, { name: y });
  };
  const pickerRef = React.useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  return (
    <SafeAreaView style={styles.container}>
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
      <View
        style={{
          width: Mixins.scaleSize(340),
          borderWidth: 1,
          backgroundColor: 'green',
          overflow: 'hidden',
          color: WHITE,
        }}
      >
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
          style={{ backgroundColor: 'red', height: Mixins.scaleSize(40) }}
          itemStyle={{ backgroundColor: 'yellow' }}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      {/* <TextInput
            style={[styles.input, { width: Mixins.scaleSize(340) }]}
            onChangeText={onChangeNumber}
            value={moment(number).format('DD MMMM YYYY')}
            placeholder="DATE"
          /> */}
      {/* <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} /> */}
      <DatePicker style={{ width: Mixins.scaleSize(340) }}></DatePicker>
      <Button
        onPress={() => handleClick('BaseTabNav', 'HomeScreen')}
        title="CREATE ACCOUNT"
        fill="#000"
        color="#fff"
        style={{ marginTop: Mixins.scaleSize(10) }}
      ></Button>
      <Text style={styles.body} onPress={toggleOrientation}>
        {/* onPress={() => handleClick('SignIn', 'Sign In')}>  */}
        ALREADY MEMEBER? SIGN-IN HERE
      </Text>
    </SafeAreaView>
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
    marginVertical: Mixins.scaleSize(5),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
});
