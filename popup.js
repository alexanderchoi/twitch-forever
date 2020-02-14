import {
  clientid,
  params,
  extension,
  getNewStream,
  findUserWithExtension,
  redirectToStream
} from "./content.js";

document.addEventListener("DOMContentLoaded", function() {
  getNewStream();
});
