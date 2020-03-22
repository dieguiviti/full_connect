const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

// Create Model
const WOD_SCHEMA = new SCHEMA({
  user: {
    type: SCHEMA.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  warmUp: {
    time: {
      type: Number
    },
    description: {
      type: String
    }
  },
  tabata: [
    {
      movements: {
        type: String,
        required: true
      }
    }
  ],
  emom: [
    {
      minutes: {
        type: Number,
        required: true
      },
      movements: [
        {
          movement: {
            type: String,
            required: true
          },
          reps: {
            type: Number
          }
        }
      ]
    }
  ],
  forTime: [
    {
      timeCap: {
        minutes: {
          type: Number,
          required: true
        }
      },
      movements: [
        {
          movement: {
            type: String,
            required: true
          },
          reps: {
            type: Number
          }
        }
      ],
      rounds: {
        type: Number
      },
      result: {
        finished: {
          type: Boolean,
          default: false
        },
        reps: {
          type: Number
        },
        time: {
          type: Number
        }
      }
    }
  ],
  amrap: [
    {
      time: {
        type: Number
      },
      movements: [
        {
          movement: {
            type: String,
            required: true
          },
          reps: {
            type: Number
          }
        }
      ],
      result: {
        rounds: {
          type: Number
        },
        reps: {
          quantity: {
            type: Number
          },
          movement: {
            type: String,
            required: true
          },
          reps: {
            type: Number
          }
        }
      }
    }
  ],
  coolDown: {
    time: {
      type: Number
    },
    description: {
      type: String
    }
  },
  likes: [
    {
      user: {
        type: SCHEMA.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String
      }
    }
  ],
  comments: [
    {
      user: {
        type: SCHEMA.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now()
      },
      likes: [
        {
          user: {
            type: SCHEMA.Types.ObjectId,
            ref: 'user'
          }
        }
      ]
    }
  ]
});

// Create Wod model
const WOD_MODEL = MONGOOSE.model('wod', WOD_SCHEMA);

// Export Model
module.exports = WOD_MODEL;
