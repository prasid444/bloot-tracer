import Firebase from "./firebase";


export const writeNewFirebaseData=(key,data)=>{
    console.log(data)
    Firebase.database().ref(key).push({
        ...data
    }).then(()=>{
        console.log("Data saved")
    }).catch((e)=>{
        console.log(e)
    })
}

export const readFirebaseData=async(key)=>{
    console.log("Getting for "+key);
    return new Promise(function(resolve,reject){
        Firebase.database().ref(key).once('value')
        .then((snapshot)=>{
            const key=snapshot.key;
            const val=snapshot.val();
            // console.log("Fetched data")
            //console.log(val);
            return resolve(val);
        })
        .catch((e)=>{
            // console.log(e);
            return reject(e);
        })
    })
    
}


// database.ref('users').push({
//     name: 'Nikola Tesla',
//     job: {
//         title: 'Inventor'
//     }
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//     console.log('Failed.', e);
// });
// }