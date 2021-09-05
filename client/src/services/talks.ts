import axios from "axios"
import { TalkCardInfo } from "../types/talk";

export const getUserLoginFromToken = async (token: string) => {
  const response = await axios.get(`http://localhost:5000/github/user-data?token=${token}`)
  return response.data.userData;
}

export const getTalks = async (token?: string) => {
  const localToken = localStorage.getItem('token');
  let user;

  if (localToken) {
    user = await getUserLoginFromToken(localToken);
  }

  const url = user ? `http://localhost:5000/talk?user=${user}` : `http://localhost:5000/talk`;
  const response = await axios.get(url)
  return response.data.talks;
}


export const createTalk = async (talk: TalkCardInfo) => {
  const localToken = localStorage.getItem('token');
  const { title, description } = talk;
  const response = await axios.post("http://localhost:5000/talk", { title, description }, {
    headers: {
      'Authorization': `${localToken}`
    }
  })
  return response.data.talks;
}

export const voteTalk = async (input: { talkId: String, operation: String }) => {
  const localToken = localStorage.getItem('token');
  const response = await axios.put("http://localhost:5000/talk/vote", input, {
    headers: {
      'Authorization': `${localToken}`
    }
  })
  return response.data;
}

