import React from "react";

import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";

type Props = {} & DateTimePickerProps;

const DateTimePicker = (props: Props) => {
  return <DateTimePickerModal {...props} mode="date" />;
};

export default DateTimePicker;
