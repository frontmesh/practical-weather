import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { SearchBar } from 'react-native-elements';

import { Task } from 'fp-ts/lib/Task'
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

export default function Main() {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
    console.log("TCL: Main -> render -> search", search)
  };

  useEffect(() => {
    console.log('useEffect', search);
  }, 0);

  return (
    <View>
      <SearchBar
        round
        searchIcon={{ size: 24 }}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        lightTheme
        inputStyle = {{
          color: '#000',
          backgroundColor: 'transparent'
        }}
      />
    </View>
  )
}
