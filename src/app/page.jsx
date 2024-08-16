import React from "react";
import PeopleDirectory from "./people-directory/page";

const App = ({ page }) => {
  return (
    <div className="shadow-md rounded-lg">
      <div className="flex flex-col h-screen py-3">
        <h2 className="text-4xl font-bold p-4">
          Welcome, <span>Jane Doe</span>
        </h2>
      </div>
      {page === "people-directory" && <PeopleDirectory />}
    </div>
  );
};

export default App;