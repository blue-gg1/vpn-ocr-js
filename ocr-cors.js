async function performOCR() {
  try {
    const imageUrl = 'https://www.vpnbook.com/password.php';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + imageUrl; // Using CORS Anywhere proxy
    const response = await fetch(proxyUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onload = async function(event) {
      const imageSrc = event.target.result;
      const image = new Image();
      image.src = imageSrc;
      image.onload = async function() {
        const { data: { text } } = await Tesseract.recognize(
          image,
          'eng',
          { logger: m => console.log(m) }
        );
        document.getElementById('output').textContent = text;
      };
    };
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Error:', error);
  }
}