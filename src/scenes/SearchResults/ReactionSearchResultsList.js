import React, { Component } from "react";
import SearchResultsList from "./SearchResultsList.js";

export default class ReactionSearchResultsList extends Component {
  getResultsUrl(query, pageCount, pageSize) {
    const indexQueryArg = "sabio_reaction_entries";
    return (
      "ftx/text_search/num_of_index/" +
      "?query_message=" +
      query +
      "&index=" +
      indexQueryArg +
      "&from_=" +
      pageCount * pageSize +
      "&size=" +
      pageSize +
      "&fields=protein_name&fields=synonyms&fields=enzymes&fields=ko_name&fields=gene_name&fields=name&fields=enzyme_name&fields=product_names&fields=substrate_names&fields=enzymes.subunit.canonical_sequence&fields=species"
    );
  }

  getResults(data) {
    return data["sabio_reaction_entries"];
  }

  getNumResults(data) {
    return data["sabio_reaction_entries_total"]["value"];
  }

  formatResults(results, organism) {
    const formattedResults = {};
    for (const result of results) {
      const id = result["rxn_id"];
      let formattedResult = formattedResults[id];
      if (!formattedResult) {
        formattedResult = {};
      }
      const substrates = getParticipant(result["substrate_names"]);
      const products = getParticipant(result["product_names"]);
      formattedResult["substrates"] = substrates;
      formattedResult["products"] = products;

      const name = result["enzyme_names"][0];
      const equation = formatSide(substrates) + " → " + formatSide(products);
      if (name) {
        formattedResult["title"] =
          name[0].toUpperCase() + name.substring(1, name.length);
      } else {
        formattedResult["title"] = equation;
      }
      formattedResult["description"] = equation;

      formattedResult["route"] =
        "/reaction/data/?substrates=" + substrates + "&products=" + products;

      if (organism != null) {
        formattedResult["route"] += "&organism=" + organism;
      }

      formattedResults[id] = formattedResult;
    }

    return Object.values(formattedResults);
  }

  render() {
    return (
      <SearchResultsList
        get-results-url={this.getResultsUrl}
        get-results={this.getResults}
        get-num-results={this.getNumResults}
        format-results={this.formatResults}
        html-anchor-id="reactions"
        title="Reaction classes"
      />
    );
  }
}

function formatSide(parts) {
  return parts.join(" + ");
}

function getParticipant(participants) {
  const partNames = [];
  for (const participant of participants) {
    partNames.push(participant[participant.length - 1]);
  }
  return partNames;
}
