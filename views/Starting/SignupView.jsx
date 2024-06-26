import React from 'react';
import { View, Text, Image, useWindowDimensions, TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import Logo from '../../assets/logo/logo2.png';
import Style from '../Style';
import CustomInput from '../CustomInput';
import { useSignupController } from '../../controller/SignupController'; // Import the controller
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './actionLoader';

const Signup = () => {
  const { height } = useWindowDimensions();
  const {
  formData,
  setFormData,
  errors,
  setErrors,
  isPasswordValid,
  isUppercase,
  isLowercase,
  hasNumber,
  hasSymbol,
  goToSignin,
  handleSignUp,
  loader,
  SetLoader

  } = useSignupController();

  return (
   
    <View style={Style.common} >
      <Loader visible ={loader} message="Registering..."/>

      <Image source={Logo} style={[Style.logo, { height: height * 0.19 }]} />
      <View style={Style.container}>
        
        <Text style={Style.textcolor}>CREATE ACCOUNT</Text>

        <CustomInput
          iconName="email"
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          error={errors.email}
          onFocus={() => {
            setErrors((prevErrors) => ({ ...prevErrors, email: null }));
          }}
        />

        <CustomInput
          iconName="lock"
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          error={errors.password}
          onFocus={() => {
            setErrors((prevErrors) => ({ ...prevErrors, password: null }));
          }}
        />

        {errors.password && (
          <View style={{ flexDirection: 'row', top: -12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isUppercase ? 'check' : 'times'}
                size={15}
                color={isUppercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Uppercase</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={isLowercase ? 'check' : 'times'}
                size={15}
                color={isLowercase ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Lowercase</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Icon
                name={hasNumber ? 'check' : 'times'}
                size={15}
                color={hasNumber ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Number</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name={hasSymbol ? 'check' : 'times'}
                size={15}
                color={hasSymbol ? 'green' : '#810000'}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 12, color: '#144714' }}>Symbol</Text>
            </View>
          </View>
        )}

        <CustomInput
          iconName="lock"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
          error={errors.confirmPassword}
          onFocus={() => {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: null }));
          }}
        />

        <TouchableOpacity style={Style.signInButton} onPress={handleSignUp}>
          <Text style={Style.signInButtonText}>Register</Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginVertical: 20,
            color: '#144714',
          }}
        >
          Already have an account?{' '}
          <Text onPress={goToSignin} style={{ color: '#E3B448' }}>
            Login
          </Text>
        </Text>
      </View>
    </View>
   
  );
};

export default Signup;
