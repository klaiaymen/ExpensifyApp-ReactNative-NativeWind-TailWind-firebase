import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
export default function BackButton() {
    const navigation= useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('Home')} className='bg-white rounded-full h-8 w-8'>
      <ChevronLeftIcon size="30" color={colors.button}/>
    </TouchableOpacity>
  )
}