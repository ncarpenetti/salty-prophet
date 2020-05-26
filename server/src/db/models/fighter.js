const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

const TierEnum = {
  type: String,
  enum: ['P', 'B', 'A', 'S', 'X'],
  required: [true, 'Tier field required for Fighter schema'],
  immutable: true,
};

const MatchRef = {
  type: Schema.Types.ObjectId,
  ref: 'Match',
};

const OccurenceCount = {
  type: Int32,
  min: 0,
};

const fighterSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field required for Fighter schema'],
    immutable: true,
  },
  tier: TierEnum,
  matchHistory: [MatchRef],
  totalMatches: OccurenceCount,
  totalWins: OccurenceCount,
  championships: OccurenceCount,
  runnerUps: OccurenceCount,
  currentStreak: Int32,
  bestStreak: Int32,
});

const FighterModel = mongoose.model('Fighter', fighterSchema);

module.exports = FighterModel;