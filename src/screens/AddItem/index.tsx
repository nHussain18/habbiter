import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../../store/hooks';
import { addHabbit } from '../../store/reducers/dashboard';

type Props = {
  navigation: any
};

type FieldProps = {
  onChangeText: (a: string) => void,
  value: string,
  title: string,
};

type States = {
  name: string,
  category: { id: number, name: string }
};

const CATEGORIES = [
  {
    id: 1,
    name: 'Abes',
  },
  {
    id: 2,
    name: 'Back',
  },
  {
    id: 3,
    name: 'Biceps',
  },
  {
    id: 4,
    name: 'Chest',
  },
  {
    id: 5,
    name: 'Legs',
  },
  {
    id: 6,
    name: 'Shoulder',
  },
  {
    id: 7,
    name: 'Triceps',
  },
]

const Field = (props: FieldProps) => {
  const { onChangeText, value, title } = props

  return (
    <View style={styles.item}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={"Enter " + title}
        onChangeText={(a) => onChangeText(a)}
        placeholderTextColor={"#888"}

      />
    </View>
  );
};

const AddItem = (props: Props) => {
  const [state, setState] = useState<States>({
    name: '',
    category: { id: NaN, name: "" }

  });
  const { navigation } = props
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const setStates = (stateName: string, value: any) => {
    setState(prev => ({ ...prev, [stateName]: value }))
  }

  const onSelect = (cat: any) => {
    setStates("category", cat);
    setShow(false)
  }

  const onSubmit = () => {
    const payload = {
      categoryId: category?.id,
      name: name
    }
    dispatch(addHabbit(payload));
    navigation.goBack()
  }
  const { name, category } = state;

  return (
    <ScrollView contentContainerStyle={styles.container} >
      <Field
        value={name}
        title="Name"
        onChangeText={(text) => setStates("name", text)}
      />
      <View style={styles.item}>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity onPress={() => setShow(prev => !prev)} style={styles.category}>
          <Text style={[styles.label, category?.name ? null : { color: '#888' }]}>{category?.name || "Select Category"}</Text>
        </TouchableOpacity>
        {show ?
          <View style={styles.listContainer}>
            {CATEGORIES.map(cat => {
              return (
                <TouchableOpacity onPress={() => onSelect(cat)} style={styles.listItem} key={cat.id}>
                  <Text style={styles.itemLabel}>{cat.name}</Text>
                </TouchableOpacity>
              )
            })
            }
          </View>
          : null
        }
      </View>
      <TouchableOpacity style={styles.submit} onPress={() => onSubmit()}>
        <Text style={styles.save}>SAVE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10
  },
  item: {
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000'
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45
  },
  category: {
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    justifyContent: 'center',
  },
  listContainer: {
    borderWidth: 0.5,
    borderColor: "#555",
    borderRadius: 10,
    overflow: 'hidden'
  },
  listItem: {
    borderBottomColor: "#555",
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 10
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000'
  },
  submit: {
    bottom: 20,
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#3392d6',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  save: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff'
  },
})
export default AddItem;