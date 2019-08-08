import React from 'react'
import { Text, View } from 'react-native'



import { Task } from 'fp-ts/lib/Task'
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

import { IonHeaderButtons , Item } from '../components/NavButtons';

const Main = () => {

  return (
    <View>
      <Text>Main Screen</Text>
    </View>
  )
};

Main.navigationOptions = ({ navigation, navigationOptions }) => {
  return {
    title: 'Home',
    headerRight: (
      <IonHeaderButtons>
        <Item title="add" iconName="ios-add" onPress={() => navigation.navigate('AddLocation')} />
      </IonHeaderButtons>
    )
  }
}

export default Main;
