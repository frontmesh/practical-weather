import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
// define IconComponent, color, sizes and OverflowIcon in one place
const IoniconsHeaderButton = props => (
  <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);

export const IonHeaderButtons = props => {
  return (
    <HeaderButtons
      HeaderButtonComponent={IoniconsHeaderButton}
      OverflowIcon={<Ionicons name="ios-search" size={23} color="#ccc" />}
      {...props}
    />
  );
};
export { Item } from 'react-navigation-header-buttons';
