const imageUpload = document.getElementById('imageUpload');
const resizeSlider = document.getElementById('resizeSlider');
const uploadedImage = document.getElementById('uploaded-image');
const shirtMockup = document.getElementById('shirt-mockup');

let isDragging = false;
let offsetX, offsetY;

imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    uploadedImage.src = e.target.result;
  }
  reader.readAsDataURL(file);
});

resizeSlider.addEventListener('input', () => {
  const scale = resizeSlider.value / 100;
  uploadedImage.style.transform = `translate(-50%, -50%) scale(${scale})`;
});

uploadedImage.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = uploadedImage.offsetLeft - e.clientX;
  offsetY = uploadedImage.offsetTop - e.clientY;
});

shirtMockup.addEventListener('mouseup', (e) => {
  if (isDragging) {
    isDragging = false;
  }
});

shirtMockup.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  e.preventDefault();

  const newX = e.clientX + offsetX;
  const newY = e.clientY + offsetY;

  uploadedImage.style.left = `${newX}px`;
  uploadedImage.style.top = `${newY}px`;
});
