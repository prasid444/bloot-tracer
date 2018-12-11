import {AsyncStorage} from 'react-native';

 export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error saving data
      console.log(error);
    }

  }

  export const deleteData=async(key)=>{
      console.log("Deleting for key: "+key)
    try{
       var some= await AsyncStorage.removeItem(key)
       return true;
    }
    catch(error){
            console.log(error);
            return false;
    }
  }
export const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log("Got value for: "+key)

        console.log(JSON.parse(value));
        return JSON.parse(value);
      }
     } catch (error) {
       // Error retrieving data
       console.log(error)
       return error;
     }
  }