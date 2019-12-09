// React Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//Router (enables persistant URLS and History)
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Redux (used for state management)
import { Provider } from 'react-redux';
import store from '~/data/Store';

//Styles for @Blueprint JS (Template Components)
import './index.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/select/lib/css/blueprint-select.css';
import '../node_modules/@blueprintjs/table/lib/css/table.css';
import '../node_modules/@blueprintjs/core/lib/scss/variables.scss';

//Website pages (scenes)
import { Home } from '~/scenes/Home/Home';
import HomeOld from '~/scenes/Home/HomeOld';
import Metabconcs from '~/scenes/Results/Metabconcs';
import ProteinPage from '~/scenes/Results/ProteinPage';
import ReactionPage from '~/scenes/Results/ReactionPage';
import GeneralPage from '~/scenes/Results/GeneralPage';
import PageExample from '~/scenes/Results/PageExample';
import AGGrid from '~/scenes/Results/AGGrid';

const SiteRouter = () => {
  return (
    <Router>
      <Route path="/" exact component={HomeOld} />
      <Route path="/old" component={HomeOld} />
      <Route
        path="/metabconcs/:molecule/:organism/:abstract?/"
        component={Metabconcs}
      />
      <Route
        path="/protein/:searchType/:molecule/:organism?/"
        component={ProteinPage}
      />

      <Route
        path="/reaction/:dataType/"
        component={ReactionPage}
      />
      <Route
        path="/general/"
        component={GeneralPage}
      />
      <Route
        path="/example/"
        component={PageExample}
      />
      <Route
        path="/ag/"
        component={AGGrid}
      />
    </Router>
  );
};
const SiteProvider = () => {
  return (
    <Provider store={store}>
      <SiteRouter />
    </Provider>
  );
};

SiteProvider.propTypes = {
  store: PropTypes.object.isRequired,
};

ReactDOM.render(<SiteProvider />, document.getElementById('root'));
