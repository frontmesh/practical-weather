import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from './Main';

import { loadLocation } from '../../store/location';

const mapStateToProps = state => {
  return {
    location: state.locaton,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLocation: coords => dispatch(loadLocation(coords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
