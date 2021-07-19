const fetch = require("cross-fetch");

const API_BASE_URL = 
process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const headers = { "Content-Type": "application/json" };

async function fetchJson(url, options, onCancel) {
    try {
        const response = await fetch(url,options);
        if (response.status === 204) {
            return null;
        }
        const payload = await response.json();

        if (payload.error) {
            return Promise.reject({ message: payload.error });
        }
        return payload.data;
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error.stack);
            throw error;
          }
          return Promise.resolve(onCancel);
        }
}

/**
 * Lists the current leaders on the leaderboard
 * @returns {Promise<[table]>}
 *  a promise that resolves to the array of scores and names.
 */
export async function listUsers(signal) {
    const url = `${API_BASE_URL}/users`;
    const options = {
      method: "GET",
      headers,
    //   body: JSON.stringify(),
      signal,
    };
    return await fetchJson(url, options);
  }

  export async function postUser(user, signal) {
    const url = `${API_BASE_URL}/users`;
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({data: user}),
      signal,
    };
    return await fetchJson(url, options, user);
  }
