import React, { useEffect, useState } from "react";
import { EditNoteScreenNavigationProp, EditNoteScreenRouteProp} from "../../assets/types";
import { ScrollView, View, Text, TextInput, Alert } from "react-native";
import { BackArrowIcon } from "../../assets";
import { CustomSafeAreaView, ChipSelection } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import EncryptedStorage from "react-native-encrypted-storage";
import { setNotes } from "../../services/redux/reducers/notes";

interface IEditNoteScreenProps {
    navigation: EditNoteScreenNavigationProp;
    route: EditNoteScreenRouteProp | any; // Todo: Causing type error on navigation screen need to check why
}
type routeParamTypes = {
    item: {
        title: string;
        description: string;
        category: string;
        client: string;
    },
    index: number;
};

export const EditNoteScreen = ({
    navigation,
    route,
}:IEditNoteScreenProps) => {
    const { item, index }: routeParamTypes = route.params;
    
    const dispatch = useDispatch();
    const notes = useSelector((state: any) => state.notes.notes);

    const [note, setNote] = useState<{ title: string; description: string }>({
        title: item.title,
        description: item.description,
    });
    
    const [selectedCategory, setSelectedCategory] = useState<string>(item.category);
    const [selectedClient, setSelectedClient] = useState<string>(item.client);

    const [isDataChanged, setIsDataChanged] = useState<boolean>(true);

    const categories = ['Goal Evidence', 'Support Coordination', 'Active Duty'];
    const clients = ['Client1', 'Client2', 'Client3'];

    const handleSaveNote = async () => {
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
            // If notes already exists, find the index using the original note (item)
            const noteIndex = notes.findIndex((n: any) => n.title === item.title);
      
            if (noteIndex !== -1) {
              // If the note exists, update it at the found index
              updatedNotes = [...notes];
              updatedNotes[noteIndex] = noteToSave;
            } else {
              // If the note doesn't exist, append the new note to the list
              updatedNotes = [...notes, noteToSave];
            }
          }
      
          // Update Redux state
          dispatch(setNotes(updatedNotes));
      
          // Save to EncryptedStorage
          await EncryptedStorage.setItem('notes', JSON.stringify(updatedNotes));
      
          navigation.goBack();
        } catch (error) {
          // send to sentry or error monitoring software.
          Alert.alert('There was an issue saving your note');
          console.log(error);
        }
    };

    useEffect(() => {
        const { title, description } = note;
      
        const isDataFilled =
          title !== '' &&
          description !== '' &&
          selectedCategory !== '' &&
          selectedClient !== '';
      
        const isDataChanged =
          title !== item.title ||
          description !== item.description ||
          selectedCategory !== item.category ||
          selectedClient !== item.client;
      
        setIsDataChanged(!isDataFilled || isDataChanged);
      
    }, [note, item, selectedCategory, selectedClient]);
      
    return (
        <>
            <CustomSafeAreaView
                header
                title="Edit Note"
                backIcon={BackArrowIcon}
                onPressBack={() => navigation.navigate('HomeScreen')}
                rightText="Save"
                onPressRight={handleSaveNote}
                onPressRightDisabled={!isDataChanged}
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