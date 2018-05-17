const clientConfig = {
  clientId : 0,
  clientName : 'demo',
  presetPermission : {
    purposes : [1,2,3,4,5],
    vendors : [1,2,3,4,5,6,7,8,9,10]
  },
  views : {
    homeView : {
      title : 'We use cookies...',
      body : `And you should be able to take control over your personal data. Therefore we are providing you with new controls to manage your data, to give you a better internet experience.
              If you click Accept all below you consent to us and all the third-parties mentioned in our Privacy and Cookie Notice setting cookies and processing your personal data for the purposes of analytics and advertising.`
    },
    purposeView : {},
    vendorView : {},
  }
};

export default clientConfig;