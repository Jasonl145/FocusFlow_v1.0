import React from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { commonStyles } from '../../lib/constants';

const CreateTask: React.FC = () => {
  return (
    <SafeAreaView>
        <Text>What task do you have?</Text>
        <TextInput
          style={commonStyles.defaultTextInput}
          placeholder="Enter task name"
          />
        <Text>When do you want to do it?</Text>
        <TextInput
          style={commonStyles.defaultTextInput}
          placeholder="Enter date"
          />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>To: </Text>
            <TextInput
              style={commonStyles.defaultTextInput}
              placeholder="Enter time"
              />
            <Text>From: </Text>
            <TextInput
              style={commonStyles.defaultTextInput}
              placeholder="Enter time"
              />
        </View>
    </SafeAreaView>
  )
}

export default CreateTask;
