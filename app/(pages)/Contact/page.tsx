// pages/Companies.js
"use client";
import React, { useState } from "react";
import Menu from "@/app/components/Menu";
import useFetchData from "@/lib/useFetchData";
import "@/app/css/style.css";
import { FaSearch, FaTimesCircle } from "react-icons/fa";

import { Company } from "@prisma/client";

const Companies = () => {
  const [search, setSearch] = useState("");
  const route = "companies";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/${route}`;
  const queryKey = [route];
  const { isPending, error, data, isFetching } = useFetchData(url, queryKey);
  if (isPending) return "Chargement...";
  if (error) return "An error has occurred: " + error.message;

  const filtered = data.companies.filter((company: Company) =>
    company.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <Menu background="venus.jpg" />
      <div className="content">
        <div className="box">
          <h1>Compagnies </h1>

          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Une compagnie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-item"
            />
            {search && (
              <FaTimesCircle
                className="clear-icon"
                onClick={() => setSearch("")}
              />
            )}
          </div>

          {filtered.map((company: Company) => (
            <div key={company.id_company}>
              <h3>{company.company_name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
