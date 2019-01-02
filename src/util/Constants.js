export const BGroup={
    ALL:"ALL",
    A_POSITIVE:"A+",
    A_NEGATIVE:"A-",
    B_POSITIVE:"B+",
    B_NEGATIVE:"B-",
    O_POSITIVE:"O+",
    O_NEGATIVE:"O-",
    AB_POSITIVE:"AB+",
    AB_NEGATIVE:"AB-",
    
}
export const BGroupData=[
    {
        value:'A+',
        key:"a_positive"
    },
    {
        value:'A-',
        key:"a_negative"

    },
    {
        value:'B+',
        key:"b_positive"

    },
    {
        value:'B-',
        key:"b_negative"

    },
    {
        value:'AB+',
        key:"ab_positive"

    },
    {
        value:'AB-',
        key:"ab_negative"

    },
    {
        value:'O+',
        key:"o_positive"

    },
    {
        value:'O-',
        key:"o_negative"

    },
];
export const GenderData=[
    {
        value:'Male',
    },
    {
        value:'Female',
    },
    {
        value:'Other'
    }

];
export const colors={
    HOME:"#e91e63",
    // SEARCH:"#8bc34a",
    POSTS:"#9c27b0",
    PROFILE:"#00bcd4",
    SEARCH:"#e91e63",
  }
  
export const nullUser="iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAa0lEQVR42u3PMREAAAgEIL9/WwtoBHcP" +
"GpCeeiEiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi" +
"IiIiIiIiIiIiIiIiIiIiIiIiIiIiIpcFKjbCiZfrjTwAAAAASUVORK5CYII=";

export const postItemHeight=184;

export const postData=[
    {
        name:"Prasidha Kakri",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"1 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:true
    },
    {
        name:"Prasidha Kakri2",
        distance:"1 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"1 pint",
        comment:"Some comment here",
        number:"9870171729",
    },
    {
        name:"Prasidha Kakri3",
        distance:"2 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"4 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:false
    },
    {
        name:"Prasidha Kakri3",
        distance:"2 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"4 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:false
    },
    {
        name:"Prasidha Kakri3",
        distance:"2 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"4 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:false
    },
    {
        name:"Prasidha Kakri3",
        distance:"2 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"4 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:false
    },
    {
        name:"Prasidha Kakri3",
        distance:"2 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"4 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:false
    },
    {
        name:"Prasidha Kakri3",
        distance:"2 km",
        address:"Some Address",
        date:"12-1-2018",
        bgroup:"B+",
        bamount:"4 pint",
        comment:"Some comment here",
        number:"9870171729",
        emergency:false
    }
]

export const postFormData={
    name:{
        displayName:"Patient Name",
        type:"InputText",
        validations:{
            required:true,
            type:"String",
            max_length:30
        },
        errorMessages:{
            required:"Patient name is required",
            type:"Name must be string",
            max_length:"Name must not be more than 30 characters"
        }

    }, 
    address:{
        displayName:"Address",
        type:"InputLocation",
        validations:{
            required:true,
        },
        errorMessages:{
            required:"Address is required",
        }

    },
    date:{
        displayName:"Required before(YYYY-MM-DD)",
        type:"InputDate",
        validations:{
            required:true,
            type:"date"
        },
        errorMessages:{
            required:"Date is required",
            type:"Error date format"
        }

    },
    b_group:{
        displayName:"Blood Group",
        type:"Options",
        validations:{
            required:true
        },
        errorMessages:{
            required:"Must select one blood group"
        },
        options:BGroupData,
        optionText:"Select Blood Group"
    },
    b_amount:{
        displayName:"Blood Amount",
        type:"Options",
        validations:{
            required:true
        },
        errorMessages:{
            required:"Amount must be required"
        },
        options:[
            {
                value:"1 Pint",
                key:1
            },
            {
                value:"2 Pint",
                key:2
            },
            {
                value:"3 Pint",
                key:3
            },
            {
                value:"4 Pint",
                key:4
            }
        ],
        optionText:"Select Blood Amount"

    },
    // user_name:{
    //     displayName:"User Nassme",
    //     isSecure:false,
    //     type:"InputText",
    //     validations:{
    //         required:true,
    //         type:"String",
    //         min_length:5
    //     },
    //     errorMessages:{
    //         required:"Data cannot be empty",
    //         type:"Input value must be string",
    //         min_length:"Name must be greater than 5 characters"
    //     },
      
    // },
    // remember:{
    //     displayName:"Checkbox",
    //     checkLabel:"Agree to terms and conditions",
    //     type:"CheckBox",
    //     validations:{
    //         defaultValue:true
    //     },
    //     errorMessages:{
    //         defaultValue:"You must agree to terms"
    //     },
      
    // },
    // password:{
    //     displayName:"Password",
    //     isSecure:true,
    //     type:"InputText",
    //     validations:{
    //         required:true,
    //         type:"String",
    //         min_length:8
    //     },
    //     errorMessages:{
    //         required:"Requuired field",
    //         type:"Input value must be string",
    //         min_length:"Password must be greater than 5 characters"
    //     },
     
    // },
    gender:{
        displayName:"Gender",
        type:"Options",
        validations:{
            required:true
        },
        errorMessages:{
            required:"Must select one gender"
        },
        options:[
            {
                value:"Male",
                key:"male"
            },
            {
                value:"Female",
                key:"female"
            },
            {
                value:"Other",
                key:"other"
            }
        ],
        optionText:"Select Gender"

    },
    comment:{
        displayName:"Comment",
        type:"InputText",
        validations:{
            max_length:100,
            type:"String"
        },
        errorMessages:{
            max_length:"Comment must be less than 100 characters",
            type:"Type must be string"
        },
        multiline:3
    },
      emergency:{
        displayName:"Emergency",
        checkLabel:"Emergency Case",
        type:"CheckBox",
        validations:{
        },
        errorMessages:{
        },
      
    },
    user_image:{
        displayName:"User Image",
        type:"Image",
        validations:{
            required:true
        },
        errorMessages:{
            required:"Must contain Image"
        }
    }

};
