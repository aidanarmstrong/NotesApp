import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the param list for the stack navigator
export type RootStackParamList = {
  HomeScreen: undefined,
  EditNoteScreen: {
    item: {
      title: string;
      description: string;
      category: string;
      client: string;
    },
    index: number;
  },
  AddNoteScreen: undefined
};

// Define the type for the navigation prop in components
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
export type EditNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditNoteScreen'>;
export type AddNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddNoteScreen'>;

// Define the type for route prop in components
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;
export type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNoteScreen'>;
export type AddNoteScreenRouteProp = RouteProp<RootStackParamList, 'AddNoteScreen'>;
