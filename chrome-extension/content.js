function extractListingData() {
  const url = window.location.href;
  const isCommercial = url.includes('loopnet.com') || url.includes('crexi.com');
  const sourcePlatform = url.includes('loopnet.com') ? 'LoopNet' : 
                         url.includes('crexi.com') ? 'Crexi' : 
                         url.includes('zillow.com') ? 'Zillow' : 
                         url.includes('redfin.com') ? 'Redfin' : 'Web';
                         
  let data = {
    listingType: isCommercial ? 'COMMERCIAL' : 'RESIDENTIAL',
    sourceUrl: url,
    sourcePlatform: sourcePlatform,
    address: '',
    city: '',
    state: '',
    zip: '',
    photos: []
  };

  // 1. Try parsing JSON-LD Schema
  const jsonLdElements = document.querySelectorAll('script[type="application/ld+json"]');
  jsonLdElements.forEach(script => {
    try {
      const parsed = JSON.parse(script.innerText);
      const schema = Array.isArray(parsed) ? parsed[0] : parsed;
      
      // Residential (Zillow/Redfin) usually use @type: SingleFamilyResidence or RealEstateListing
      if (schema.address) {
        data.address = schema.address.streetAddress || data.address;
        data.city = schema.address.addressLocality || data.city;
        data.state = schema.address.addressRegion || data.state;
        data.zip = schema.address.postalCode || data.zip;
      }
      
      data.description = schema.description || data.description;
      if (schema.photo || schema.image) {
        let imgs = schema.photo || schema.image;
        if (typeof imgs === 'string') data.photos.push(imgs);
        if (Array.isArray(imgs)) data.photos.push(...imgs.map(i => typeof i === 'string' ? i : i.url));
      }
      
      if (!isCommercial) {
        if (schema.numberOfRooms) data.beds = schema.numberOfRooms;
        // Specific to some residential schemas
      }
    } catch (e) {}
  });

  // 2. Commercial Fallbacks (LoopNet)
  if (url.includes('loopnet.com')) {
    data.address = data.address || document.querySelector('.property-timestamp-title')?.innerText || document.querySelector('h1')?.innerText;
    const rentCol = document.querySelector('.rent-data-column');
    if (rentCol) {
       data.leaseRate = rentCol.innerText;
    }
    const capRateEl = Array.from(document.querySelectorAll('td')).find(el => el.innerText.includes('Cap Rate'));
    if (capRateEl && capRateEl.nextElementSibling) {
      data.capRate = parseFloat(capRateEl.nextElementSibling.innerText);
    }
    const imgElements = document.querySelectorAll('.carousel-hero-image img, .carousel-slide img');
    data.photos = Array.from(imgElements).map(img => img.src).filter(Boolean);
  }

  // 3. Residential Fallbacks (Zillow)
  if (url.includes('zillow.com')) {
    data.address = data.address || document.querySelector('h1')?.innerText;
    const priceEl = document.querySelector('[data-testid="price"] span');
    if (priceEl) data.price = priceEl.innerText;
    
    const bedBathElements = document.querySelectorAll('[data-testid="bed-bath-sqft-fact-container"] span');
    if (bedBathElements.length >= 3) {
      data.beds = parseInt(bedBathElements[0].innerText) || data.beds;
      data.baths = parseInt(bedBathElements[1].innerText) || data.baths;
      data.sqft = parseInt(bedBathElements[2].innerText.replace(/[^0-9]/g,'')) || data.sqft;
    }
    
    const imgElements = document.querySelectorAll('.media-stream li img');
    if (data.photos.length === 0) {
      data.photos = Array.from(imgElements).map(img => img.src).filter(Boolean);
    }
  }

  // Clean up
  data.photos = [...new Set(data.photos)].slice(0, 10); // max 10 photos

  return data;
}

// Inject UI Button
function injectImportButton() {
  if (document.getElementById('clickme-import-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'clickme-import-btn';
  btn.innerHTML = '📥 Import to CRM';
  
  // Basic inline styling
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999999',
    backgroundColor: '#000000',
    color: '#D4AF37',
    border: '2px solid #D4AF37',
    padding: '12px 24px',
    borderRadius: '8px',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  });

  btn.addEventListener('mouseenter', () => { btn.style.backgroundColor = '#222'; });
  btn.addEventListener('mouseleave', () => { btn.style.backgroundColor = '#000'; });

  btn.addEventListener('click', () => {
    btn.innerHTML = '⏳ Importing...';
    const data = extractListingData();
    chrome.runtime.sendMessage({ action: 'IMPORT_LISTING', payload: data }, (response) => {
      if (response && response.success) {
        btn.innerHTML = '✅ Success!';
        btn.style.backgroundColor = '#2ecc71';
        btn.style.color = 'white';
        btn.style.borderColor = '#27ae60';
      } else {
        btn.innerHTML = '❌ Failed';
        btn.style.backgroundColor = '#e74c3c';
        btn.style.borderColor = '#c0392b';
      }
      setTimeout(() => {
        btn.innerHTML = '📥 Import to CRM';
        btn.style.backgroundColor = '#000000';
        btn.style.color = '#D4AF37';
        btn.style.borderColor = '#D4AF37';
      }, 3000);
    });
  });

  document.body.appendChild(btn);
}

// Run on load
setTimeout(injectImportButton, 1500);
