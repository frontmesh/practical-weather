import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native';

import { SearchBar } from 'react-native-elements';

import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from 'react-navigation-addon-search-layout';
import { Ionicons } from '@expo/vector-icons';
import throttle from 'lodash.throttle';


const AddLocation = (props) => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
    console.log("TCL: Main -> render -> search", search)
  };

  const throttled = useRef(throttle((newValue) => console.log('throttle', newValue), 1000));

  useEffect(() => {
    throttled.current(search)
  }, [search]);

  const _executeSearch = () => {
    alert('do search!');
  };



  return (
    <View>
      <SearchLayout
        onChangeQuery={updateSearch}
        onSubmit={_executeSearch}>
        {search ? (
          <RectButton
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#eee',
              paddingVertical: 20,
              paddingHorizontal: 15,
            }}
            onPress={() =>
              this.props.navigation.navigate('Result', {
                text: search,
              })
            }>
            <Text style={{ fontSize: 14 }}>{search}!</Text>
          </RectButton>
        ) : null}
      </SearchLayout>
    </View>
  );
}

AddLocation.navigationOptions = {
  title: 'Add Location',
  header: null,
}


export default AddLocation;
