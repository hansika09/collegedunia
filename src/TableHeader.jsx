import React from "react";

const TableHeader = ({ handleSort, getSortArrow }) => {
  const headerStyle = {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#78bec3',
    fontWeight: 'bold',
    color: '#fff',
  };

  const cellStyle = {
    padding: '12px 16px',
    cursor: 'pointer',
    position: 'relative',
  };

  const nonSortableCellStyle = {
    padding: '12px 16px',
    textAlign: 'center',
  };

  return (
    <div style={headerStyle}>
      <div
        style={{ ...cellStyle, width: '80px' }}
        onClick={() => handleSort("cdRank")}
      >
        CD Rank {getSortArrow("cdRank")}
      </div>
      <div style={{ ...nonSortableCellStyle, width: '500px' }}>
        Colleges
      </div>
      <div
        style={{ ...cellStyle, width: '200px', flex: 1 }}
        onClick={() => handleSort("courseFees")}
      >
        Course Fees {getSortArrow("courseFees")}
      </div>
      <div style={{ ...nonSortableCellStyle, width: '200px', flex: 1 }}>
        Placement
      </div>
      <div
        style={{ ...cellStyle, width: '150px', flex: 1 }}
        onClick={() => handleSort("userReviews")}
      >
        User Reviews {getSortArrow("userReviews")}
      </div>
      <div
        style={{ ...cellStyle, width: '150px', flex: 1 }}
        onClick={() => handleSort("ranking")}
      >
        Ranking {getSortArrow("ranking")}
      </div>
    </div>
  );
};

export default TableHeader;
