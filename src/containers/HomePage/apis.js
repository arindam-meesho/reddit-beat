import axios from 'axios';

export const getSubreddit = (subreddit, after)  => {
    let params = {};
    if (after) {
      params = {
        after
      };
    }
    return axios.get(`https://www.reddit.com/r/${subreddit}.json`, { params })
};



export const getSubList = ()  => {
    const payload = [
      "alternativeart",
      "pics",
      "gifs",
      "adviceanimals",
      "cats",
      "images",
      "photoshopbattles",
      "all",
      "aww"
    ];
    return payload
};
  
export default {
  getSubList,
  getSubreddit
}