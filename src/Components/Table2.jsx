import { useEffect, useRef, useState } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";
import "../Styles/table2.css";

const CryptoCurrencies = () => {
  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=10&sparkline=false&price_change_percentage=1h,24h,7d,30d,1y`
        );
        const data = await response.json();
        setAllCoins(data);
      } catch (err) {
        console.error("Failed to fetch coin data", err);
      }
    };

    fetchCoins();
  }, []);
  console.log(allCoins);

  // table sorting and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100); // Change this value according to your requirement
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

  const sortedCoins = allCoins
    ? allCoins.slice().sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : [];

  const currentCoins = sortedCoins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="userSection">
        <h1 className="userHeading ">All crypto information</h1>
        <div className="userTableContainer">
          <table className="tableContainer">
            <thead className="tableheading">
              <tr>
                <th>Sr #</th>
                {[
                  { label: "Name", key: "name" },
                  { label: "Symbol", key: "symbol" },
                  { label: "Price (USD)", key: "current_price" },
                  {
                    label: "Hour",
                    key: "price_change_percentage_1h_in_currency",
                  },
                  {
                    label: "Day",
                    key: "price_change_percentage_24h_in_currency",
                  },
                  {
                    label: "Week",
                    key: "price_change_percentage_7d_in_currency",
                  },
                  {
                    label: "Month",
                    key: "price_change_percentage_30d_in_currency",
                  },
                  {
                    label: "Year",
                    key: "price_change_percentage_1y_in_currency",
                  },
                  { label: "Market Cap", key: "market_cap" },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => sortData(column.key)}
                    
                  >
                    <div className="thContainer gap-1">
                      {column.label}
                      {sortConfig.key === column.key &&
                        (sortConfig.direction === "asc" ? (
                          <TbSortAscendingLetters className="text-sm" />
                        ) : (
                          <TbSortDescendingLetters  className="text-sm" />
                        ))}
                    </div>
                  </th>
                ))}
                <th>Exchanges</th>
              </tr>
            </thead>
            <tbody>
              {currentCoins.map((coin, index) => (
                <tr key={coin.id}>
                  <td>
                    {index + 1 + currentPage * itemsPerPage - itemsPerPage}
                  </td>
                  <td className="nameContainer">
                     <img src={coin.image} alt={coin.name}  height={18} className="w-6 h-6" />
                    {coin.name}</td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td className="currentPrice">${coin.current_price.toLocaleString()}</td>
                  <td className={coin.price_change_percentage_1h_in_currency > 0 ? 'bg-green' : 'bg-red'}>
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </td>
                  <td className={coin.price_change_percentage_24h_in_currency > 0 ? 'bg-green' : 'bg-red'}>
                    {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                  </td>
                  <td className={coin.price_change_percentage_7d_in_currency > 0 ? 'bg-green' : 'bg-red'}>
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </td>
                  <td className={coin.price_change_percentage_30d_in_currency > 0 ? 'bg-green' : 'bg-red'}>
                    {coin.price_change_percentage_30d_in_currency?.toFixed(2)}%
                  </td>
                  <td  className={coin.price_change_percentage_1y_in_currency > 0 ? 'bg-green' : 'bg-red'}>
                    {coin.price_change_percentage_1y_in_currency?.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap?.toLocaleString()}</td>
                  <td>
                    <a
                      href={`https://www.coingecko.com/en/coins/${coin.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination controls */}
        <div className="paginationContainer ">
          <div className="paginationInfo">
            {indexOfFirstItem + 1}-
            {indexOfLastItem < allCoins.length
              ? indexOfLastItem
              : allCoins.length}
            of {allCoins.length} Coins
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
              disabled={indexOfLastItem >= sortedCoins.length}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              className="paginationArrow"
            >
              <MdSkipNext size={30} />
            </button>
          </div>
          <div className="paginationPageCount ">
            Page {currentPage} of {Math.ceil(sortedCoins.length / itemsPerPage)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoCurrencies;
