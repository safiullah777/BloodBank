import React, {Component, useEffect, useState,useContext} from 'react';
import CheckBox from '@react-native-community/checkbox';
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
  Switch,
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
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../authproider/authprovider';
import firestore from '@react-native-firebase/firestore';

function MedicalDetails({navigation}) {
  const {UpdateMedicalDetails} = useContext(AuthContext);
  const [takeMedication, setTakeMedication] = useState(false);
  const [useTobbaco, setUseTobbaco] = useState(false);
  const [useData,setUserData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [haveDisease, setHaveDisease] = useState({
    HIV: false,
    cancer: false,
    Hepatitis_B_and_C: false,
    AIDS: false,
    STD: false,
    LungDisease: false,
  });
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
          setUseTobbaco(data.data().useTobbaco)
          setTakeMedication(data.data().takeMedication)
          setHaveDisease({
            HIV: data.data().haveDisease.HIV,
            cancer: data.data().haveDisease.cancer,
            Hepatitis_B_and_C: data.data().haveDisease.Hepatitis_B_and_C,
            AIDS: data.data().haveDisease.AIDS,
            STD: data.data().haveDisease.STD,
            LungDisease: data.data().haveDisease.LungDisease,
          })

          setLoading(false)
      }
      )
      return db
      },[]);






  const onUpdate=()=>{
      UpdateMedicalDetails(takeMedication,useTobbaco,haveDisease);
      navigation.navigate("Dashboard")
  }
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
          <View style={styles.inner}>  
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Medical Details
              </Text>
            </View>



            <View style={styles.firstNameSec}>
              <Text style={styles.heading}>
                Do you smoke or use tobbaco in any form?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginHorizontal: 3,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginTop: 2,
                    marginRight: 3,
                  }}>
                  No
                </Text>
                <Switch
                  value={useTobbaco}
                  onValueChange={(value) => {
                    setUseTobbaco(value);
                  }}
                  disabled={false}
                  activeText={'On'}
                  inActiveText={'Off'}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#30a566'}
                />
                <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 1}}>
                  Yes
                </Text>
              </View>
            </View>




            <View style={styles.firstNameSec}>
              <Text style={styles.heading}>Are you taking any medication?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginHorizontal: 3,
                  marginBottom:1,
                  padding:0,

                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginTop: 2,
                    marginRight: 3,

                  }}>
                  No
                </Text>
                <Switch
                  value={takeMedication}
                  onValueChange={(value) => {
                    setTakeMedication(value);
                    // console.log('set ', value);
                  }}
                  disabled={false}
                  activeText={'On'}
                  inActiveText={'Off'}
                  backgroundActive={'green'}
                  backgroundInactive={'gray'}
                  circleActiveColor={'#30a566'}
                />
                <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 1}}>
                  Yes
                </Text>
              </View>
            </View>

            <View style={styles.firstNameSec}>
              <Text style={styles.heading}>
                Do you have any of these disease?if yes ,please select.
              </Text>

              <View style={{flexDirection: 'row',}}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    
                    // value={useData.haveDisease.HIV}
                    value={haveDisease.HIV}
                    onValueChange={(value) => {
                      setHaveDisease({...haveDisease, HIV: value});
                    }}
                    style={styles.checkbox}
                  />
                  <Text style={{margin: 5}}>HIV</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={haveDisease.cancer}
                    // value={useData.haveDisease.cancer}
                    onValueChange={(value) => {
                      setHaveDisease({...haveDisease, cancer: value});
                    }}
                    style={styles.checkbox}
                  />

                  <Text style={{margin: 5}}>Cancer</Text>
                </View>
              
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={haveDisease.AIDS}

                    // value={useData.haveDisease.AIDS}
                    onValueChange={(value) => {
                      setHaveDisease({...haveDisease, AIDS: value});
                    }}
                    style={styles.checkbox}
                  />
                  <Text style={{margin: 5}}>AIDS</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    // value={useData.haveDisease.Hepatitis_B_and_C}
                    value={haveDisease.Hepatitis_B_and_C}

                    onValueChange={(value) => {
                      setHaveDisease({
                        ...haveDisease,
                        Hepatitis_B_and_C: value,
                      });
                    }}
                    style={styles.checkbox}
                  />
                  <Text style={{margin: 5}}>Hepatitis B and C</Text>
                </View>
               
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    value={haveDisease.LungDisease}

                    // value={useData.haveDisease.LungDisease}
                    onValueChange={(value) => {
                      setHaveDisease({...haveDisease, LungDisease: value});
                    }}
                    style={styles.checkbox}
                  />
                  <Text style={{margin: 5}}>Lungs Disease</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    // checked
                    value={haveDisease.STD}
                    // value={useData.haveDisease.STD}
                    onValueChange={(value) => {
                      setHaveDisease({...haveDisease, STD: value});
                    }}
                    style={styles.checkbox}
                  />
                  <Text style={{margin: 5}}>STD</Text>
                </View>
              </View>
            </View>

            

              <TouchableOpacity
                onPress={onUpdate}
                style={{ alignSelf: 'flex-end',marginBottom:30}}>
                <Text style={styles.submit}>Submit</Text>
              </TouchableOpacity>
          </View>
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
    fontSize: 14,
    color: '#12998d',
  },
  choose: {
    // fontSize:18,
    //    width:90,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 0,
    color: 'grey',
    // height: 30,
    // backgroundColor:"#e5e3e3"
    // borderBottomColor
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
    flex: 1,
    // height: 550,
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
    // flex: 1,
    paddingBottom:0,
    marginTop: 17,
    marginLeft: 20,
    marginRight: 20,
    // borderColor: '#8B0001',
    // borderWidth: 2,
    marginBottom:1,
  },
  firstName: {
    height: 30,
    fontSize: 16,
    marginTop: 3,
    color: 'black',
    padding: 0,
    // borderBottomColor: '#8B0001',
    // borderBottomWidth: 2,
  },
});
export default MedicalDetails;
