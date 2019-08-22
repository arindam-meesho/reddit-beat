import axios from 'axios'
import settle from 'axios/lib/core/settle'

const { CacheStorage, caches } = window;

export default function cacheAdapter(config) {
  // At this point:
  //  - config has been merged with defaults
  //  - request transformers have already run
  //  - request interceptors have already run
  
  // Make the request using config provided
  // Upon response settle the Promise

  return new Promise(function(resolve, reject) {
  
    // var response = {
    //   data: responseData,
    //   status: request.status,
    //   statusText: request.statusText,
    //   headers: responseHeaders,
    //   config: config,
    //   request: request
    // };

    settle(resolve, reject, config.request);

    // From here:
    //  - response transformers will run
    //  - response interceptors will run
  });
}