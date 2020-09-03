import React from "react";

export const Skills = ({ skills }) => {
  const columns = (skills) => {
    let column = [];
    let rowInit = 0;
    let rowEnd = 3;
    for (let index = 0; index < Math.ceil(skills.length / 3); index++) {
      console.log("i", rowInit);
      console.log("e", rowEnd);
      column.push(
        <div className="column">
          {skills
            .map((skill) => <div className="is-small">{skill}</div>)
            .slice(rowInit, rowEnd)}
        </div>
      );
      rowInit += 3;
      rowEnd += 3;
    }

    return column;
  };
  return <div className="columns">{columns(skills)}</div>;
};
