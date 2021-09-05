import axios from "axios";
import { TalkCardInfo } from "../types/talk";
import Swal from 'sweetalert';
import { REACT_APP_API_URL } from "../../env";

const notify = (message: string, isSuccess: boolean) => Swal({
  text: message,
  icon: isSuccess ? "success" : "error",
  closeOnClickOutside: true,
  timer: 800,
});

export const getUserLoginFromToken = async (token: string) => {
  const response = await axios.get(`${REACT_APP_API_URL}/github/user-data?token=${token}`);
  return response.data.userData;
};

export const getTalks = async (token?: string) => {
  try {
    const localToken = localStorage.getItem('token');
    let user;

    if (localToken) {
      user = await getUserLoginFromToken(localToken);
    }

    const url = user ? `${REACT_APP_API_URL}/talk?user=${user}` : `${REACT_APP_API_URL}/talk`;
    const response = await axios.get(url);
    return response.data.talks;
  } catch (error) {
    notify("Couldn't load talks", false);
    return [];
  }
};


export const createTalk = async (talk: TalkCardInfo) => {
  try {
    const localToken = localStorage.getItem('token');
    const { title, description } = talk;
    const response = await axios.post(`${REACT_APP_API_URL}}/talk`, { title, description }, {
      headers: {
        'Authorization': `${localToken}`
      }
    });

    notify("Talk Created", true);
    return response.data.talks;
  } catch (error) {
    notify("Try again later :(", false);
  }
};

export const voteTalk = async (input: { talkId: String, operation: String }) => {
  try {
    const localToken = localStorage.getItem('token');
    const response = await axios.put("http://localhost:5000/talk/vote", input, {
      headers: {
        'Authorization': `${localToken}`
      }
    });

    notify("Voted!", true);
    return response.data;
  } catch (error) {
    notify("Try again later :(", false);
  }
};

