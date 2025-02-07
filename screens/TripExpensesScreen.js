import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import ExpenseCard from '../components/expenseCard'
import { expensesRef } from '../config/firebase'
import { getDocs, query, where } from 'firebase/firestore'

var items = [
    {
        id:1,
        title: 'ate sandwich',
        amount: '4',
        category: 'food'
    },
    {
        id:2,
        title: 'Bought a jacket',
        amount: '100',
        category: 'shopping'
    },
    {
        id:3,
        title: 'Watched a movie',
        amount: '50',
        category: 'entertainment'
    }
    
]
export default function TripExpensesScreen(props) {
    const {id, place, country} = props.route.params;
    const navigation = useNavigation();

    const [expenses, setExpenses] = useState([]);
    
        const isFocused = useIsFocused();
            const fetchExpenses = async () => {
                if (!id) {
                    console.log("No expenses found, skipping fetchExpenses.");
                    return;
                }
            
                try {
                    console.log("Fetching expenses for trip:", id);
            
                    const q = query(expensesRef, where("tripId", "==", id));
                    const querySnapshot = await getDocs(q);
            
                    if (querySnapshot.empty) {
                        console.log("No expenses found for this trip.");
                    } else {
                        let data = [];
                        querySnapshot.forEach((doc) => {
                            console.log("Document data:", doc.id, doc.data()); // Debugging
                            data.push({ ...doc.data(), id: doc.id });
                        });
            
                        console.log("expenses fetched:", data);
                        setExpenses(data);
                    }
                } catch (error) {
                    console.error("Error fetching expenses:", error);
                }
            };
            
    
        useEffect(()=>{
            if(isFocused)
                fetchExpenses();
        },[isFocused])
  return (
   <ScreenWrapper className="flex-1">
        <View className='px-4'>
            <View className='relative mt-5'>
                <View className='absolute top-2 left-0 '>
                    <BackButton/>
                </View> 
                <View>
                    <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
                    <Text className={`${colors.heading} text-xs  text-center`}>{country}</Text>
                </View>      
                
            </View>
            <View className='flex-row justify-center items-center rounded-xl  mb-4 '>
                <Image source={require('../assets/images/7.png')} className='w-80 h-80'></Image>
            </View>
            <View className='space-y-3'> 
                <View className="flex-row justify-between items-center">
                    <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('AddExpense',{id, place, country})} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
                        <Text className={colors.heading}>Add Expense</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 520}}>
                    <FlatList
                        data={expenses}
                        keyExtractor={item=>item.id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<EmptyList mesage={"You haven't recorded any expenses Yet !"}/>}
                        className='mt-1'
                        renderItem={({item})=>{
                            return(
                                <ExpenseCard item={item}/>
                            
                            )
                        }}
                    />
                </View>
            </View>
        </View>
        
   </ScreenWrapper>
  )
}