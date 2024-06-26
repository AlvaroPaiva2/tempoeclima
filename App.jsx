import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainCard from './components/MainCard';
import InfoCard from './components/InfoCard';
import * as Location from 'expo-location';
import getCurrentWeather from './api/ConsultaApi';
import axios from 'axios';

export default function App() {

  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('27')
  const [location, setLocation] = useState('BR, Nilopolis')
  const [currentHour, setCurrentHour] = useState('13:00')
  const [wind, setWind] = useState('65')
  const [umidity, setUmidity] = useState('80')
  const [tempMin, setTempMin] = useState('21')
  const [tempMax, setTempMax] = useState('31')
  const [locationCoords, setLocationCoords] = useState([])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#0e112c' : '#509bf4',
      alignItems: 'center',
    },
    temperature: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? '#bdc08a' : 'black',
      fontSize: 50,
    },
    refreshButton: {
      position: 'absolute',
      margin: 30,
      alignSelf: 'flex-start',
    },
    cardView: {
      color: darkTheme ? 'black' : 'white',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    info: {
      alignItems: 'center',
      backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
      borderRadius: 20,
      width: 350,
      height: 230,
    },
    infoText: {
      color: darkTheme ? '#bdc08a' : 'black',
      margin: 15,
      fontSize: 20,
      fontWeight: 'bold',
    },
    infoCards: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    squareButton: {
      backgroundColor: darkTheme ? '#f2f2f2' : '#8f8f8f',
      justifyContent: 'center',
      marginRight: 20,
      width: 50,
      height: 25,
      borderRadius: 20,
    },
    circleButton: {
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
    },
    text: {
      color: darkTheme ? '#bdc08a' : 'black',
      margin: 5,
      marginLeft: 15,
      fontSize: 18,
    },
    value: {
      color: darkTheme ? '#bdc08a' : 'black',
      margin: 5,
      marginLeft: 15,
      fontSize: 18,
    }

  }
  );

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Sem permissão')
    } else {
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
      console.log(location.coords)
    }
  };

  useEffect(() => {
    getLocation()
    getCurrentWeather(locationCoords)
  }, [])

  return (
    <View style={styles.container}>

      <Pressable style={styles.refreshButton}>
        <EvilIcons name="refresh" size={30} color={darkTheme ? '#bdc08a' : 'black'} />
      </Pressable>

      <Feather name={darkTheme ? 'moon' : 'sun'} style={{ marginTop: 55 }} size={40} color={darkTheme ? '#bdc08a' : 'black'} />

      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
      </View>

      <Text style={[styles.temperatureText, { fontSize: 14 }]}>{location}, {currentHour}</Text>

      <View style={styles.cardView}>
        <MainCard title={'Manhã'} backgroundColor={darkTheme ? '#ff873d' : '#cc6e30'} temperature={'28°'} icon={'morning'}></MainCard>
        <MainCard title={'Tarde'} backgroundColor={darkTheme ? '#d29600' : '#fcc63f'} temperature={'36°'} icon={'afternoon'}></MainCard>
        <MainCard title={'Noite'} backgroundColor={darkTheme ? '#008081' : '#38b7b8'} temperature={'25°'} icon={'night'}></MainCard>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Informações adicionais</Text>
        <View style={styles.infoCards}>
          <InfoCard title={'Vento'} color= {darkTheme ? '#bdc08a' : 'black'} value={wind + ' m/h'}></InfoCard>
          <InfoCard title={'Umidade'} color= {darkTheme ? '#bdc08a' : 'black'} value={umidity + '%'}></InfoCard>
          <InfoCard title={'Temp. Min'} color= {darkTheme ? '#bdc08a' : 'black'} value={tempMin + '°'}></InfoCard>
          <InfoCard title={'Temp. Max'} color= {darkTheme ? '#bdc08a' : 'black'} value={tempMax + '°'}></InfoCard>
        </View>
      </View>

      <View style={styles.themeButton}>
        <View style={styles.squareButton}>
          <TouchableOpacity style={styles.circleButton} onPress={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)}></TouchableOpacity>
        </View>
      </View>

    </View>
  );
};