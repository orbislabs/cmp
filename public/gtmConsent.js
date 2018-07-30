if (typeof window.dataLayer === 'undefined') {
  console.log('[INFO][Module-TMS] dataLayer is undefined.');
} else {
  document.cookie = 'isFunctionalAllowed=true';
  document.cookie = 'isAnalyticsAllowed=true';
  document.cookie = 'isMarketingAllowed=true';
  window.dataLayer.push({
    event: 'updatedConsentSettings',
  });
}
