import React, { Component } from 'react';

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

//import 'antd/dist/antd.css';
import { PropTypes } from 'react';
import { withRouter } from 'react-router';

const InputGroup = Input.Group;

class GeneralSearch extends Component {


  constructor(props) {
    super(props);
    this.state = {
      query: this.props.defaultQuery,
      organism: this.props.defaultOrganism,
      dataSource: [
        'Escherichia coli',
        'Bacillus subtilis',
        'Caulobacter crescentus',
        'Mycoplasma genitalium',
        'Aliivibrio fischeri',
        'Synechocystis',
        'Pseudomonas fluorescens',
        'Azotobacter vinelandii',
        'Streptomyces coelicolor',
        'Chlamydomonas reinhardtii',
        'Dictyostelium discoideum',
        'Tetrahymena thermophila',
        'Emiliania huxleyi',
        'Thalassiosira pseudonana',
        'Ashbya gossypii',
        'Aspergillus nidulans',
        'Coprinus cinereus',
        'Cryptococcus neoformans',
        'Neurospora crassa',
        'Saccharomyces cerevisiae',
        'Schizophyllum commune',
        'Schizosaccharomyces pombe',
        'Ustilago maydis',
        'Arabidopsis thaliana',
        'Selaginella moellendorffii',
        'Brachypodium distachyon',
        'Setaria viridis',
        'Lotus japonicus',
        'Lemna gibba',
        'Medicago truncatula',
        'Mimulus guttatus',
        'Nicotiana benthamiana',
        'Oryza sativa',
        'Physcomitrella patens',
        'Marchantia polymorpha',
        'Populus trichocarpa',
        'Amphimedon queenslandica',
        'Arbacia punctulata',
        'Aplysia,Branchiostoma floridae',
        'Caenorhabditis elegans',
        'Caledia captiva',
        'Callosobruchus maculatus',
        'Chorthippus parallelus',
        'Ciona intestinalis',
        'Daphnia spp.',
        'Drosophila melanogaster',
        'Euprymna scolopes',
        'Galleria mellonella',
        'Gryllus bimaculatus',
        'Loligo pealei',
        'Macrostomum lignano',
        'Mnemiopsis leidyi',
        'Nematostella vectensis',
        'Oikopleura dioica',
        'Oscarella carmela',
        'Parhyale hawaiensis',
        'Platynereis dumerilii',
        'Pristionchus pacificus',
        'Scathophaga stercoraria',
        'Schmidtea mediterranea',
        'Stomatogastric ganglion',
        'Strongylocentrotus purpuratus',
        'Symsagittifera roscoffensis',
        'Tribolium castaneum',
        'Trichoplax adhaerens',
        'Tubifex tubifex',
        'Ambystoma mexicanum',
        'Bombina variegata',
        'Anolis carolinensis',
        'Felis sylvestris catus',
        'Gallus gallus domesticus',
        'Canis lupus familiaris',
        'Mesocricetus auratus',
        'Cavia porcellus',
        'Myotis lucifugus',
        'Oryzias latipes',
        'Mus musculus',
        'Heterocephalus glaber',
        'Nothobranchius furzeri',
        'Columba livia domestica',
        'Poecilia reticulata',
        'Rattus norvegicus',
        'Macaca mulatta',
        'etromyzon marinus',
        'Takifugu rubripes',
        'Gasterosteus aculeatus',
        'Xenopus laevis',
        'Taeniopygia guttata',
        'Danio rerio',
        'Homo sapiens',
      ],
    };
    this.handleClickInner = this.handleClickInner.bind(this);
    this.goBack = this.goBack.bind(this); //
    //this.handleSearch = this.handleSearch.bind(this);
  }

  handleClickInner() {
    this.props.handleClick([this.state.query, this.state.organism])

  }

  goBack() {
    this.props.history.goBack();
  }

  componentDidMount() {
    this.setState({
      query: this.props.defaultQuery,
      organism: this.props.defaultOrganism,
    });
    //this.refs.taxonCol.applyFilter(28)
  }



  render() {
    console.log("Rendering GeneralSearch")
    const Search = Input.Search;
    let styles;

    if (this.props.landing) {
      styles = {
        'text-align': 'center',
      };
    } else {
      styles = {
        'text-align': 'left',
        display: 'flex',
        flexDirection: 'row',
      };
    }
    return (
      <div className="ConcSearch" style={styles}>
        {this.props.landing && (
          <img src={require('~/images/search_logo.png')} />
        )}
        {!this.props.landing && <img src={require('~/images/DT.png')} />}

        <InputGroup compact>
          <Input
            style={{ width: '30%' }}
            defaultValue={this.props.defaultQuery}
            data-testid="query_input"
            addonBefore="Search"
            onChange={event => {
              this.setState({ query: event.target.value });
            }}
            onKeyPress={ (event) => {if (event.key === "Enter") { this.handleClickInner() } }}
          />
          <AutoComplete
            dataSource={this.state.dataSource}
            defaultValue={this.props.defaultOrganism}
            style={{ width: '30%' }}
            onSelect={value => {
              this.setState({ organism: value });
            }}
            addonBefore="Organism"
            label="organism"
            placeholder="input here"
            onChange={value => {
              this.setState({ organism: value });
            }}
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          >
            <Input defaultValue="" addonBefore="Organism" data-testid="organism_input"/>
          </AutoComplete>
          <Button
            data-testid="search_button"
            type="primary"
            shape="circle"
            icon="search"
            onClick={this.handleClickInner}
          />
        </InputGroup>
      </div>
    );
  }
}

export default (GeneralSearch);
