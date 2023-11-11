import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../assets/types";
import { ChipSelection, CustomSafeAreaView } from "../../components";
import { BackArrowIcon } from "../../assets";
import { TextInput } from "react-native-gesture-handler";
import { Alert, ScrollView, Text, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../../services/redux/reducers/notes";

interface IAddNoteScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'AddNoteScreen'>;
}
export const AddNoteScreen = (props: IAddNoteScreenProps) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const notes = useSelector((state: any) => state.notes.notes);

    const [note, setNote] = useState<{ title: string; description: string }>({
        title: '',
        description: '',
    });
    
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedClient, setSelectedClient] = useState<string>('');

    const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

    const categories = ['Goal Evidence', 'Support Coordination', 'Active Duty'];
    const clients = ['Client1', 'Client2', 'Client3'];

    const handleAddNote = async () => {
        // Create an object with the selected data
        const noteToSave = {
            ...note,
            category: selectedCategory,
            client: selectedClient,
        };
    
        try {
          let updatedNotes;
    
          if (!notes || notes.length === 0) {
            // If notes is undefined or empty, create the first note
            updatedNotes = [noteToSave];
          } else {
            // If notes already exists, append the new note to the list
            updatedNotes = [...notes, noteToSave];
          }
    
          // Update Redux state
          dispatch(setNotes(updatedNotes));
    
          // Save to EncryptedStorage
          await EncryptedStorage.setItem('notes', JSON.stringify(updatedNotes));

          navigation.goBack();
    
        } catch (error) {
          // send to sentry or error monitoring software.
          Alert.alert('There was an issue saving your note');
          console.log(error)
        }
    };

    useEffect(() => {
        const { title, description} = note;

        const isDataFilled = 
        title !== '' && 
        description !== '' && 
        selectedCategory !== '' && 
        selectedClient !== '';

        setIsDataChanged(!isDataFilled);

    }, [note, selectedCategory, selectedClient]);
    
    return (
        <>
            <CustomSafeAreaView
                header
                title="Create Note"
                backIcon={BackArrowIcon}
                onPressBack={() => navigation.navigate('HomeScreen')}
                rightText="Add"
                onPressRight={handleAddNote}
                onPressRightDisabled={isDataChanged}
            >
                <ScrollView 
                    contentContainerStyle={{
                        paddingBottom: 150
                    }}
                    style={{
                        marginVertical: 10
                    }}
                >
                    <View>
                        <Text>Title</Text>
                        <TextInput
                            style={{
                                fontSize: 16,
                                paddingVertical: 10
                            }}
                            placeholder="Write a note title"
                            value={note.title}
                            onChangeText={(val: string) => setNote({...note, title: val})}
                        />
                    </View>
                    <View>
                        <Text>Description</Text>
                        <TextInput
                            style={{
                                fontSize: 16,
                                paddingVertical: 10
                            }}
                            placeholder="Write something"
                            multiline
                            value={note.description}
                            onChangeText={(val: string) => setNote({...note, description: val})}
                        />
                    </View>
                    <View>
                        <ChipSelection 
                            selectionTitle="Select a client"
                            data={clients}
                            selectedItemValue={selectedClient}
                            setFunction={setSelectedClient} 
                        />
                    </View>
                    <View>
                        <ChipSelection 
                            selectionTitle="Choose a category"
                            data={categories} 
                            selectedItemValue={selectedCategory}
                            setFunction={setSelectedCategory} 
                        />
                    </View>
                </ScrollView>
            </CustomSafeAreaView>
        </>
    )
}