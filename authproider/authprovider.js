import React, {useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const [signUpError, setSignUpError] = useState();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        loginError,
        setLoginError,
        signUpError,
        setSignUpError,
        login: async (email, password) => {
          setLoading(true);
          await auth()
            .signInWithEmailAndPassword(email, password)
            .then((msg) => {
              setLoading(false);
              console.log(msg);
            })
            .catch((err) => {
              setLoading(false);
              setLoginError(err.message);
              console.log(err);
            });
        },
        signUp: async (
          email,
          firstName,
          lastName,
          password,
          ConfirmPassword,
        ) => {
          setLoading(true);
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
              firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .set({
                  id: auth().currentUser.uid,
                  full_name: firstName + ' ' + lastName,
                  email: email,
                  password: password,
                  age: '',
                  gender: '',
                  bloodGroup: '',
                  phoneNo: '',
                  city: '',
                  takeMedication: '',
                  useTobbaco: '',
                  haveDisease: {
                    HIV: false,
                    cancer: false,
                    Hepatitis_B_and_C: false,
                    AIDS: false,
                    STD: false,
                    LungDisease: false,
                  },
                  weight: '',
                  cnic: '',
                  address:"",
                  photourl:""
                });

              setLoading(false);
              // navigation.navigate('LogIn');
              console.log(data);
            })
            .catch((err) => {
              setLoading(false);
              setSignUpError(err.message);
              console.log(err);
            });
        },
        UpdateDetails: async (
          age,
          weight,
          gender,
          bloodGroup,
          phoneNo,
          city,
          cnic,
          address,
        ) => {
          await firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .update({
              age,
              weight,
              gender,
              bloodGroup,
              phoneNo,
              city,
              cnic,
              address,
            });
        },
        UpdateMedicalDetails: async (
          takeMedication,
          useTobbaco,
          haveDisease,
        ) => {
          await firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .update({
              takeMedication,
              useTobbaco,
              haveDisease,
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
