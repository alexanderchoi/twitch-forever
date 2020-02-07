const clientid = "hevwkj5uuxx9v4e5hshn3an8k0hvl5";
const params = {
  headers: {
    "client-id": clientid
  }
};

// Declare the overlay extension you want
const extension = `Waystone Overlay`;

document.addEventListener(
  "DOMContentLoaded",
  function() {
    // const bg = chrome.extension.getBackgroundPage();
    // Object.keys(bg.bears).forEach(function(url) {
    //   const div = document.createElement("div");
    //   div.textContent = `${url}: ${bg.bears[url]}`;
    //   document.body.appendChild(div);
    // });

    // document.querySelector("button").addEventListener("click", onclick, false);

    // function onclick() {
    //   chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, "hi", setCount);
    //   });
    // }

    // function setCount(res) {
    //   const div = document.createElement("div");
    //   div.textContent = `${res.count} bears`;
    //   document.body.appendChild(div);
    // }
    getNewStream();
  },
  false
);

function getNewStream() {
  const url = "https://api.twitch.tv/helix/streams?game_id=491403";
  fetch(url, params)
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json.data);
      const users = json.data;
      // for (i = 0; i < users.length; i++) {
      //   let userID = users[i].user_id;
      //   if (hasExtension(userID)) {
      //     console.log("has extensions");
      //   }
      // }
      let userID = users[0].user_id;
      if (hasExtension(userID)) {
        console.log("greatest success");
      } else {
        console.log("booo", userID);
      }
    })
    .catch(error => console.log(error));
}

function hasExtension(userID) {
  // console.log(`function hasExtension executed with id ${userID}`);
  const url = `https://api.twitch.tv/helix/users/extensions?user_id=${userID}`;
  fetch(url, params)
    .then(res => {
      return res.json();
    })
    .then(json => {
      console.log(json.data);
      const overlays = json.data.overlay;
      for (key in overlays) {
        if (overlays[key].name === extension) {
          console.log(`user ${userID} has extension ${extension}, success!`);
          return true;
        }
      }
      return false;
    })
    .catch(error => console.log(error));
}

function redirectToUserStream(userID) {
  // window.location.href = "https://www.twitch.tv/31fox";
  console.log("extension found");
}
