// pages/Contact.js
"use client";
import React, { useState } from "react";
import Menu from "@/app/components/Menu";
import useFetchData from "@/lib/useFetchData";
import "@/app/css/style.css";

import { Company } from '@prisma/client';

const Companies = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/companies`;
  const { isPending, error, data, isFetching } = useFetchData(url);
  if (isPending) return "Chargement...";
  if (error) return "An error has occurred: " + error.message;


  return (
    <div className="container">
      <Menu background="venus.jpg" />
      <div className="content">
        <div className="box">
          <h1>Compagnies </h1>
          {data.companies.map((company: Company) => (
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
