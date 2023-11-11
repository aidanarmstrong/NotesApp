import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { Swipeable } from "react-native-gesture-handler";

interface INoteProps {
  item: {
    title: string;
    description: string;
    client: string;
    category: string;
    date: string;
  };
  index: number | string;
  onDelete: () => void;
  onPress?: () => void;
}

export const Note = (props: INoteProps) => {
  const { item, index, onDelete, onPress} = props;

  const styles = StyleSheet.create({
      chip: {
          backgroundColor: '#F4F3F3',
          borderRadius: 12,
          paddingVertical: 5,
          paddingHorizontal: 10,
          marginRight: 5,
      },
      chipText: {
          fontSize: 14,
          color: '#333333',
      },
  });

  const renderRightActions = () => {
    return (
        <TouchableOpacity 
            style={{padding: 15, marginVertical: 5, justifyContent: 'center', backgroundColor: '#E96565'}}
            activeOpacity={0.6}
            onPress={() => {
                Alert.alert(
                    'Are you sure?',
                    'You want to delete this note?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                        {
                            text: 'Delete',
                            onPress: onDelete,
                            style: 'destructive', // Use 'destructive' for a red-colored button
                        },
                    ],
                );
            }}
        >
            <Text style={{color: '#fff'}}>Delete Note</Text>
        </TouchableOpacity>
    )
  };

  return (
   
    <Swipeable renderRightActions={renderRightActions} >
        <TouchableOpacity
            activeOpacity={0.6}
            style={{
                backgroundColor: '#FFFAFA',
                marginVertical: 5,
                padding: 5,
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.1)', // Adjust the color as needed
            }}
            key={index}
            onPress={onPress}
        >
            <View style={{ marginVertical: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title.trim()}</Text>
            </View>
            <View style={{ marginVertical: 4, marginTop: 10 }}>
                <Text numberOfLines={3} ellipsizeMode="tail">{item.description.trim()}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 4, marginTop: 10 }}>
                <View style={styles.chip}>
                    <Text style={styles.chipText}>{item.client}</Text>
                </View>
                <View style={styles.chip}>
                    <Text style={styles.chipText}>{item.category}</Text>
                </View>
            </View>
            <View />
        </TouchableOpacity>
    </Swipeable>
  );
};
