const notification = document.querySelector(".notification");

const displayNotification = (typeName, text) => {
  notification.innerHTML = text;
  notification.classList.add("visible", `${typeName}`);
  setTimeout(
    () => notification.classList.remove("visible", `${typeName}`),
    3000
  );
};

const displaySuccess = (text) => displayNotification("success", text);
const displayError = (text) => displayNotification("error", text);

export { displaySuccess, displayError };
