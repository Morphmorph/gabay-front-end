import { useNavigation } from '@react-navigation/native';
import { axiosRequest } from '../api_server/axios';
import { useLoginModel } from '../model/LoginModel'; // Import the model
import UserContext from '../api_server/context';
import React from 'react';

export const useLoginController = () => {
  const navigation = useNavigation();
  const { inputs, setInputs, errors, setErrors, isValidEmail,loader,SetLoader} = useLoginModel();
  const {setNav,setContext} = React.useContext(UserContext)

  const goToSignup = () => {
    navigation.navigate('Sign up');
  };

  const goToForgot = () => {
    // navigation.navigate('Forgot password');
    setNav(true)
    navigation.navigate('Verify');
  
  };

  const handleSignIn = async() => {
    // Clear existing errors
    setErrors({});



    // Validate email
    if (!inputs.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
    } else if (!isValidEmail(inputs.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
    }

    // Validate password
    if (!inputs.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
    }

    // Navigate to Home if there are no errors
    if (isValidEmail(inputs.email) && inputs.password) {
      SetLoader(true)
      await axiosRequest.post("auth/login/",JSON.stringify(inputs),{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },).then((response)=>{
        
        // console.log(response.data)
        // must set a loading svreen here from View like Setloading = false 
        if(response.data.status === 200){
          // setContext({email:email})
          const data = {email:response.data.user.email,id :response.data.user.id }
          setContext(data)

          alert(`Hello ${response.data.user.email}`)
          navigation.navigate('Incomes');

        }else if(response.data.status=== 100){
          const data = {email:response.data.user.email,id :response.data.user.id }

          setContext(data)
          navigation.navigate('Homescreen')
        }
        
        else if(response.data.status == 401){
          alert(response.data.Warning)
          setNav(false)
          navigation.navigate('Pin')
        }
        else{
          alert(response.data.Warning)
        }
        SetLoader(false)
      }).catch((err)=>{
        SetLoader(false)
        console.log(err)
        alert("Something Went Wrong! Check your Intertnet Connection")
      })
    }
  };

  return { inputs, setInputs, errors, setErrors, goToSignup, goToForgot, handleSignIn,loader,SetLoader };
};
