import React, {useState} from 'react';

import {TextInput, StyleSheet, View, Text} from 'react-native';

const Input = React.memo(
  ({
    PlaceHolder,
    maxLength,
    editable,
    onChangeText,
    InputStyle,
    secureTextEntry,
    Error,
    ErrorTitle,
    multiline,
  }) => {
    const [Value, OnTextChange] = useState('');

    const textChangeHandler = text => {
      onChangeText(text);
      OnTextChange(text);
    };

    return (
      <View>
        <TextInput
          multiline={multiline ? multiline : false}
          secureTextEntry={secureTextEntry ? secureTextEntry : false}
          style={[styles.textInput, InputStyle]}
          placeholderStyle={{fontSize: 30}}
          editable={editable && editable}
          placeholder={PlaceHolder}
          placeholderTextColor={'#000'}
          maxLength={maxLength ? maxLength : 150}
          value={Value}
          underlineColorAndroid={'#167BE0'}
          onChangeText={textChangeHandler}
        />
        {Error && <Text style={styles.ErrorTxt}>{ErrorTitle}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#f1f1f1',
    marginStart: 30,
    marginEnd: 30,
    paddingHorizontal: 15,
  },
  ErrorTxt: {
    color: '#BD0325',
    marginStart: 40,
    letterSpacing: 0.7,
  },
});

export {Input};
