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
const Mentor = sequelize.define('mentors', {
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
  qualification: {
    type: String,
    required: true
  },
  
  languagesSpoken: {
    type: [String],
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
  menteeAssigned: {
    type: Boolean,
    default: false
  },
  module: {
    type: [moduleSchema]
  }
}, {
  hooks: {
    // Before hook before creating new mentors
    beforeCreate: async (mentors) => {
      const salt = await bcrypt.genSalt();
      mentors.password = await bcrypt.hash(mentors.password, salt);
    },
  },
});

Mentor.login = async function(username, email, password) {
  const mentors = await Mentor.findOne({ where: { username } });
  if (mentors) {
    const auth = await bcrypt.compare(password, mentors.password);
    if (auth) {
      return mentors;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Incorrect Details');
};

// After hook after creating new mentors
Mentor.afterCreate((mentors) => {
  console.log('The new mentors created is:', mentors.toJSON());
});

module.exports = Mentor;