import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect(state => ({
  online: state.online
}))
class Home extends Component {
  static propTypes = {
    online: PropTypes.bool.isRequired
  };

  render() {
    const { online } = this.props;
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        {(online && (
          <Helmet title="Online" />
        ))
        }
        Default home will show list of exchange
      </div>
    );
  }
}

export default Home;
