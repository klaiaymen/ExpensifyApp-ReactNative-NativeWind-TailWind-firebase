import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../config/firebase'


GoogleSignin.configure({
    webClientId: '152363616320-985u8sqvvdnq68tbaav9ggnmhovg83uo.apps.googleusercontent.com',
})


export default function WelcomeScreen() {
    const navigation= useNavigation();

    const signIn = async ()=>{
        try{
            await GoogleSignin.hasPlayServices();
            const {idToken}= await GoogleSignin.signIn();
            const googleCredentials = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth,googleCredentials);
        }catch (error){
            console.log('err : ', error.message);
            if( error.code === statusCodes.SIGN_IN_CANCELLED ){
                // 
            }else if ( error.code === statusCodes.IN_PROGRESS ){
                //
            }else if ( error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE ){
                //
            }else{

            }

        }
    };
  return (
    <ScreenWrapper>
        <View className='h-full flex justify-around'>
            <View className='flex-row justify-center mt-10'>
                <Image source={require('../assets/images/welcome.png')} className='w-80 h-80 shadow'></Image>
            </View>
            <View className='mx-5 mb-20'>
                <Text className={`font-bold text-center ${colors.heading} mb-10 text-4xl`}>Expensify</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('SignIn') } style={{backgroundColor: colors.button}} className='p-3 rounded-full shadow mb-5'>
                    <Text className='text-center text-white text-lg font-bold'>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUp') } style={{backgroundColor: colors.button}} className='p-3 rounded-full shadow mb-5'>
                    <Text className='text-center text-white text-lg font-bold'>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>signIn() }  className='p-3 rounded-full shadow'>
                    <View className='flex-row justify-center items-center space-x-3'>
                        <Image source={require('../assets/images/googleIcon.png')} className='w-8 h-8'></Image>
                        <Text className='text-center text-gray-600 text-lg font-bold ml-3'>Sign In with Google</Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
        </View>
    </ScreenWrapper>
  )
}