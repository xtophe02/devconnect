import React from "react";

export const Skills = ({ skills, edit, name, handleChange }) => {
  const showColumns = (skills) => {
    let newArray = skills.split(" ").join("").split(",");
    let column = [];
    let rowInit = 0;
    let rowEnd = 4;
    for (let index = 0; index < Math.ceil(newArray.length / 4); index++) {
      column.push(
        <div className="column" key={index}>
          {newArray
            .map((skill) => (
              <div className="is-small" key={skill}>
                {skill}
              </div>
            ))
            .slice(rowInit, rowEnd)}
        </div>
      );
      rowInit += 4;
      rowEnd += 4;
    }

    return column;
  };

  if (edit) {
    return (
      <input
        type="text"
        className="input"
        value={skills}
        onChange={handleChange}
        name={name}
      />
    );
  }
  return <div className="columns">{showColumns(skills)}</div>;
};
