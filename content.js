console.log("content.js executed");
const clientid = "hevwkj5uuxx9v4e5hshn3an8k0hvl5";
const params = {
  headers: {
    "client-id": clientid
  }
};

// Declare the extension(overlay) you want to search for
const extension = `Waystone Overlay`;

// Check if stream is offline or isn't using extension => get new stream
setInterval(function() {
  console.log("set interval executed every 5s");
}, 5000);

// set timer for 15 minutes
// check if stream is offline
//   if offline, get new stream

// check if waystone is enabled on stream
//   if waystone is disabled, get new stream

function getNewStream() {
  const url = "https://api.twitch.tv/helix/streams?game_id=491403";
  fetch(url, params)
    .then(res => {
      return res.json();
    })
    .then(json => {
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

export {
  clientid,
  params,
  extension,
  getNewStream,
  findUserWithExtension,
  redirectToStream
};
