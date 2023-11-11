import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const categories = ['Goal Evidence', 'Support Coordination', 'Active Duty'];

interface IChipSelctionProps {
  data: string[];
  selectionTitle: string;
  selectedItemValue: string;
  setFunction: any;
}
export const ChipSelection = (props: IChipSelctionProps) => {
  const { data, selectionTitle, selectedItemValue, setFunction} = props;

  const [selectedItem, setSelectedItem] = useState<string>(selectedItemValue || '');

  const handleCategorySelect = (item: string) => {
    setFunction(item);
    setSelectedItem(item);
  };

  return (
    <View>
      <Text style={{ marginTop: 10 }}>{selectionTitle}</Text>
      
      <View style={styles.categoryContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategorySelect(item)}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                selectedItem === item ? '#00D000' : '#F4F3F3',
              },
            ]}
          >
            <Text
              style={{
                color: selectedItem === item ? '#FFFFFF' : '#333333',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionChip: {
    backgroundColor: '#FFFAFA',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  categoryChip: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
});
