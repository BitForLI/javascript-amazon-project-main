async function fetchFirstProduct() {
  try {
    const response = await fetch('https://supersimplebackend.dev');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching first product:', error);
  }
}

fetchFirstProduct();
