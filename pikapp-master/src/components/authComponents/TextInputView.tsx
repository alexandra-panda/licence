import React from 'react';
import {View, Text, TextInput, TextInputProps} from 'react-native';

interface TextInputView {
  placeholder?: string;
  handleFormValueChange: (formKey: string, event: string) => void;
  formKey: string;
  isPassord?: boolean;
}

const TextInputView = ({
  placeholder,
  formKey,
  handleFormValueChange,
  isPassord,
}: TextInputView) => {
  // console.log('textInputProps', txtProps);

  return (
    <View
      style={{
        height: 100,
        // backgroundColor: '#ffff',
        padding: 20,
      }}>
      <TextInput
        style={{
          width: 300,
          color: 'black',
          margin: 10,
          height: 40,
          padding: 10,
          backgroundColor: 'white',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
        placeholder={placeholder || 'placeholder'}
        autoCapitalize={'none'}
        secureTextEntry={isPassord}
        onChange={event =>
          handleFormValueChange(formKey, event.nativeEvent.text)
        }
      />
    </View>
  );
};

export default TextInputView;
