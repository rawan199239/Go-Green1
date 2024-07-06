const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

//create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  months: {
    january: {
      type: Number,
    },
    february: {
      type: Number,
    },
    march: {
      type: Number,
    },
    april: {
      type: Number,
    },
    may: {
      type: Number,
    },
    june: {
      type: Number,
    },
    july: {
      type: Number,
    },
    august: {
      type: Number,
    },
    september: {
      type: Number,
    },
    october: {
      type: Number,
    },
    november: {
      type: Number,
    },
    december: {
      type: Number,
    }
  },
  consumption: {
    hourlyConsumption: [
      {
        hour: { type: String, required: true },
        consumption: { type: Number, required: true },
      },
    ],
    dailyConsumption: [
      {
        day: { type: String, required: true },
        consumption: { type: Number, required: true },
      },
    ],
    weeklyConsumption: [
      {
        week: { type: String, required: true },
        consumption: { type: Number, required: true },
      },
    ],
    monthlyConsumption: [
      {
        month: { type: String, required: true },
        consumption: { type: Number, required: true },
      },
    ],
    yearlyConsumption: [
      {
        year: { type: Number, required: true },
        consumption: { type: Number, required: true },
      },
    ],
  },  battery_percentage: {
    type: Number,
    default: null
  },
  predicted_consumptions: [
    {
      datetime: { type: Date, required: true },
      predicted_consumption: { type: Number, required: true },
    }
  ],
  kind: {
    type: Number,
  },
  packages: {
    prediction: { type: Number, default: 0 } // Define packages as an object with a single field
  }});
userSchema.methods.genAuthToken=function(){
  const token = jwt.sign({usrid:this._id},config.get("jwtsec"));
    return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;

/*
weather: {  type: [{
    Consumption: { type: Number } // New object for Weather entity
  }],}
,

apiConsumption: {
    day: [
      {
        hour: {
          type: String,
        },
        consumption: {
          type: Number,
        }
      }
    ],
    week: [
      {
        day: {
          type: String,
        },
        consumption: {
          type: Number,
        }
      }
    ],
    month: [
      {
        month: {
          type: String,
        },
        consumption: {
          type: Number,
        }
      }
    ],
    year: [
      {
        year: {
          type: Number,
        },
        consumption: {
          type: Number,
        }
      }
    ]
  },
  
  
  const Ajv=require("ajv").default;
const ajv=new Ajv();

const schema={
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$"
        },
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "password":{
            "type":"string",
            "minLength":5
        },
        "phoneNumber": {
            "type": "string",
            "pattern": "^[0-9]{11}$"
          },
    "address": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9\\s,#-]*$"
    },
    },
    "required":["name","password","email","phoneNumber","address"]
}



module.exports=ajv.compile(schema)
  
  
  */