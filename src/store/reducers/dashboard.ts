import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem } from '../../utils'
import _ from 'lodash';

const initialState = {
    loading: false,
    habbits: [],
    todayList: []

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getDataFromLocal: (state, action) => {
            let todayList: any = getItem("todayList") || [];
            const habbits: any = getItem("habbits") || [];
            const today: any = getItem("today");
            const date = action?.payload?.date
            if (today === null) {
                setItem('today', date);
            } else if (date !== today) {
                let extraData = todayList?.filter((i: any) => !i.done);
                let uniqData = _.uniqBy(todayList, 'name')
                todayList = [...uniqData, ...extraData];
                todayList = todayList.map((i: any, index: number) => ({ ...i, id: index, done: false }))
                setItem('todayList', todayList)
                setItem('today', date);
            }
            state.habbits = habbits || []
            state.todayList = todayList || []
        },
        addHabbit: (state, action) => {
            let h: any = state.habbits;
            h.push(action.payload);
            state.habbits = h;
            let t: any = state.todayList;
            t.push({ ...action.payload, id: t.length, done: false });
            state.todayList = t;
            setItem('todayList', t)
            setItem('habbits', h)
        },
        changeStatus: (state, action) => {
            let t: any = state.todayList;
            const item = action?.payload
            console.log("AAAA", item);
            let index = t.findIndex((i: any) => i.id === item?.id)
            t[index].done = !item?.done;
            state.todayList = t;
            setItem('todayList', t)
        },
    },
})
export const { getDataFromLocal, addHabbit, changeStatus } = authSlice.actions
export default authSlice.reducer
