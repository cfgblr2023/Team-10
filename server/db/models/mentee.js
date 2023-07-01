const { DataTypes } = require('sequelize');
const {sequelize} = require("."); // your sequelize instance
const bcrypt = require('bcrypt');
const moduleSchema = new mongoose.Schema({
  moduleNumber: {
    type: Number,
    required: false
  },
  sessionNumber: {
    type: Number,
    required: false
  },
  sessionCompleted: {
    type: Boolean,
    required: false
  }
});
const Mentee = sequelize.define('mentees', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 255], // added maximum length limit
    },
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  ageCategory: {
    type: String,
    enum: ['18-25', '26-35', '36-45', '46+'],
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  languagesSpoken: {
    type: [String],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  educationStatus: {
    type: String,
    required: true
  },
  educationProgram: {
    type: String,
    required: true
  },
  plansAfter5Years: {
    type: String,
    required: true
  },
  availableDays: {
    type: [String],
    required: true
  },
  availableTimingSlots: {
    type: [String],
    required: true
  },
  otherComments: {
    type: String
  },
  mentorAssigned: {
    type: Boolean,
    default: false
  },
  module: {
    type: [moduleSchema]
  }
}, {
  hooks: {
    // Before hook before creating new mentees
    beforeCreate: async (mentees) => {
      const salt = await bcrypt.genSalt();
      mentees.password = await bcrypt.hash(mentees.password, salt);
    },
  },
});

Mentee.login = async function(username, email, password) {
  const mentees = await Mentee.findOne({ where: { username } });
  if (mentees) {
    const auth = await bcrypt.compare(password, mentees.password);
    if (auth) {
      return mentees;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect Details');
};

// After hook after creating new mentees
Mentee.afterCreate((mentees) => {
  console.log('The new mentees created is:', mentees.toJSON());
});

module.exports = Mentee;