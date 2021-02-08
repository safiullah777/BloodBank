import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Navigation from './components/config/navigation';
import Dashboard from './components/dashboard';
import DonorDetails from './components/donorDetails';
import {AuthProvider} from './authproider/authprovider';
const App: () => React$Node = () => {
  return (
    <>
      {/* <Dashboard />
      <DonorDetails /> */}
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </>
  );
};

export default App;
