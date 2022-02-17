export interface LoginRequest {
  loginID: string;
  password: string;
}

export interface AddLightingTalkRequest {
  topic: string;
  content: string;
}

export interface VoteLightingTalkRequest {
  id: number;
}
