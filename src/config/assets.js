export const logoList = [
  require('../../assets/logo.png'),
  require('../../assets/logo2.png'),
  require('../../assets/logo3.png'),
  require('../../assets/logo4.png'),
  require('../../assets/logo5.png'),
  require('../../assets/logo6.png'),
  require('../../assets/logo7.png'),
];

export const getRandLogo = logoList[Math.floor(Math.random() * logoList.length)];
