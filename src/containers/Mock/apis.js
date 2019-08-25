import axios from 'axios';
import { getSubList } from "../HomePage/apis";

export const getMockSubreddit = ()  => {
  return axios.get(`/mock/xkcd.json`)
};

export default {
  getSubList,
  getMockSubreddit
}