import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";
import { scrollTo } from "~/utils/utils";
import MetadataSection from "./MetadataSection";
import { AbundanceDataTable } from "./AbundanceDataTable";

import "../BiochemicalEntityDetails.scss";

class Protein extends Component {
  constructor() {
    super();
    this.state = { metadata: null };
  }

  setMetadata(metadata) {
    this.setState({ metadata: metadata });
  }

  render() {
    return (
      <div>
        <div
          className={
            "loader-full-content-container" +
            (this.state.metadata ? " hide" : "")
          }
        >
          <div className="loader"></div>
        </div>

        <div
          className={
            "content-container biochemical-entity-scene biochemical-entity-protein-scene" +
            (this.state.metadata ? "" : " hide")
          }
        >
          <h1 className="page-title">
            Protein: {this.state.metadata ? this.state.metadata.title : ""}
          </h1>
          <div className="content-container-columns">
            <div className="overview-column">
              <div className="content-block table-of-contents">
                <h2 className="content-block-heading">Contents</h2>
                <div className="content-block-content">
                  <ul>
                    {this.state.metadata &&
                      this.state.metadata.metadataSections.map(section => (
                        <li key={section.id}>
                          <HashLink to={"#" + section.id} scroll={scrollTo}>
                            {section.title}
                          </HashLink>
                        </li>
                      ))}
                    <li key="abundance">
                      <HashLink to="#abundance" scroll={scrollTo}>
                        Abundance
                      </HashLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="content-column section">
              <MetadataSection
                set-scene-metadata={this.setMetadata.bind(this)}
              />
              <AbundanceDataTable
                uniprot-id-to-taxon-dist={
                  this.state.metadata
                    ? this.state.metadata.uniprotIdToTaxonDist
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Protein;
