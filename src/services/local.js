import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('user', value)
    } catch (e) {
        // saving error
    }
}
export const storeDataObject = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
        // saving error
    }
}


export const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('storage_Key')
        console.log(value);
        if (value !== null) {
            return value
        }
    } catch (e) {
        // error reading value
    }
}


export const getDataObject = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}