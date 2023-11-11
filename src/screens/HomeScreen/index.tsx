import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { RootStackParamList } from "../../assets/types";
import { CustomSafeAreaView } from "../../components";
import { LogoIcon, PlusIcon } from "../../assets";
import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Note } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../../services/redux/reducers/notes";
import EncryptedStorage from "react-native-encrypted-storage";

interface IHomeScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>;
}

export const HomeScreen = (props: IHomeScreenProps) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const notes = useSelector((state: any) => state.notes.notes);

    console.log(notes)

    const DeleteNote = async (index: any) => {
        // Perform the delete action here
        try {
            const updatedNotes = [...notes]; // Create a copy of the notes array
            updatedNotes.splice(index, 1); // Remove the item at the specified index

            // Update the state or Redux store with the new notes data
            dispatch(setNotes(updatedNotes));
            await EncryptedStorage.setItem('notes', JSON.stringify(updatedNotes));
            
        } catch (error) {
            // send to sentry or error monitoring software.
            console.log(error)
        }
    }

    return (
        <>
            <CustomSafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={LogoIcon} style={{ width: 36, height: 40, marginHorizontal: 5 }} />
                            <Text style={{ fontSize: 16, fontWeight: '300', fontStyle: 'italic', color: '#00D000' }}>Notes</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => navigation.navigate('AddNoteScreen')}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                height: 50,
                                width: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50
                            }}
                        >
                        <Image source={PlusIcon} style={{ width: 25, height: 25, tintColor: '#000' }} />
                    </TouchableOpacity>
                </View>
                <View>
                    {notes && notes.length > 0 ? (
                        <FlatList
                            style={{ marginTop: 10, paddingHorizontal: 1, marginHorizontal: 15}}
                            data={notes.slice().reverse()}
                            renderItem={({ item, index }: { item: any; index: number }) => (
                                <Note 
                                    item={item} 
                                    index={index}
                                    onPress={() => navigation.navigate('EditNoteScreen', {item, index})} 
                                    onDelete={() => DeleteNote(index)}
                                />
                            )}
                        />
                    ) : (
                        <View style={{justifyContent: 'center', alignItems: 'center', top: 300}}>
                            <Text>No current notes</Text>
                        </View>
                    )}
                </View>
            </CustomSafeAreaView>
        </>
    )
}