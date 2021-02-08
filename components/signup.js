import React, {Component, useState,useContext,useEffect} from 'react';
import {
  Image,
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  ScrollViewBase,
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
} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../authproider/authprovider';



function SignUp({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const {loading, signUp,signUpError ,setSignUpError} = useContext(AuthContext);
  
  if(signUpError){
    Alert.alert('error', signUpError, [
      {
        text: 'ok',
        onPress: () => setSignUpError(false),
        style: 'cancel',
      },
    ]);
  }

  const register = async () => {
    if (email && firstName && lastName && password && ConfirmPassword) {
        signUp(email , firstName , lastName, password ,ConfirmPassword)
    } else if (password !== ConfirmPassword) {
      Alert.alert('error', 'Password does not match', [
        {
          text: 'ok',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      Alert.alert('error', 'please fill all fields', [
        {
          text: 'ok',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <>
      <View style={{backgroundColor: 'red', flex: 1, margin: 0}}>
        <ImageBackground
          source={{
            uri:
              'https://cdn.labmanager.com/assets/articleNo/2917/iImg/6317/357446f0-a1c4-4556-a3ec-4e805ad3454f-dec21-blood.png',
            // uri:"https://healthwatchcenter.com/wp-content/uploads/2015/06/types-of-blood-disorders-related-to-plasma.jpg"
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

            <Text style={styles.SignUp}>SignUP</Text>
            <View style={styles.firstNameSec}>
              {/* <Text style={{fontSize:22,fontWeight:"bold",color:"white"}}>First Name:</Text> */}
              <TextInput
                style={styles.firstName}
                onChangeText={(text) => setFirstName(text)}
                placeholderTextColor="#8B0000"
                placeholder="first name"
              />
            </View>
            <View style={styles.firstNameSec}>
              {/* <Text style={{fontSize:22,fontWeight:"bold",color:"white"}}>Last Name:</Text> */}
              <TextInput
                style={styles.firstName}
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor="#8B0000"
                placeholder="last name"
              />
            </View>
            <View style={styles.firstNameSec}>
              {/* <Text style={{fontSize:22,fontWeight:"bold",color:"white"}}>Email:</Text> */}
              <TextInput
                style={styles.firstName}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#8B0000"
                placeholder="abc@example.com"
              />
            </View>
            <View style={styles.firstNameSec}>
              {/* <Text style={{fontSize:22,color:"white"}}>Password</Text> */}
              <TextInput
                style={styles.firstName}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#8B0000"
                placeholder="password"
              />
            </View>
            <View style={styles.firstNameSec}>
              {/* <Text style={{fontSize:22,fontWeight:"bold",color:"white"}}>Confirm Password</Text> */}
              <TextInput
                style={styles.firstName}
                secureTextEntry
                placeholderTextColor="#8B0000"
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder="confirm password"
              />
            </View>

            <Button
              onPress={
                  register
              }
              
              block
              danger
              style={{marginTop: 20, backgroundColor: '#8B0000'}}>
              <ActivityIndicator
                color="white"
                size="small"
                animating={loading}
              />

              <Text style={{color: 'white'}}>SignUP</Text>
            </Button>
            <View style={{marginTop: 20}}>
              <Text style={{color: 'grey', textAlign: 'center'}}>
                already have an account?
              </Text>

              <Text
                onPress={() => navigation.navigate('LogIn')}
                style={{
                  color: 'grey',
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Login
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },

  inner: {
    // flex: 1,
    height:"100%",
    paddingHorizontal: 40,
    paddingBottom: 40,

    paddingTop: 20,
    backgroundColor: 'white',
    marginHorizontal: 40,
    marginVertical: 40,
    borderRadius: 10,
    // shadowOffset:{width:-2,height:-2},
    // borderColor:"#8B0000",
    // shadowColor:"#8B0000",
    // shadowRadius:80,
    // shadowOpacity:0.4
    backgroundColor: 'white',
    opacity: 0.8,
    
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
    marginTop: 10,
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
export default SignUp;
