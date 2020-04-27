import React, { useState, useEffect } from "react";
import axios from "axios";
import Sectiontitle from "../components/Sectiontitle";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import PortfolioPythonView from "../components/python/PortfolioPythonView";

function PortfoliosPython() {
  const [portfolios, setPortfolios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [portfoliosPerPage] = useState(9);

  useEffect(() => {
    axios.get("/api/portfolioPython").then((response) => {
      setPortfolios(response.data);
    });
  }, [portfolios]);

  const indexOfLastPortfolios = currentPage * portfoliosPerPage;
  const indexOfFirstPortfolios = indexOfLastPortfolios - portfoliosPerPage;
  const currentPortfolios = portfolios.slice(
    indexOfFirstPortfolios,
    indexOfLastPortfolios
  );

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="mi-about mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <Sectiontitle title="Python Portfolio" />
          <PortfolioPythonView portfolios={currentPortfolios} />
          {!(portfolios.length > portfoliosPerPage) ? null : (
            <Pagination
              className="mt-50"
              itemsPerPage={portfoliosPerPage}
              totalItems={portfolios.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PortfoliosPython;
