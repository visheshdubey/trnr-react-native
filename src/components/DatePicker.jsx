import { React, useState } from 'react';
import { View, StyleSheet, Platform, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Mixins, Typography } from '../styles';
import moment from 'moment';

const DatePicker = ({ style }) => {
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (Platform.OS === 'android') {
      setShow(true);
      setShow(true);
      // for iOS, add a button that closes the picker
    }
  };

  return (
    <View style={style}>
      <Text
        style={date ? [styles.input] : [styles.inputPlaceholder]}
        placeholder="DATE"
        onPress={showDatepicker}
      >
        {date ? moment(date).format('DD MMMM YYYY') : 'ENTER YOUR DATE OF BIRTH'}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          display="default"
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    fontFamily: Typography.FONT_FAMILY_BODY,
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(5),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
  inputPlaceholder: {
    fontFamily: Typography.FONT_FAMILY_HEADING,
    color: '#999',
    height: Mixins.scaleSize(40),
    marginVertical: Mixins.scaleSize(5),
    borderWidth: 1,
    padding: Mixins.scaleSize(10),
  },
});

export default DatePicker;
