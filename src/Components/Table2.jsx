import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
    TbSortAscendingLetters,
    TbSortDescendingLetters,
} from "react-icons/tb";
import "../Styles/table2.css";
import { faker } from '@faker-js/faker/locale/en';


const CryptoCurrencies = () => {
    const n = Math.floor(Math.random()*500)
  const  allUsers  = generateUsers(n);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Change this value according to your requirement
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const tableRef = useRef(null);
  
  const handleScroll = () => {
    const table = tableRef.current;
    if (table) {
      const { scrollTop, clientHeight, scrollHeight } = table;
      if (scrollTop + clientHeight >= scrollHeight) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const table = tableRef.current;
    if (table) {
      table.addEventListener("scroll", handleScroll);
      return () => {
        table.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPage]);

  const handlePerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const sortData = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedUsers = allUsers
    ? allUsers.slice().sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="userSection">
        <h1 className="userHeading ">
          All crypto information
        </h1>
        <div className="userTableContainer">
          <table className="tableContainer">
            <thead className="tableheading">
              <tr>
                <th>Sr #</th>
                <th onClick={() => sortData("_id")}>
                  <p className="flex items-center ">
                    {" "}
                    UID
                    {sortConfig.key === "_id" && (
                      <span className="sort-icon mr-4">
                        {sortConfig.direction === "asc" ? (
                          <TbSortAscendingLetters />
                        ) : (
                          <TbSortDescendingLetters />
                        )}
                      </span>
                    )}
                  </p>
                </th>
                <th onClick={() => sortData("username")}>
                  <p className="flex items-center">
                    User Name
                    {sortConfig.key === "username" && (
                      <span className="sort-icon">
                        {sortConfig.direction === "asc" ? (
                          <TbSortAscendingLetters />
                        ) : (
                          <TbSortDescendingLetters />
                        )}
                      </span>
                    )}{" "}
                  </p>
                </th>
                <th onClick={() => sortData("email")}>
                  <p className="flex items-center">
                    Email
                    {sortConfig.key === "email" && (
                      <span className="sort-icon">
                        {sortConfig.direction === "asc" ? (
                          <TbSortAscendingLetters />
                        ) : (
                          <TbSortDescendingLetters />
                        )}
                      </span>
                    )}{" "}
                  </p>
                </th>
                <th onClick={() => sortData("role")}>
                  <p className="flex items-center">
                    Desired Role{" "}
                    {sortConfig.key === "role" && (
                      <span className="sort-icon">
                        {sortConfig.direction === "asc" ? (
                          <TbSortAscendingLetters />
                        ) : (
                          <TbSortDescendingLetters />
                        )}
                      </span>
                    )}{" "}
                  </p>
                </th>
                <th onClick={() => sortData("balance")}>
                  <p className="flex items-center">
                    Balance{" "}
                    {sortConfig.key === "balance" && (
                      <span className="sort-icon">
                        {sortConfig.direction === "asc" ? (
                          <TbSortAscendingLetters />
                        ) : (
                          <TbSortDescendingLetters />
                        )}
                      </span>
                    )}{" "}
                  </p>
                </th>
              
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>
                    {index + 1 + currentPage * itemsPerPage - itemsPerPage}
                  </td>
                  <td>{user.uid}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.balance} USD </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="paginationContainer ">
          <div className="paginationInfo">
            {indexOfFirstItem + 1}-
            {indexOfLastItem < allUsers.length
              ? indexOfLastItem
              : allUsers.length}{" "}
            of {allUsers.length} Users
          </div>
          <div className="paginationSelectContainer">
            <select
              name="options"
              className="paginationSelect"
              value={itemsPerPage}
              onChange={handlePerPageChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label htmlFor="options" className="paginationLabel">
              Users per page
            </label>
          </div>
          <div className="paginationButtons">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              className="paginationArrow"
            >
              <MdSkipPrevious size={30} />
            </button>
            <button
              disabled={indexOfLastItem >= sortedUsers.length}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              className="paginationArrow"
            >
              <MdSkipNext size={30} />
            </button>
          </div>
          <div className="paginationPageCount ">
            Page {currentPage} of {Math.ceil(sortedUsers.length / itemsPerPage)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoCurrencies;





function generateUsers(count = 10) {
    const users = [];
  
    for (let i = 0; i < count; i++) {
      users.push({
        // uid: faker.string.alpha(10),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(['admin', 'user', 'editor', 'guest']),
        balance: faker.finance.amount(0, 10000, 2),
      });
    }
  
    return users;
  }
  