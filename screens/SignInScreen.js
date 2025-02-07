import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/loading'
import { setUserLoading } from '../redux/slices/user'

export default function SignInScreen() {
    const [email,setEmail] = useState(''); 
    const [password,setPassword   ] = useState(''); 

    const {userLoading} = useSelector(state => state.user);
    const navigation = useNavigation();
    const dispatch=useDispatch();
    const handleSubmit= async ()=>{
        if(email && password){
            try {
                dispatch(setUserLoading(true));
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false));
                console.log("User signed in:", userCredential.user);
            } catch (error) {
                dispatch(setUserLoading(false));
                console.error("Firebase Sign In Error:", error.message);
                Snackbar.show({
                    text: error.message,
                    backgroundColor: 'red'
                });
            }
        }
        else{
            //show error
            Snackbar.show({
                text: 'Email and password are required!',
                backgroundColor: 'red'
            });
        }
    }
  return (
    <ScreenWrapper>
        <View className='flex justify-between h-full mx-4'>
            <View>
                <View className='relative'>
                    <View className='absolute top-0 left-0 '>
                        <BackButton/>
                    </View>
                    
                    <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign In</Text>
                </View>

                <View className='flex-row justify-center my-3 mt-5'>
                    <Image className='min-h-96 w-96' source={require('../assets/images/login.png')}></Image>
                </View>
                <View className='space-y-2 mx-2'>
                    <Text className={`${colors.heading} font-bold text-lg`}>Email</Text>
                    <TextInput value={email} onChangeText={value=>setEmail(value)} className='p-4 bg-white rounded-full mb-3'></TextInput>
                    <Text className={`${colors.heading} font-bold text-lg`}>Password</Text>
                    <TextInput value={password} secureTextEntry onChangeText={value=>setPassword(value)} className='p-4 bg-white rounded-full mb-3'/>
                    <TouchableOpacity className='flex-row justify-end'>
                        <Text>Forget password ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View>
                {
                    userLoading?(
                        <Loading/>
                    ):(
                        <TouchableOpacity  onPress={handleSubmit} style={{backgroundColor:colors.button}}className='my-6 rounded-full p-3 shadow-lg'>
                            <Text className='text-center text-white text-lg font-bold'>Sign In</Text>
                        </TouchableOpacity>
                    )
                }
                
            </View>
        </View>
    </ScreenWrapper>
  )
}