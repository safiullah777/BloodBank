import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Item,
  Input,
  TextInput,
  ImageBackground,
} from 'react-native';
import {
  Card,
  Divider,
  Avatar,
  SearchBar,
  BottomSheet,
  ListItem,
} from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';
import {
  Header,
  Text,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Picker,
  ActivityIndicator,
  Accordion,
  Content,
} from 'native-base';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import firestore from '@react-native-firebase/firestore';
import {useCardAnimation} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const Dashboard = ({navigation}) => {
  const [cityName, setCityName] = useState();
  const [bloodGroup, setBloodGroup] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [useData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [search,setSearch]=useState({city:"",bloodGroup:"All"})


  useEffect(() => {
    console.log(search)
    // if(!search.city && !search.bloodGroup){
    //   const db = firestore()
    //     .collection('Users')
    //     .get()
    //     .then((data) => {
    //       setUserData(data.docs);
    //       setLoading(false);
    //       console.log("city :none && blood group:none")
  
    //     });
  
    //     return ()=>db
    // }
    // else
    //  if(!search.city && search.bloodGroup){
    //   const db = firestore()
    //     .collection('Users')
    //     .get()
    //     .then((data) => {
    //       setUserData(data.docs);
    //       setLoading(false);
    //       console.log("!city && blood group")
  
    //     });
  
    //     return ()=>db
    // }
    // else

     if(search.city=="" && search.bloodGroup=="All"){
    const db = firestore()
      .collection('Users')
      .get()
      .then((data) => {
        setUserData(data.docs);
        setLoading(false);
        // console.log("city :none && blood group:all")

      });

      return ()=>db
  }

  else  if(!search.city && search.bloodGroup){
    if(search.bloodGroup!="All"){
    const db = firestore().collection('Users')
    .where('bloodGroup','==',search.bloodGroup)
    .onSnapshot(
      (data)=>{
        setUserData(data.docs);
        setLoading(false);
        console.log("!city && blood group")
      }
    )
    return db}
    else{
      const db = firestore()
      .collection('Users')
      .get()
      .then((data) => {
        setUserData(data.docs);
        setLoading(false);
        // console.log("city :none && blood group:all")

      });

      return db
    }
  }
  else 
  if(search.city==undefined && search.bloodGroup=="All"){
    const db = firestore().collection('Users')
                .where('city', '==', search.city)
                .onSnapshot(
                  (data)=>{
                    setUserData(data.docs);
                    setLoading(false);
        console.log("city:undefined  && blood group:all")

                  }
                )
            return db
  }
  else if (search.city && search.bloodGroup){
    const db = firestore().collection('Users')
    .where('city', '==', search.city).
    where('bloodGroup','==',search.bloodGroup)
    .onSnapshot(
      (data)=>{
        setUserData(data.docs);
        setLoading(false);
        console.log("city  && blood group")

      }
    )
return db
  }

//   else{
//     setUserData([]);
//     setLoading(false);
//     console.log("[]")
//   }
}, [search]);


  return (
    <>
      {loading ? (
        false
      ) : (
        <>
          {/* {console.log(useData[0].data())} */}
          <Header style={{backgroundColor: '#8B0001'}}>
            <Left>
              <Button transparent onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Dashborad</Title>
            </Body>
            <Right />
          </Header>

          <View style={{flexDirection: 'row', padding: 5, width: '100%'}}>
            <TextInput
              style={styles.firstName}
              onChangeText={(text) => setCityName(text)}
              placeholderTextColor="#8B0001"
              placeholder="enter city name"
            />
            <View style={{width: '30%'}}>
              <Picker

                selectedValue={bloodGroup}
                placeholder="blood group"
                onValueChange={(itemValue, itemIndex) =>
                  setBloodGroup(itemValue)
                }>
                <Picker.Item label="All" value="All" />
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
            <TouchableOpacity onPress={()=>{setSearch({city:cityName,bloodGroup:bloodGroup});}} style={{justifyContent:"center"}} transparent>
              <Text style={{color: '#8B0001',fontSize:17}}>search</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.main}>
            <ImageBackground
              source={{
                uri:
                  'https://cdn.labmanager.com/assets/articleNo/2917/iImg/6317/357446f0-a1c4-4556-a3ec-4e805ad3454f-dec21-blood.png',
                // uri:"https://healthwatchcenter.com/wp-content/uploads/2015/06/types-of-blood-disorders-related-to-plasma.jpg"
              }}
              style={styles.image}>
              {useData.map((data, i) => {
                return (
                  <>
                  
                    {data.id == auth().currentUser.uid ? (
                      false
                    ) : data.data().age == undefined ? (
                      false
                    ) : (
                      <>

                        <View key={i}>
                          <Card containerStyle={styles.card}>
                            <View style={styles.view}>
                              {data.data().photourl ? 
                              <Avatar
                                size="medium"
                                rounded
                                source={{uri: data.data().photourl}}
                              />:<>
                              {data.data().gender=="male"?
                              <Avatar
                                size="medium"
                                rounded
                                source={{uri: "https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg"}}/>:<>
                                <Avatar
                                size="medium"
                                rounded
                                source={{uri: "https://www.ommel.fi/content/uploads/2019/03/dummy-profile-image-female.jpg"}}/>
                                </>}
                              </>}
                              <View style={{flexDirection: 'column'}}>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    color: 'blue',
                                  }}>
                                  {data.data().full_name}
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text
                                      style={{
                                        color: '#8A0303',
                                        fontWeight: 'bold',
                                        marginLeft: 10,
                                        marginRight: 8,
                                        fontSize: 14,
                                      }}>
                                      Blood Group:
                                    </Text>
                                    <Text style={{color: 'blue'}}>
                                      {data.data().bloodGroup}
                                    </Text>
                                  </View>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text
                                      style={{
                                        color: '#8A0303',
                                        fontWeight: 'bold',
                                        marginLeft: 10,
                                        marginRight: 8,
                                        fontSize: 14,
                                      }}>
                                      Age:
                                    </Text>
                                    <Text style={{color: 'blue'}}>
                                      {data.data().age}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View style={styles.lineStyle} />
                            <View style={styles.view}>
                              <Text style={styles.keys}>Gender:</Text>
                              <Text style={styles.value}>
                                {data.data().gender}
                              </Text>
                            </View>
                            <View style={styles.view}>
                              <Text style={styles.keys}>Weight:</Text>
                              <Text style={styles.value}>
                                {data.data().weight}
                              </Text>
                            </View>
                            <View style={styles.view}>
                              <Text style={styles.keys}>City:</Text>
                              <Text style={styles.value}>
                                {data.data().city}
                              </Text>
                            </View>
                            <TouchableOpacity onPress={()=>{navigation.navigate("DonorDetails",{id:data.data().id})}} style={{alignSelf: 'flex-end'}}>
                              <Text style={styles.submit}>
                                View All Details
                              </Text>
                            </TouchableOpacity>
                          </Card>
                        </View>
                      </>
                    )}
                  </>
                );
              })}
            </ImageBackground>
          </ScrollView>
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  submit: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 3,
    color: '#12998d',
    backgroundColor: '#fbfafc',
    borderRadius: 5,
  },
  firstName: {
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 15,
    margin: 0,
    color: 'black',
    padding: 0,
    width: '50%',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,

    shadowOffset: {
      width: 3,
      height: -6,
    },
    shadowColor: 'white',
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  image: {
    flex: 1,
    // resizeMode: 'cover',
    // justifyContent: 'center',
    // opacity:0.9
  },
  view: {
    flexDirection: 'row',
  },
  keys: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#8B0001',
    // width:"30%",
    flex: 1,
  },
  value: {
    flex: 2,
    marginTop: 3,
    fontSize: 14,
    color: 'black',
    flexWrap: 'wrap',
    // flexShrink: 0,
    // marginLeft: 3,
    // width:"60%",
    // borderColor:"black",
    // borderWidth:2,
    color: 'blue',
  },
  main: {
    flex: 1,
    backgroundColor: '#8B0001',
  },
  card: {
    // backgroundColor:'rgba(56, 172, 236, 1)',
    // backgroundColor:"#8A0303",
    borderWidth: 0,
    borderRadius: 10,
    marginHorizontal: 30,
    padding: 20,
    // height:"40%"
    shadowColor: '#8A0303',
    shadowOffset: {
      width: 4,
      height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8.3,
    elevation: 13,
  },
});
export default Dashboard;
