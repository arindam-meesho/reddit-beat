import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

const http = axios.create({
  adapter: cache.adapter
});

export const getSubreddit = (subreddit, after)  => {
    let params = {};
    if (after) {
      params = {
        after
      };
    }
    return http.get(`https://www.reddit.com/r/${subreddit}.json`)
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

window.axiosCache = cache

export default {
  getSubList,
  getSubreddit
}