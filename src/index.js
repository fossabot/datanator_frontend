// React Libraries
import React from "react";
import ReactDOM from "react-dom";
// Router (enables persistant URLs and History)
import { Router, Switch, Route } from "react-router-dom";

// Redux (used for state management)
import history from "~/utils/history";

// Feedback form
import { applyPolyfills, defineCustomElements } from "@bruit/component/loader";

// Styles for @Blueprint JS (Template Components)
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/scss/variables.scss";
import "./index.scss";

// Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAtom,
  faDna,
  faBug,
  faEnvelope,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

// Common page components
import Header from "~/components/Header/Header";
import Footer from "~/components/Footer/Footer";
import FeedbackForm from "~/components/FeedbackForm/FeedbackForm";
import { errorDialog } from "~/components/ErrorDialog/ErrorDialog";

// Website pages (scenes)
import Home from "~/scenes/Home/Home";
import SearchResults from "~/scenes/SearchResults/SearchResults";
import Metabolite from "~/scenes/BiochemicalEntityDetails/Metabolite/Metabolite";
import Rna from "~/scenes/BiochemicalEntityDetails/Rna/Rna";
import Protein from "~/scenes/BiochemicalEntityDetails/Protein/Protein";
import Reaction from "~/scenes/BiochemicalEntityDetails/Reaction/Reaction";
import Stats from "~/scenes/Stats/Stats";
import Help from "~/scenes/Help/Help";
import About from "~/scenes/About/About";
import Error404 from "~/scenes/Error404/Error404";

// Setup Font Awesome icon library
library.add(faAtom, faDna, faBug, faEnvelope, faExclamationCircle);

// Render site
const SiteRouter = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search/:query/:organism?/" component={SearchResults} />
        <Route
          path="/metabolite/:metabolite/:organism?/"
          component={Metabolite}
        />
        <Route path="/rna/:rna/:organism?/" component={Rna} />
        <Route path="/protein/:protein/:organism?/" component={Protein} />
        <Route
          path="/reaction/:substrates-->:products/:organism?/"
          component={Reaction}
        />
        <Route path="/rna/:protein_name" component={Rna} />

        <Route path="/stats/" component={Stats} />
        <Route path="/help/" component={Help} />
        <Route path="/about/" component={About} />
        <Route path="*" component={Error404} />
      </Switch>
      <Footer />
      {errorDialog}
      <FeedbackForm />
    </Router>
  );
};

ReactDOM.render(<SiteRouter />, document.getElementById("root"));

applyPolyfills().then(() => {
  defineCustomElements(window);
});
