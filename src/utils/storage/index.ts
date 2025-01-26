import { MMKV } from 'react-native-mmkv';
const storage = new MMKV();

export const setItem = (keyName: string, data: any) => {
    const json = JSON.stringify(data)
    storage.set(keyName, json)
};

export const getItem = (keyName: string) => {
    const data = storage.getString(keyName);
    let json = data ? JSON.parse(data) : null;
    return json;
}
