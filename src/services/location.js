import YQL from '../utils/YQL';

const fetchLocation = () => {
  // const yql = new YQL('SELECT * FROM weather.forecast WHERE (location = @zip)');
  const yql = new YQL(
    'SELECT * FROM weather.forecast WHERE woeid in (SELECT woeid FROM geo.places WHERE text="(@latitude,@longitude)")'
  );

  return yql.setParam('zip', 94089)
    .setConfig('ssl', true)
    .exec((err, res) => console.log(err, res));
};

export default fetchLocation;
