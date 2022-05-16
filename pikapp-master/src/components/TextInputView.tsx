import React, {useRef} from 'react';
import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
type Props = {
  placeholder: string;
  icon: string;
  keyboardType?: KeyboardTypeOptions;
  onChange: (txt: string) => void;
  multiline?: boolean;
};

const TextInputView = React.memo((props: Props) => {
  const ref = useRef<TextInput>(null);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={props.icon} size={30} color="black" />
        <TextInput
          ref={ref}
          placeholder={props.placeholder}
          style={styles.input}
          keyboardType={props.keyboardType}
          onChangeText={props.onChange}
          multiline={props.multiline}
        />
      </View>
    </View>
  );
});

export default TextInputView;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  input: {
    paddingHorizontal: 8,
    flex: 1,
  },
});
