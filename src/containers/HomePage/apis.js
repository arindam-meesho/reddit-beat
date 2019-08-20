// import axios from 'axios';
import { setup } from 'axios-cache-adapter'
import localforage from 'localforage'

// Create `localforage` instance
const forageStore = localforage.createInstance({
  // List of drivers used
  driver: [
    // localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
  ],
  // Prefix all storage keys to prevent conflicts
  name: 'reddit-cache:/'
})

  // Create `axios` instance with pre-configured `axios-cache-adapter` using a `localforage` store
const http = setup({
  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000,
    store: forageStore // Pass `localforage` store to `axios-cache-adapter`
  }
})

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


export default {
  getSubList,
  getSubreddit
}