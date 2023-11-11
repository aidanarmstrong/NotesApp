import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNoteScreen, HomeScreen, EditNoteScreen } from '../screens';
import { connect, useDispatch } from 'react-redux';
import { setNotes } from '../services/redux/reducers/notes';
import EncryptedStorage from 'react-native-encrypted-storage';

const Stack = createStackNavigator(); 

const Navigation = () => {
    const dispatch = useDispatch();

    const getNotesData = async () => {
        try {
            const notesData = await EncryptedStorage.getItem('notes');
      
            // Check if notesData is not null before attempting to parse
            if (notesData !== null) {
              dispatch(setNotes(JSON.parse(notesData))); 
            } else {
            // if no notes data
              dispatch(setNotes([]));
            }
          } catch (err) {
            // Handle errors, e.g., log or show an error message
            console.error('Error retrieving notes data:', err);
          }
    };

    useEffect(() => {
        getNotesData();
    }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="HomeScreen"
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="EditNoteScreen" component={EditNoteScreen} />
            <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
        </Stack.Navigator>
    )
}
const mapStateToProps = (state: any) => {
    return state;
}

export default connect(mapStateToProps) (Navigation);