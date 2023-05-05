const imageInput = document.querySelector('#image_input');
let uploadedImage = '';

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    document.querySelector('#display_image').style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
});