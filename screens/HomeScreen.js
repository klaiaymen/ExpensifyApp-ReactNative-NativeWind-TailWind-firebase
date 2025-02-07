import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { getDoc, getDocs, query, where } from 'firebase/firestore'
import { useSelector } from 'react-redux'

var items = [
    {
        id:1,
        place: 'Gujrat',
        country: 'Pakistan'
    },
    {
        id:2,
        place: 'London Eye',
        country: 'England'
    },
    {
        id:3,
        place: 'Washington dc',
        country: 'America'
    },
    {
        id:4,
        place: 'New York',
        country: 'America'
    },
    {
        id:5,
        place: 'Washington dc',
        country: 'America'
    },
    {
        id:6,
        place: 'New York',
        country: 'America'
    },
]
export default function HomeScreen() {
    const navigation = useNavigation();
    const {user} = useSelector(state=> state.user);
    const [trips, setTrips] = useState([]);

    const isFocused = useIsFocused();
        const fetchTrips = async () => {
            if (!user) {
                console.log("No user found, skipping fetchTrips.");
                return;
            }
        
            try {
                console.log("Fetching trips for user:", user.uid);
        
                const q = query(tripsRef, where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
        
                if (querySnapshot.empty) {
                    console.log("No trips found for this user.");
                } else {
                    let data = [];
                    querySnapshot.forEach((doc) => {
                        console.log("Document data:", doc.id, doc.data()); // Debugging
                        data.push({ ...doc.data(), id: doc.id });
                    });
        
                    console.log("Trips fetched:", data);
                    setTrips(data);
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };
        

    useEffect(()=>{
        if(isFocused)
            fetchTrips();
    },[isFocused])

    
    const handleLogout = async ()=>{
        await signOut(auth);
    }
  return (
   <ScreenWrapper className="flex-1">
        <View className="flex-row justify-between items-center p-4">
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm` }> 
                Expensify
            </Text>
            <TouchableOpacity onPress={handleLogout} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
                <Text className={colors.heading}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4 shadow-md'>
            <Image source={require('../assets/images/2.png')} className='w-60 h-60'></Image>
        </View>
        <View className='px-4'> 
            <View className="flex-row justify-between items-center">
                <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('AddTrip')} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
                    <Text className={colors.heading}>Add Trip</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 520}}>
                <FlatList
                    data={trips}
                    numColumns={2}
                    keyExtractor={item=>item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyList mesage={"You haven't recorded any trips Yet !"}/>}
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }} 
                    className='mt-1'
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity onPress={()=> navigation.navigate('TripExpenses',{...item})} className='bg-white p-3 rounded-2xl mb-3 shadow-md w-52 justify-center items-center'>
                                <View>
                                    <Image source={randomImage()} className='w-36 h-36 mb-2'></Image>
                                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                          
                        )
                    }}
                />
            </View>
        </View>
   </ScreenWrapper>
  )
}