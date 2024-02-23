
// Load the Header (Navigation Bar) and Footer
fetch('header-footer.html')
  .then(response => response.text())
  .then(html => {
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Insert the header content into the navbarPlaceholder
    const navbarContent = doc.getElementById('navbarPlaceholder').innerHTML;
    document.getElementById('navbarPlaceholder').innerHTML = navbarContent;

    // Insert the footer content into the footerPlaceholder
    const footerContent = doc.getElementById('footerPlaceholder').innerHTML;
    document.getElementById('footerPlaceholder').innerHTML = footerContent;
  });


 