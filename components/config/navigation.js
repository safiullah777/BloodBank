import React, {useState, useEffect, useContext} from 'react';
import SignUp from '../signup';
import LogIn from '../login';
import Details from '../details';
import MedicalDetails from '../medicalDetails';
import Dashboard from '../dashboard'
import Information from '../information';
import Profile from '../profile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {Avatar} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Touchable, Text, View, Alert, useCallback} from 'react-native';
import {AuthContext} from '../../authproider/authprovider';
import storage from "@react-native-firebase/storage"
import firestore from '@react-native-firebase/firestore'
import DonorDetails from '../donorDetails'
// import auth from '@react-native-firebase/auth';
const Drawer = createDrawerNavigator();
const Navigation = (props) => {
  const {user, setUser} = useContext(AuthContext);

  const [initializing, setInitializing] = useState(true);
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const [islogout, setlogout] = useState(false);
  const [userData, setUserData] = useState([]);
  const [photourl, setPhotoURI] = useState(null);

  useEffect(()=>{
    if(auth().currentUser){
    const db = firestore().collection('Users').doc(auth().currentUser.uid).onSnapshot(
                  (data)=>{
                    setUserData(data.data());
                  }
                )
            return db
    }
  
  },[])
  const tomarFoto = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setPhotoURI(response);
        console.log(response);
        const imageUpload = storage().ref("profilePics/" + response.fileName).putFile(response.uri)
                imageUpload.on('state_changed', (snapshot) => {
                    console.log(snapshot)
                }, (error) => {
                    console.log(error)
                }, () => {
                    imageUpload.snapshot.ref.getDownloadURL().then(async(downloadUrl) => {
                        console.log(downloadUrl)
                        await auth().currentUser.updateProfile({
                            photoURL: downloadUrl
                        })
                        await firestore().collection('Users').doc(auth().currentUser.uid).update({
                            photourl: downloadUrl
                        })
                    })
                })


      }
    });
  };

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false)
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if(initializing){
    return null
  }

  return (
    <>
      <NavigationContainer>

        {user ? <><Drawer.Navigator drawerType="slide"
          drawerContent={(props) => {
            return (
              <DrawerContentScrollView {...props}>
                <View style={{alignItems: 'center',backgroundColor:"#ede8e8",paddingVertical:20}}>
                {/* {!photourl ? <></>} */}
                  {auth().currentUser.photoURL ? 
                  <Avatar
                    onPress={tomarFoto}
                    rounded
                    size="xlarge"
                    source={{
                      uri:auth().currentUser.photoURL
                    }}>
                  </Avatar>:<>
                  {userData.gender=="female"?
                  <>
                    <Avatar
                    activeOpacity={0.9}
                    // avatarStyle={{backgroundColor:"white"}}
                    // style={{backgroundColor:"white"}}
                    onPress={tomarFoto}
                    rounded
                    size="xlarge"
                    source={{
                      uri:"https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-female.jpg"
                    }}>
                  </Avatar>
                  
                  </>
                  :<>
                  <Avatar
                    activeOpacity={0.9}
                    // avatarStyle={{backgroundColor:"white"}}
                    // style={{backgroundColor:"white"}}
                    onPress={tomarFoto}
                    rounded
                    size="xlarge"
                    source={{
                      uri:"https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg"
                    }}>
                  </Avatar></>}
                  
                  </>}
                </View>
                {/* <DrawerItemList {...props} /> */}
                <DrawerItem onPress={()=>props.navigation.navigate("Dashboard")} label="DashBoard" />                
                <DrawerItem onPress={()=>props.navigation.navigate("Profile")} label="Profile" />                
                <DrawerItem onPress={() => auth().signOut()} label="Logout" />                
              </DrawerContentScrollView>
            );
          }}
          initialRouteName="Dashboard">
            {/* <Text>ddj</Text> */}
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Details" component={Details} />
          <Drawer.Screen name="MedicalDetails" component={MedicalDetails} />
          <Drawer.Screen name="DonorDetails" component={DonorDetails} />
        </Drawer.Navigator>
        
        
        </> :

        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="MedicalDetails" component={MedicalDetails} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen  name="Profile" component={Profile} />
        </Stack.Navigator>
          }
         
      </NavigationContainer>
    </>
  );
};

export default Navigation;
