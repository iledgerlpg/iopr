// config.js

const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbwNb1jjM1yGeIss5qZ-1cEN9Oni4WdaKqTK5_iIlvxc4a6CszMsNBfOl9mZ8ovWWmtBCA/exec";

function getAPIUrl(action) {
  const id = localStorage.getItem("id_spreadsheet");
  return `${API_ENDPOINT}?action=${action}&id_spreadsheet=${id}`;
}
