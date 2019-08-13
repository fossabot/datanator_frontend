import React, { Component } from 'react';
import filterFactory, {
  textFilter,
  selectFilter,
  numberFilter,
  Comparator,
} from 'react-bootstrap-table2-filter';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { Slider } from 'antd';
import { connect } from 'react-redux';
import { getTotalColumns, filter_taxon, refreshSelectedData } from '~/data/actions/resultsAction';
import { abstractMolecule } from '~/data/actions/pageAction';

const selectOptions = {
  'Stationary Phase': 'Stationary Phase',
  'Log Phase': 'Log Phase',
};



@connect(store => {
  return {
    lineage: store.results.taxon_lineage,
  };
})


class TaxonFilter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      marks: {},
      numToNode: { 0: 0 },
      sliderValue: 100,
      sliderLen: 100, 
    };
    this.formatSlider = this.formatSlider.bind(this);
    this.formatter = this.formatter.bind(this);
    this.filter_taxon_inner = this.filter_taxon_inner.bind(this);
  }

  

  filter_taxon_inner(value) {
    this.props.dispatch(filter_taxon(value))
    this.setState({sliderValue:value})
  }



  formatSlider(lineage) {
    //const lineage = this.props.lineage;
    this.setState({ sliderLen: lineage.length - 1 });
    this.setState({ sliderValue: lineage.length - 1 });

    var new_marks = {};
    var new_numToNode = {};
    var n = lineage.length - 1;
    for (var i = 0; i < lineage.length; i++) {
      new_numToNode[i] = lineage[n];
      new_marks[i] = i;
      n--;
    }

    this.setState({
      numToNode: new_numToNode,
      marks: new_marks,
    });
  }

  formatter(value) {
    if (this.state.numToNode[value]) {
      return `${this.state.numToNode[value]}`;
    } else {
      return `${''}`;
    }
  }


  componentDidMount() {

    if (this.props.lineage) {
      this.formatSlider(this.props.lineage);
    }

  }

  componentDidUpdate(prevProps){
    if (this.props.lineage != prevProps.lineage) {
      this.formatSlider(this.props.lineage)
    }

  }


  render() {
    console.log("Rendering TaxonFilter")
        
return (
        <div className="slider">
          Taxonomic Distance
          <div className="slider_bar">
            <Slider
              marks={this.state.marks}
              value={this.state.sliderValue}
              //defaultValue={this.state.sliderLen}
              tipFormatter={this.formatter}
              onChange={this.filter_taxon_inner}
              max={this.state.sliderLen}
            />
          </div>
        </div>
  )}


}

export { TaxonFilter };
