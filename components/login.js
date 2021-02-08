import React, {Component, useState,useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Button,
  Text,
  
} from 'native-base';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Alert,
  BackHandler
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../authproider/authprovider';

function LogIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading,setLoading]=useState(false);

  const {loading, login,loginError ,setLoginError} = useContext(AuthContext);
  if(loginError){
    Alert.alert("error",loginError , [
      {
        text: 'ok',
        onPress: () => setLoginError(false),
        style: 'cancel',
      },
    ]);
  }
  
  const onLogin = async() => {
    if(email && password){
      login(email, password)
}
else{
  Alert.alert("error","please fill both email and password field" , [
    {
      text: 'ok',
      onPress: () => null,
      style: 'cancel',
    },
  ]);
}
}
useEffect(() => {
  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );
  return () => backHandler.remove();
}, []);
  
  return (
    <>
    {console.log(props.name)}
    <View style={{flex:1 ,backgroundColor:"red"}}>
        <ImageBackground
          source={{
            uri:
              'https://cdn.labmanager.com/assets/articleNo/2917/iImg/6317/357446f0-a1c4-4556-a3ec-4e805ad3454f-dec21-blood.png',
            // uri:"https://healthwatchcenter.com/wp-content/uploads/2015/06/types-of-blood-disorders-related-to-plasma.jpg"
            // uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fnewatlas.com%2Fmedical%2Fsynthetic-red-blood-cells-oxygen-drugs-toxin-sensors%2F&psig=AOvVaw1NF6yywNhvovD73UkxxUoz&ust=1611518113382000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjK5Lbqsu4CFQAAAAAdAAAAABAJ"
          }}
          style={styles.image}>
          <ScrollView style={styles.inner}>
              
            <View>
              <Image
                style={styles.logo}
                source={{
                  uri:
                    'https://img.favpng.com/17/10/12/blood-donation-logo-blood-bank-png-favpng-VjmcnSqewheyp0jS0girySXpt.jpg',
                }}
              />
            </View>
            <Text style={styles.SignUp}>SignIn</Text>

            <View style={styles.firstNameSec}>
              <TextInput
                style={styles.firstName}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                placeholderTextColor="#8B0000"
                placeholder="abc@example.com"
              />
            </View>
            <View style={styles.firstNameSec}>
              <TextInput
                style={styles.firstName}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry
                placeholderTextColor="#8B0000"
                placeholder="password"
              />
            </View>
            <Button
              onPress={
                  onLogin
                }
              
              block
              danger
              style={{marginTop: 20, backgroundColor: '#8B0000'}}>
                <ActivityIndicator color="white"size="small" animating={loading} />

              <Text style={{color: 'white'}}>SignIn</Text>

            </Button>

            <View style={{marginTop: 20}}>
              <Text style={{color: 'grey', textAlign: 'center'}}>or</Text>
              <Text
                onPress={() => props.navigation.navigate('SignUp')}
                style={{
                  color: 'grey',
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Create an account
              </Text>
            </View>
            </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
}

export default LogIn;

// export default LogIn;
const styles = StyleSheet.create({
  logo: {alignSelf: 'center', width: 100, height: 100},

  outer: {
    flex:1,
  },
  inner: {
    // width:19,
    
    paddingHorizontal: 50,
    paddingBottom: 60,
    paddingTop: 40,
    backgroundColor: 'white',
    marginHorizontal: 40,
    marginVertical: 30,
    borderRadius: 10,
    opacity:0.8,
  },
  SignUp: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    // color:"#8B0000",
    color: '#8B0001',
    fontFamily: 'inherit',
    textShadowColor: 'gray',
    textShadowRadius: 6,
    textShadowOffset: {width: -3, height: 4},
  },
  firstNameSec: {
    marginTop: 20,
  },
  firstName: {
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 13,
    margin: 0,
    color: 'black',
    padding: 0,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // opacity:0.9
  },
});
