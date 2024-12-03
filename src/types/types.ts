export interface UserDetails {
  User: any;
  UserName: string;
  // Add other user details properties as needed
}

export interface Challenge {
  depositAmount: number;
  depositToken: string;
  startTime: Date;
  lastCheckIn: Date;
  streakDays: number;
  rewardPoints: number;
  active: string;
  maxHabitDays: number;
  category: string;
}
export interface Player {
  UserName: string;
}

export interface Performance {
  ChallengeCreatorImage: string;
  ChallengeCreatorUsername: string;
  ChallengeDescription: string;
  ChallengeMedia: string | null;
  ChallengeName: string;
  ChallengeWinner: any[]; // Define a proper type if you know the structure
  EndDate: string;
  GameName: string;
  GameType: string;
  ParticipationType: string;
  Player: Player[]; // Assuming Player has a known structure
  PlayersJoined: number;
  StakedWager: number;
  StartDate: string;
  State: string;
  Target: number;
  TotalWagerStaked: number;
  Value: number;
}
