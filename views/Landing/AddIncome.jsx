import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Plus from '../../assets/Icon/plus.png'
import Style from '../Style'
import CustomInput from '../CustomInput'
import { useNavigation } from '@react-navigation/native'
import { Asset } from 'expo-asset'
import UserContext from '../../api_server/context'
import randomColor from 'randomcolor'
import { axiosRequest } from '../../api_server/axios'

const AddIncome = () => {
  
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const margin = screenWidth === 360 ? 5 : 2.2;
  const openAddCategory = () => {
    navigation.navigate('Add Category', { destination: 'Add income',cat : null });
  };
  const [income, setIncome] = useState('')
  const [incomeError, setIncomeError] = useState(null)
  const [selectedIcons, setSelectedIcons] = useState(null);
  const [iconAssets, setIconAssets] = useState([])
  const [iconError, setIconError] = useState(null);
  const {context,incomeIcon} = useContext(UserContext)

  const iconPaths = [
    require('../../assets/Icon/income/i1.png'),
    require('../../assets/Icon/income/i2.png'),
    require('../../assets/Icon/income/i3.png'),
    require('../../assets/Icon/income/i4.png'),
    require('../../assets/Icon/income/i5.png'),
    require('../../assets/Icon/income/i6.png'),
    require('../../assets/Icon/income/i7.png'),
    require('../../assets/Icon/income/i10.png'),
    require('../../assets/Icon/income/i9.png'),
    require('../../assets/Icon/income/i12.png'),
    require('../../assets/Icon/income/i13.png'),
    require('../../assets/Icon/income/i8.png'),
    require('../../assets/Icon/income/i14.png'),
    require('../../assets/Icon/income/i15.png'),
    require('../../assets/Icon/income/i17.png'),
    require('../../assets/Icon/income/i16.png'),
    require('../../assets/Icon/income/i23.png'),
  ];

  // console.log(iconPaths)
  // const iconTexts = [
  //   'Business',
  //   'Investment',
  //   'Annuities',
  //   'Capital gain',
  //   'Pension',
  //   'Dividend',
  //   'Rental',
  //   'Freelancing',
  //   'Vlogging',
  //   'Employment',
  //   'Interest',
  //   'Online selling',
  //   'Gifts',
  //   'Commission',
  //   'Sport',
  //   'NFT Sales',
  //   'Lottery',
  // ];

  
  const handleIncomeChange = (text) => {
    // Clear existing errors
    setIncomeError(null)

    // Remove non-digit characters
    const numericValue = text.replace(/[^0-9]/g, '')

    // Format the numeric value with commas
    const formattedIncome = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    setIncome(formattedIncome)
  }

  const toggleIconSelection = (iconUrl) => {
    if (selectedIcons === iconUrl) {
      setSelectedIcons(null); // Deselect the currently selected icon
      setIconError(iconUrl)
    } else {
      setSelectedIcons(iconUrl); // Select the new icon
      setIconError(null)
    }
  };

  const startButtonPressed = async() => {
    // Clear existing errors
    setIncomeError(null);
    setIconError(null); // Clear icon selection error

    // Validate income
    if (!income) {
      setIncomeError('Required');
    }

    // Validate icon selection
    if (!selectedIcons) {
      setIconError('no_icon_selected');
    }

    else if (!incomeError && !iconError && income) {
      navigation.navigate('Home');
      console.log('Income:', parseInt(income.replace(/,/g, ''), 10))
      console.log('Icon:', selectedIcons)
      // console.log('text:', iconTexts[selectedIcons])

      Data = {
        user : context.id,
        title : selectedIcons.text,
        amount : parseInt(income.replace(/,/g, ''), 10),
        icon : selectedIcons.icon,
        color : randomColor()
      }

      await  axiosRequest.post('gabay/add/',Data).then((response)=>{
        alert(`Task Failed Sucessfully!`)
        navigation.navigate('Home');

      }).catch((e)=>{
        console.log(Data)
      })
    }
    
  };

  useEffect(() => {
    const loadIcons = async () => {
      // Load and cache the icon assets
      const loadedAssets = await Promise.all(
        incomeIcon.income.map((path) => Asset.fromModule(path.icon).downloadAsync())
      )

      // Set the iconAssets state with the loaded assets
      setIconAssets(loadedAssets)
    }

    loadIcons()
  }, [])

  return (
    <View style={Style.common}>
      <View>
        <View
          style={{
            top: 20,
            alignSelf: 'center',
            backgroundColor: '#2b5127',
            paddingTop: 5,
            paddingBottom: -70,
            paddingHorizontal: 20,
            marginHorizontal: 40,
            borderRadius: 5,
          }}
        >
          <CustomInput
            iconName="currency-php"
            placeholder="00.00"
            keyboardType="numeric"
            value={income}
            onChangeText={handleIncomeChange}
            error={incomeError}
            onFocus={() => {
              // Clear income error on focus
              setIncomeError(null)
            }}
          />
          <Text style={{ top: -10, textAlign: 'center', color: '#E3B448' }}>Amount</Text>
        </View>
      </View>
      <View style={{ top: 30, borderBottomWidth: 1, borderColor: '#144714', margin: 10, alignItems: 'center' }}>
        <Text style={{ color: iconError ? '#810000' : '#E3B448', paddingVertical: 5 }}>Select categories</Text>
      </View>
      
      <View style={{ top: 30, height: 280, overflow: 'hidden', margin: 10, borderWidth: 1, borderColor: iconError ? '#810000' : '#144714',  borderRadius: 20,  }}>
      <ScrollView 
      nestedScrollEnabled
      contentContainerStyle={{ backgroundColor: '#2b5627', flexDirection: 'row', flexWrap: 'wrap', padding: 5 ,alignSelf:"center", justifyContent: 'center'}}>
      {incomeIcon.income.map((iconUrl, index) => (
      <TouchableOpacity
      key={index}
      style={{
        margin: margin,
        alignItems: 'center',
      }}
      onPress={() => {toggleIconSelection(iconUrl) }}
    >
      <View
        style={{
          backgroundColor: selectedIcons === iconUrl ? '#CBD18F' : 'transparent',
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Image source={iconUrl.icon} style={{ width: 50, height: 50}} />
      </View>
      <Text style={{ marginTop: 5, color: '#E3B448', fontSize: 10, fontWeight: 'bold' }}>{iconUrl.text}</Text>
    </TouchableOpacity>
  ))}
  <TouchableOpacity
            style={{
              margin: 2,
              alignItems: 'center',
            }}
            onPress={openAddCategory}
          >
            <View
              style={{
                backgroundColor: 'transparent', // You can set your desired background color
                padding: 5,
                margin: 5,
                borderRadius: 5,
              }}
            >
            <Image source={Plus} style={{ width: 50, height: 50 }} />
            </View>
            </TouchableOpacity>
        </ScrollView>
      
        </View>
        
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between', // Apply space-between here
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          width: '100%',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CBD18F',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={startButtonPressed}
          >
            <Text style={{ color: '#144714', fontSize: 18,}}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '45%' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#810000',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%', // Set the width to 100% for the inner View
            }}
            onPress={() => {
              navigation.navigate('Home')
            }}
          >
            <Text style={{ color: '#CBD18F', fontSize: 18, }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AddIncome
