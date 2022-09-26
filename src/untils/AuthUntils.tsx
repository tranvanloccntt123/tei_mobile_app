import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE = "@teiresource.token";

export const saveToken = async ( token: string ) => {
    await AsyncStorage.setItem(AUTH_STORAGE, token);
}

export const getToken = async () =>{
    try {
        const value = await AsyncStorage.getItem(AUTH_STORAGE);
        return value;
      } catch(e) {
        return null;
    }
}