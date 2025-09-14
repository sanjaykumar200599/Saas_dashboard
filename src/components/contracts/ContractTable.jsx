import React from 'react';
import ContractRow from './ContractRow';

const ContractTable = ({ contracts }) => {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="table-header">
                Contract Name
              </th>
              <th scope="col" className="table-header">
                Parties
              </th>
              <th scope="col" className="table-header">
                Expiry Date
              </th>
              <th scope="col" className="table-header">
                Status
              </th>
              <th scope="col" className="table-header">
                Risk Score
              </th>
              <th scope="col" className="table-header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract, index) => (
              <ContractRow 
                key={contract.id} 
                contract={contract} 
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractTable;