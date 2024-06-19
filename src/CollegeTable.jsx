import React, { useState, useEffect, useRef } from "react";
import collegesData from "./colleges.json";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import TableHeader from "./TableHeader";
import './CollegeTable.css'

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const loader = useRef(null);

  useEffect(() => {
    setColleges(collegesData.slice(0, 10));
  }, []);

  const loadMoreColleges = () => {
    setColleges((prevColleges) => [
      ...prevColleges,
      ...collegesData.slice(prevColleges.length, prevColleges.length + 10),
    ]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreColleges();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedColleges = React.useMemo(() => {
    let sortableColleges = [...colleges];
    if (sortConfig !== null) {
      sortableColleges.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableColleges;
  }, [colleges, sortConfig]);

  const filteredColleges = sortedColleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortArrow = (key) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    }
    return "";
  };

  const Row = ({ index, style }) => {
    const college = filteredColleges[index];
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #ddd",
          height: "500px",
          ...style,
        }}
      >
        
        {/* CollegeDunia Rank Column*/}
        <div style={{
          flex: "0 0 80px",
          padding: "12px 16px",
          borderRight: "1px solid #ddd",
          minWidth: "80px",
          textAlign: "center",
        }}>
          {college.cdRank}
        </div>

        {/* College Information Column */}
        <img
          width='40px'
          height='40px'
          style={{ borderRadius: '50%', marginLeft: '10px' }}
          src={college.image}
        />
        <div style={{
          padding: "12px 16px",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          width: "500px",
        }}>
          {college.featured && (
            <span className="featured" style={{ color: "red", fontWeight: "bold", padding: '2px' }}>
              Featured
            </span>
          )}
          
          <strong style={{ marginBottom: "5px", marginTop: 10, color: "#4bc7e7", textAlign: 'left' }}>
            {college.name}, {college.city}
          </strong>
          
          <span style={{ fontSize: "0.9em", textAlign: "left" }}>
            {college.city}, {college.state} | {college.approvedStatus}
          </span>
          
          {college.courseName && (
            <div style={{
              background: "#fffae1",
              borderLeft: "2px solid orange",
              margin: "10px 0",
              textAlign: "left",
              padding: 10,
            }}>
              <p style={{ fontSize: "0.9em", margin: 0, marginLeft: 10 }}>
                Course: {college.courseName}
              </p>
              <p style={{ margin: 0, marginLeft: 10 }}>
                JEE Advance 2023 Cutoff: {college.jeeCutoff}
              </p>
            </div>
          )}
          
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <p style={{
              padding: "5px 10px",
              fontSize: "0.8em",
              cursor: "pointer",
              marginRight: "10px",
              color: "orange",
              fontWeight: "bold",
            }}>
              Apply Now
            </p>
            <p style={{
              padding: "5px 10px",
              fontSize: "0.8em",
              cursor: "pointer",
              color: "green",
              fontWeight: "bold"
            }}>
              Download Brochure
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="checkbox" style={{ marginRight: "5px" }} />
              <label style={{ fontSize: "0.9em" }}>Add To Compare</label>
            </div>
          </div>
        </div>

        {/* Course Fees Column */}
        <div style={{
          flex: "1 1 200px",
          padding: "12px 16px",
          borderRight: "1px solid #ddd",
          textAlign: "left",
        }}>
          <span className="green">₹ {college.courseFees}</span>
          <br />
          <br />
          BE/B.Tech
          <br />
          <br />
          - 1st Year Fees
          <br />
          <p style={{ marginTop: "10px", color: '#f88836', fontWeight: 'bold', cursor: "pointer" }}>
            Compare Fees
          </p>
        </div>

        {/* Placement Packages Column */}
        <div style={{
          flex: "1 1 200px",
          padding: "12px 16px",
          borderRight: "1px solid #ddd",
          textAlign: "left",
        }}>
          <span className="green">₹{college.averagePackage.toLocaleString()}</span>
          <br />
          Average Package
          <br />
          <br />
          <span className="green">₹{college.highestPackage.toLocaleString()}</span>
          <br />
          Highest Package
          <br />
          <p style={{ marginTop: "10px", color: '#f88836', fontWeight: 'bold', cursor: "pointer" }}>
            Compare Package
          </p>
        </div>

        {/* Rating Column */}
        <div style={{
          flex: "1 1 150px",
          padding: "12px 16px",
          borderRight: "1px solid #ddd",
          textAlign: "left",
        }}>
          {college.userReviews}/10
          <br />
          Based on {college.reviewCount} User Reviews
          <br />
          Best in {college.bestIn}
          <br />
        </div>

        {/* Ranking Column */}
        <div style={{
          flex: "1 1 150px",
          padding: "12px 16px",
          textAlign: "center",
        }}>
          #{college.rank}/{college.totalSimilar} in India
          <br />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <img src={college.mediaImage} alt="Media" style={{ width: "30px", height: "20px", margin: "5px" }} />
            2023
          </div>
          <div style={{ display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "center", color: '#4BC7E7', backgroundColor: '#e6faff', fontWeight: 'bold' }}>
            {college.moreMediaImages.map((img, idx) => (
              <img key={idx} src={img} alt={`More Media ${idx + 1}`} style={{ width: "30px", height: "15px", margin: "2px" }} />
            ))}
            + {college.totalMoreMedia} more
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      marginTop: "25px",
      width: "100%",
      maxWidth: "100%",
    }}>
      <input
        type="text"
        placeholder="Search by college name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "25px",
          padding: "8px",
          width: "30%",
          boxSizing: "border-box",
        }}
      />
      <div style={{ border: "1px solid #ddd", borderCollapse: "collapse" }}>
        <TableHeader handleSort={handleSort} getSortArrow={getSortArrow} />
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height + 500}
              itemCount={filteredColleges.length}
              itemSize={250}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
      <div ref={loader}></div>
    </div>
  );
};

export default CollegeTable;
