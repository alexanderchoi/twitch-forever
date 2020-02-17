// import {
//   clientid,
//   params,
//   extension,
//   getNewStream,
//   findUserWithExtension,
//   redirectToStream
// } from "./content.js";

const clientid = "hevwkj5uuxx9v4e5hshn3an8k0hvl5";
const params = {
  headers: {
    "client-id": clientid
  }
};

// Declare the extension(overlay) you want to search for
const extension = `Waystone Overlay`;

function getNewStream() {
  const url = "https://api.twitch.tv/helix/streams?game_id=491403";
  fetch(url, params)
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json);
      const users = json.data;
      return findUserWithExtension(users);
    })
    .catch(error => console.log(error));
}

function findUserWithExtension(users) {
  for (let i = 0; i < users.length; i++) {
    const userID = users[i].user_id;
    const url = `https://api.twitch.tv/helix/users/extensions?user_id=${userID}`;
    fetch(url, params)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        const overlays = json.data.overlay;
        for (let key in overlays) {
          if (overlays[key].name === extension) {
            return redirectToStream(userID);
          }
        }
      })
      .catch(error => console.log(error));
  }
}

function redirectToStream(userID) {
  let userUrl = `https://www.twitch.tv/`;
  let url = `https://api.twitch.tv/helix/streams/metadata?user_id=${userID}`;
  fetch(url, params)
    .then(res => {
      return res.json();
    })
    .then(json => {
      userUrl += json.data[0].user_name;
      window.location.href = userUrl;
    })
    .catch(error => console.log(error));
}

document.addEventListener("DOMContentLoaded", function() {
  getNewStream();
});
