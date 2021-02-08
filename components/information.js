import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
  Alert,
  TouchableOpacity,
  AppRegistry,
  Image,
  StatusBar,
} from 'react-native';
import {
  Header,
  Title,
  Icon,
  Body,
  Right,
  Left,
  Button,
  Text,
  Picker,
  CardItem,
  Container,
  Content,
  Card,
  List,
  ListItem,
  
  // CardItem
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import auth from '@react-native-firebase/auth';
const Information = () => {
  return (
    <>
    </>
  );
};
const styles = StyleSheet.create({
  submit: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    color: '#12998d',
    margin: 10,
    marginTop: 22,
    backgroundColor: '#fbfafc',
    borderRadius: 5,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 13,
    // borderBottomColor: '#8B0001',
    // borderWidth: 1,
    color: '#12998d',
  },
  choose: {
    // fontSize:18,
    //    width:90,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 0,
    color: 'grey',
    height: 30,
    //    backgroundColor:"#e5e3e3"
    //    borderBottomColor
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },

  inner: {
    // flex: 1,
    // height: 550,
    // paddingHorizontal: 10,
    // paddingBottom: 40,
    // paddingTop: 20,
    // backgroundColor: 'white',
    // marginHorizontal: 20,
    // marginVertical: 40,
    // borderRadius: 5,
    backgroundColor: 'white',
    // opacity: 0.8,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  firstNameSec: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    // borderBottomColor: '#8B0001',
    // borderBottomWidth: 2,
  },
  firstName: {
    height: 30,
    fontSize: 16,
    marginTop: 3,
    color: 'black',
    padding: 0,
  },
});
export default Information;
