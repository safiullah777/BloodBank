import React, {Component, useEffect, useState,useContext} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
  Alert,
  TouchableOpacity,
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
} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import auth from '@react-native-firebase/auth';
import {createDrawerNavigator,DrawerItem,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import { AuthContext } from '../authproider/authprovider';
import { StackView } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';


function Details({navigation}) {
  const [age,setAge]=useState();
  const [weight,setWeight]=useState();
  const [gender,setGender]=useState("male");
  const [bloodGroup,setBloodGroup]=useState("A+");
  const [phoneNo,setPhoneNo]=useState();
  const [city,setCity]=useState();
  const [cnic,setCNIC]=useState();
  const [address,setAddress]=useState();
  const [useData,setUserData]=useState([]);
  const [loading,setLoading]=useState(true);

  const {UpdateDetails} = useContext(AuthContext);
  const Update=()=>{
    if(age && weight && gender && bloodGroup && phoneNo && city && cnic && address){
    UpdateDetails(age,weight,gender,bloodGroup,phoneNo,city,cnic,address)
      navigation.navigate("MedicalDetails")
  }
    else{
      Alert.alert('warning!', 'Please fill all fields', [
        {
          text: 'Ok',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
      console.log(age , weight, gender , bloodGroup, phoneNo, city, cnic ,address)
    }
  }
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
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
  useEffect(
    () => {
      const db=firestore().collection('Users').doc(auth().currentUser.uid).onSnapshot(
        (data)=>{
          // console.log(data.data())

          // if(data.data().age){
          setUserData(data.data())
          setAge(data.data().age)
          setWeight(data.data().weight)
          setGender(data.data().gender || "male")
          setBloodGroup(data.data().bloodGroup || "A+")
          setPhoneNo(data.data().phoneNo)
          setCity(data.data().city)
          setAddress(data.data().address)
          setCNIC(data.data().cnic)
          setLoading(false)
      // }
    }
      )
      return db
  },[]);
  return (
    <>
    {loading ? false:<>

      <View style={{backgroundColor: 'red', flex: 1, margin: 0}}>
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
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Personal Details
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>Age</Text>
                <TextInput
                  onChangeText={text=>setAge(text)}
                  value={age}
                  placeholder="18"
                  keyboardType="number-pad"
                  maxLength={3}
                  style={styles.firstName}
                />
              </View>

              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>weight</Text>
                <TextInput
                  value={weight}
                  onChangeText={text=>setWeight(text)}
                  placeholder="60 kg"
                  keyboardAppearance="dark"
                  maxLength={4}
                  keyboardType="number-pad"
                  style={styles.firstName}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>Gender</Text>
                <Picker
                  style={styles.choose}
                  selectedValue={gender || "male"}
                  onValueChange={(itemValue) =>
                    setGender(itemValue)
                  }>
                  <Picker.Item label="male" value="male" />
                  <Picker.Item label="female" value="female" />
                </Picker>
              </View>

              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>Blood Group</Text>
                <Picker
                  style={styles.choose}
                  selectedValue={bloodGroup || "A+"}
                  placeholder="blood group"
                  onValueChange={(itemValue, itemIndex) =>
                    setBloodGroup(itemValue)
                  }>
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>Phone Number</Text>
                <TextInput
                  value={phoneNo}
                  onChangeText={text=>setPhoneNo(text)}
                  placeholder="03XX-XXXXXXX"
                  keyboardType="number-pad"
                  maxLength={12}
                  style={styles.firstName}
                />
              </View>
              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>City</Text>
                <TextInput
                  value={city}
                  onChangeText={text=>setCity(text)}
                  placeholder="karachi"
                  maxLength={12}
                  style={styles.firstName}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>CNIC</Text>
                <TextInput
                  value={cnic}
                  onChangeText={text=>setCNIC(text)}
                  placeholder="XXXXX-XXXXXXX-X"
                  style={styles.firstName}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.firstNameSec}>
                <Text style={styles.heading}>Address</Text>
                <TextInput 
                  value={address}
                  onChangeText={text=>setAddress(text)}
               placeholder="Karachi" style={styles.firstName} />
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={()=>Update()}
                style={{width: 89, alignSelf: 'flex-end'}}>
                <Text style={styles.submit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View></>}
    </>
  );
}
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
    paddingHorizontal: 10,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 5,
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
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#8B0001',
    borderBottomWidth: 2,
  },
  firstName: {
    // flex: 1,
    // marginLeft: 10,
    // marginBottom:20,
    // width: 10,
    // height: ,
    // borderBottomColor: '#8B0001',
    // borderBottomWidth: 1,
    // fontSize:22,
    height: 30,
    fontSize: 16,
    marginTop: 3,
    color: 'black',
    padding: 0,
  },
});
export default Details;
