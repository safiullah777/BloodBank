import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header, Left, Button, Icon, Body, Right, Title} from 'native-base';
import {Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DonorDetails = (props) => {
  const [userData,setUserData]=useState([]);
  const {id} = props.route.params;
    useEffect(()=>{
      const db=firestore().collection('Users').doc(id).onSnapshot(
        (data)=>{
          setUserData(data.data())
      }
      )
    return db;

    },[])

  return (
    <>
        <Header style={{backgroundColor: '#8B0001'}}>
          <Left>
            <Button transparent onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
              <Title>DonorDetails</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView style={{flex: 1}}>

        <ImageBackground
          source={{
            uri: 'https://cdn.labmanager.com/assets/articleNo/2917/iImg/6317/357446f0-a1c4-4556-a3ec-4e805ad3454f-dec21-blood.png',
            // uri:"https://healthwatchcenter.com/wp-content/uploads/2015/06/types-of-blood-disorders-related-to-plasma.jpg"
            // "https://us.123rf.com/450wm/mamanamsai/mamanamsai1504/mamanamsai150400893/38378519-stock-vector-donate-blood-design-on-red-background-clean-vector.jpg?ver=6"
            // uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fnewatlas.com%2Fmedical%2Fsynthetic-red-blood-cells-oxygen-drugs-toxin-sensors%2F&psig=AOvVaw1NF6yywNhvovD73UkxxUoz&ust=1611518113382000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjK5Lbqsu4CFQAAAAAdAAAAABAJ"
          }}
          style={styles.image}>
            <View style={{marginTop:20,paddingBottom:10,alignItems:"center"}}>
                  {userData.photourl ? 
                  <Avatar
                    rounded
                    size="xlarge"
                    source={{
                      uri:userData.photourl
                    }}>
                  </Avatar>:
                  <>
                     <Avatar
                    rounded
                    size="xlarge"
                    source={{
                      uri:"https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg"
                    }}>
                  </Avatar>
                  
                  </>
                  } 
                  <Text style={{textAlign:"center",fontSize:28 ,marginTop:8,fontWeight:"bold",color:"white"}}>{userData.full_name}</Text>
          </View>

          <View style={styles.info}>
              <Heading detailtype="personal details" />
              <Data keys={'name:'} value={userData.full_name} />
              <View style={styles.lineStyle} />
              <Data keys={'email:'} value={userData.email} />
              <View style={styles.lineStyle} />
              <Data keys={'Gender:'} value={userData.gender} />
              <View style={styles.lineStyle} />
              <Data keys={'Phone:'} value={userData.phoneNo} />
              <View style={styles.lineStyle} />
              <Data keys={'City:'} value={userData.city} />
              <View style={styles.lineStyle} />
              <Data keys={'Address:'} value={userData.address} />
              <View>
              </View>
            </View>
            <View style={styles.info}>
              <Heading detailtype="Medical details" />
              <MedicalData keys={'Blood Group:'} value={userData.bloodGroup} />
              <View style={styles.lineStyle} />
              <MedicalData keys={'Smoke:'} value={userData.useTobbaco==false ? "No":"Yes" } />
              <View style={styles.lineStyle} />
              <MedicalData keys={'taking any medication'} value={userData.takeMedication==false ? "No":"Yes"} />
              <View style={styles.lineStyle} />
              <MedicalData keys={'Any rare disease'} value={'Cancer,HIV'} />
              <View>
              </View>
            </View>


            






        </ImageBackground>
      </ScrollView>
    </>
  );
};
const Data = (props) => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.heading}>{props.keys}</Text>
          <Text style={styles.value}>{props.value}</Text>
        </View>
      </>
    );
  };
  const MedicalData = (props) => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: '#12998d',
              paddingRight: 10,
              width: '80%',
            }}>
            {props.keys}
          </Text>
          <Text style={styles.value}>{props.value}</Text>
        </View>
      </>
    );
  };
  const Heading = (props) => {
    return (
      <>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 60,
          }}>
          {props.detailtype}
        </Text>
      </>
    );
  };
  
export default DonorDetails;
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    width:"90%",
    margin: 10,

  },
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',

  },
  heading: {
    fontWeight: 'bold',
    fontSize: 17,
    // borderColor: 1,
    // borderColor: 'black',
    color: '#12998d',
    paddingRight: 10,
    width: '30%',
  },
  value: {
    fontSize: 14,
    color: 'blue',
    flexShrink: 1,
    marginLeft: 3,
    fontWeight:"900"

  },
  info: {
    // width:"80%",
    // height: "40%",
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    margin: 20,
    flexWrap: 'wrap',
    opacity:0.9,
    
    // position:"absolute"
  },
  firstNameSec: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: '#8B0001',
    borderBottomWidth: 2,
  },
  firstName: {
    height: 30,
    fontSize: 16,
    marginTop: 3,
    color: 'black',
    padding: 0,
  },
  });
  