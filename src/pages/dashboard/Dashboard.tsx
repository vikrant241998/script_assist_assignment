import React, { useState, useEffect } from "react";
import "../../styles/dashboard.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Table } from "@mantine/core";
import { useAuthStore } from "../../auth/authStore";
import { useNavigate } from "react-router-dom";
import { useRickAndMortyData } from "../../hooks/useRickAndMortyData";
import icon from "../../assest/icon.png";
import logo_primary from "../../assest/logo_primary.png";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [currentRange, setCurrentRange] = useState<[number, number] | null>(null);
  const { data, error, isLoading } = useRickAndMortyData();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (user?.firstName && user?.lastName) {
      setUserName(`${user.firstName} ${user.lastName}`);
    }
  }, []);


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const handleRowClick = (id: number) => {
    navigate(`/details/${id}`);
  };

  //Search Filter
  const filteredData =
    data?.filter((character: any) => {
      const term = searchTerm.toLowerCase();
      return (
        character.title.toLowerCase().includes(term) ||
        character.original_title_romanised?.toLowerCase().includes(term) ||
        character.director.toLowerCase().includes(term) ||
        character.release_date.toLowerCase().includes(term)
      );
    }) || [];

  //Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    const titleA = a.title?.toLowerCase().trim() ?? "";
    const titleB = b.title?.toLowerCase().trim() ?? "";
    if (sortOrder === "asc") return titleA.localeCompare(titleB);
    if (sortOrder === "desc") return titleB.localeCompare(titleA);
    return 0;
  });

  //Range Filter (AFTER sort)
  const finalData = sortedData.filter((_, index) => {
    if (!currentRange) return true;
    const itemNumber = index + 1;
    return itemNumber >= currentRange[0] && itemNumber <= currentRange[1];
  });

  // Handle Sorting Change
  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
  };


  

  return (
    <>
      <div className="dash-handler" >
        <div className="dash-container" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
          <div className="dash-wrap" >
            <img className="logo-icon" src={logo_primary} alt="logo_primary" />
            <div className="search-container">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
              <img src={icon} alt="search-icon" className="search-icon" />
            </div>


            <Button onClick={handleLogout} className="logout-btn">
              Logout
            </Button>
          </div>
        </div>

        <div className="sort-container"data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" >
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="drop-btn">
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-menu">
              <Dropdown.Item onClick={() => handleSort("asc")}>
                Ascending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort("desc")}>
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="drop-btn">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu className="drop-menu">
              <Dropdown.Item onClick={() => setCurrentRange([1, 10])}>
                1 - 10
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCurrentRange([11, 20])}>
                11 - 20
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCurrentRange([21, 30])}>
                21 - 30
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <span className="name-display" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">Welcome: {userName}</span> {/* Display user's full name */}

      </div>

      <div className="table-handler" >
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Romanised</th>
              <th>Director</th>
              <th>Release Date</th>
              <th>Release Time</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {finalData && finalData.length > 0 ? (
              finalData.map((character: any, index: number) => (
                <tr key={character.id} style={{ cursor: "pointer" }}>
                  <td>
                    {currentRange
                      ? currentRange[0] + index
                      : sortOrder === "desc"
                      ? finalData.length - index
                      : index + 1}
                  </td>
                  <td onClick={() => handleRowClick(character.id)}>
                    <img
                      src={character.image}
                      alt={character.title}
                      style={{ borderRadius: "5px", height: "70px" }}
                    />
                  </td>
                  <td>{character.title}</td>
                  <td>{character.original_title_romanised}</td>
                  <td>{character.director}</td>
                  <td>{character.release_date}</td>
                  <td>{character.running_time}</td>
                  <td>{character.rt_score}</td>
                  <td onClick={() => handleRowClick(character.id)}>
                    <button className="view-btn">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
