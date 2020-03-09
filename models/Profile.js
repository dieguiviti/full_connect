const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

// Create Profile Schema
const PROFILE_SCHEMA = new SCHEMA({
  user: {
    type: MONGOOSE.Schema.Types.ObjectID,
    ref: 'user'
  },
  bio: {
    type: String
  },
  box: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  division: {
    type: String,
    required: true
  },
  favoriteMoves: {
    type: [String],
    required: true
  },
  strength: {
    type: String,
    required: true
  },
  weakness: {
    type: String,
    required: true
  },
  competitions: [
    {
      competitionName: {
        type: String,
        required: true
      },
      division: {
        type: String
      },
      standing: {
        type: Number
      },
      location: {
        type: String,
        required: true
      },
      finishDate: {
        type: Date,
        required: true
      }
    }
  ],
  trainerCredentials: [
    {
      credential: {
        type: String,
        required: true
      },
      issuer: {
        type: String,
        required: true
      },
      issueDate: {
        type: Date,
        required: true
      },
      credentialLink: {
        type: String
      }
    }
  ],
  personalRecords: [
    {
      movement: {
        type: String,
        required: true
      },
      weight: {
        type: Number,
        required: true
      },
      date: {
        type: Date
      }
    }
  ],
  maxRepetitions: [
    {
      movement: {
        type: String,
        required: true
      },
      reps: {
        type: Number,
        required: true
      },
      date: {
        type: Date
      }
    }
  ],
  socialMedia: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    }
  }
});

// Create Profile model
const PROFILE_MODEL = MONGOOSE.model('profile', PROFILE_SCHEMA);

// Export model
module.exports = PROFILE_MODEL;
