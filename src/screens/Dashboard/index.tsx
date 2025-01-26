import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDataFromLocal, changeStatus } from '../../store/reducers/dashboard';
import dayjs from 'dayjs';

type Props = {
  navigation: any
};

const Dashboard = (props: Props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const todayList = useAppSelector(state => state.dashboard.todayList)
  const [filterData, setFilterData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getDataFromLocal({ date: dayjs().format("YYYY-MM-DD") }))
  }, [])

  const onPressDone = (item: any) => {
    dispatch(changeStatus(item))
    let t: any = [...filterData];
    let index = t.findIndex((i: any) => i.id === item?.id)
    t[index] = { ...item, done: !item?.done }
    setFilterData(t);
  }

  const filter = (text: string) => {
    setSearch(text);
    const filteredData = todayList?.filter((item: any) => {
      let lowerName = item?.name?.toLowerCase();
      let textLower = text.toLowerCase();
      return lowerName?.includes(textLower);
    })
    setFilterData(filteredData)
  }

  return (
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <TextInput
          style={styles.searchBox}
          value={search}
          placeholder='Search'
          placeholderTextColor={'#666'}
          onChangeText={(txt) => filter(txt)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate('AddItem')
          }
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={search ? filterData : todayList}
        renderItem={({ item, index }: any) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.title}>{item?.id + 1}. {item?.name}</Text>
              <TouchableOpacity
                style={[styles.done, { backgroundColor: item?.done ? '#00ff00' : '#0000' }]}
                onPress={() => onPressDone(item)}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item: any) => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'flex-end',
  },
  searchBox: {
    flex: 1,
    padding: 0,
    borderWidth: 1,
    paddingHorizontal: 15,
    fontSize: 14,
    color:'#000',
    borderColor: '#333',
    borderRadius: 25,
  },
  addButton: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    backgroundColor: '#00f'
  },
  plus: {
    fontSize: 28,
    lineHeight: 31,
    fontWeight: '600',
    color: '#FFF'
  },
  itemContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#233445',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#000'
  },
  done: {
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10

  },
  doneText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000'
  },
})
export default Dashboard;
