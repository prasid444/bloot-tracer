export function FormValidator (validators,data){
    // console.log("validator called");
    // console.log(validators);
    // console.log("DATA",data);
    console.log("NOT DATA",!data)
    if(!(validators['required']===true) && (!data))
        {
            return [];
        }
        
    var error=[];
 
    console.log("here",data.uri==undefined,"length")
    for(let validator in validators){
        switch(validator){
            case 'required':
            if((validators[validator]===true)&&(data.length===0 || data.uri==undefined))
            error=[...error,validator];
            break;
            case 'type':        
                switch(validators[validator]){
                    
                    case 'integer':
                        if(!parseInt(data) && parseInt(data)!=0){
                            error=[...error,validator];
                        }
                    break;

                    case 'float':
                    case 'decmial':
                        if(!parseFloat(data) && parseFloat(data)!=0){
                            error=[...error,validator];
                        }
                    break;

                    case 'email':
                    var emailRE=/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    
                    if(!emailRE.exec(data)){
                        error=[...error,validator];
                    }
                    
                    break;
                    case 'date':
                    //Format YYYY-MM-DD
                    var dateRE=/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
                    if(!dateRE.exec(data)){
                        error=[...error,validator];
                    }

                    break;

                    case 'jsondata':
                    try{JSON.parse(data);
                    }
                    catch(e){
                        error=[...error,validator];
                    }
                    break;
                    default:
                    break;
                }
            break;
            case 'defaultValue':
            console.log("Checking for default");
                if(data!==validators[validator]){
                    error=[...error,validator]

                }
            break;
            case 'min_length':
                if(Array.from(data).length<=parseInt(validators[validator])){
                    error=[...error,validator];
                }
            break;

            case 'max_length':
            if(Array.from(data).length>=parseInt(validators[validator])){
                error=[...error,validator];
            }
            break;

            case 'length':
            console.log("array length : "+Array.from(data).length)
            console.log("normal length : "+data.length);
                if(!(((Array.from(data).length>=parseInt(validators[validator].min) || (!validators[validator].max)) && 
                ((!validators[validator].max) || (Array.from(data).length<=parseInt(validators[validator].max)))))){
                    
                    error=[...error,validator];
                }
            break;
            
            case 'range':
                if(!((parseFloat(data)>=parseInt(validators[validator].min) && (parseFloat(data)<=parseInt(validators[validator].max))))){
                    
                    error=[...error,validator];
                }
            break;
            
            default:
            break;
        }
    }
    console.log(error);
    return error;

}
