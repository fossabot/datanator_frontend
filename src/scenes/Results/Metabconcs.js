// App.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import filterFactory, {
  textFilter,
  selectFilter,
} from 'react-bootstrap-table2-filter';
import ReactDOM from 'react-dom';
import {
  Input,
  Col,
  Row,
  Select,
  InputNumber,
  DatePicker,
  AutoComplete,
  Cascade,
  Button,
} from 'antd';
import 'antd/dist/antd.css';
import ConcentrationsTable from '~/components/Results/ConcentrationsTable.js';
import ConcSearch from '~/components/SearchField/ConcSearch.js';
import { PropTypes } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import './MetabConcs.css';

import { getSearchData } from '~/services/MongoApi';
import { MetaboliteInput } from '~/components/SearchField/MetaboliteInput';
import { OrganismInput } from '~/components/SearchField/OrganismInput';
import { setNewUrl } from '~/data/actions/pageAction';


import store from '~/data/Store'
const jsonfile = require('jsonfile');


@connect(store => {
    return{
    newRedirect: store.page.url,
  }
}) //the names given here will be the names of props



class MetabConcs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      organism: '',
      dataSource: [],
      orig_json: null,
      newSearch: false,
      abstract_search: false,
      newRedirect: '',
    };

    this.getNewSearch = this.getNewSearch.bind(this);
    this.getAbstractSearch = this.getAbstractSearch.bind(this);
    var url =
      'http://localhost:5000/results/' +
      this.props.match.params.molecule +
      '/' +
      this.props.match.params.organism;
  }
  componentDidMount() {
    console.log('hello');
    this.setState({
      abstract_search: this.props.match.params.abstract,
    });
    this.getSearchData();
  }

  componentDidUpdate(prevProps) {
    // respond to parameter change in scenario 3
    console.log("comp")

    if (this.props.newRedirect != prevProps.newRedirect){
      console.log("yipikayee")
      console.log(this.props.newRedirect)
      console.log(prevProps.newRedirect)
      this.props.history.push(this.props.newRedirect)
      //return <Redirect to={this.props.newRedirect}/>
    }
    if (
      this.props.match.params.molecule != prevProps.match.params.molecule ||
      this.props.match.params.organism != prevProps.match.params.organism ||
      this.props.match.params.abstract != prevProps.match.params.abstract
    ) {
      console.log("UPDATIONG!!!")
      this.getSearchData();
    }
  }

  getSearchData() {

    getSearchData([
      'concentration',
      this.props.match.params.molecule,
      this.props.match.params.organism,
      this.props.match.params.abstract,
    ]).then(response => {
      this.setState({ orig_json: response.data });
    });

  }

  getNewSearch(url) {
    console.log(url);
    url = url + '/False';
    this.props.dispatch(setNewUrl(url))
    //this.setState({ newSearch: true, newRedirect: url });
  }

  getAbstractSearch() {
    //this.setState({abstract_search:true,})
    this.setState({
      newSearch: true,
      newRedirect:
        '/metabconcs/' +
        this.props.match.params.molecule +
        '/' +
        this.props.match.params.organism +
        '/True',
    });
  }


  render() {
    //if (this.state.toMetabConc == true) {
    //  return <BrowserRouter><Redirect to='/dashboard' /></BrowserRouter>
    //}


    const Search = Input.Search;
    let styles = {
      marginTop: 50,
    };
    console.log(this.props.match.params.molecule);
    console.log(this.props.match.params.organism);
    return (
      <div className="container" style={styles}>
        <style>{'body { background-color: #f7fdff; }'}</style>
        <div className="search">
          <ConcSearch
            handleClick={this.getNewSearch}
            landing={false}
            defaultMolecule={this.props.match.params.molecule}
            defaultOrganism={this.props.match.params.organism}
          />
        </div>
        <br />
        <br />
        <div className="results">
          {this.state.orig_json && (
            <ConcentrationsTable
              json_data={this.state.orig_json}
              handleAbstract={this.getAbstractSearch}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(MetabConcs);
