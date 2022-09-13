import { React, useState } from 'react';
import { View, StyleSheet, Platform, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Typography } from '../styles';
import moment from 'moment';

const DatePicker = ({ style }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
  };

  return (
    <View style={style}>
      <Text
        style={[styles.input]}
        value={date.toLocaleString()}
        placeholder="DATE"
        onPress={showDatepicker}
      >
        {date.toLocaleString()}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    fontFamily: Typography.FONT_FAMILY_BODY,

    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default DatePicker;
