// console.log("content.js executed");
const clientid = "hevwkj5uuxx9v4e5hshn3an8k0hvl5";
const params = {
  headers: {
    "client-id": clientid
  }
};

// Declare the extension(overlay) you want to search for
const extension = `Waystone Overlay`;

// Check if stream is offline => get new stream
setInterval(async function() {
  console.log("*** set interval function - 5 seconds ***");
  const url = window.location.href;
  const currentStreamerID = url.slice(url.indexOf(".tv") + 4);
  const isOffline = await checkIfOffline(currentStreamerID);
  if (isOffline) getNewStream();
}, 5000);

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

async function checkIfOffline(userID) {
  // userID = "fakeUserIDForTestingOfflineStream";
  const url = `https://api.twitch.tv/helix/streams?user_login=${userID};`;
  const response = await fetch(url, params);
  if (!response.ok) throw oops;
  return (await response.json()).data.length === 0;
}

// export {
//   clientid,
//   params,
//   extension,
//   getNewStream,
//   findUserWithExtension,
//   redirectToStream
// };
