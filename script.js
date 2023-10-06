const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInp = form.querySelector("input"),
  infoText = form.querySelector("p"),
  copyBtn = wrapper.querySelector(".copy"),
  closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file) {
  infoText.innerText = "Scanning QR Code...";
  // sending post request to qr server api with passing
  // from data as body and getting response form it
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      infoText.innerText = result
        ? "Upload QR Code to Scan"
        : "Could not Scan QR Code";
      if (!result) {
        return;
      }
      wrapper.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);

      wrapper.classList.add("active");
      console.log(result);
    })
    .catch(() => {
      infoText.innerText = "Could not Scan QR Code";
    });
}

fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0]; // getting user selected file
  if (!file) {
    return;
  }
  let formData = new FormData(); // creating a new FormData object
  formData.append("file", file); // adding selected file to formData
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
