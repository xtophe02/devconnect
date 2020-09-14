import React from "react";

export const Skills = ({ skills }) => {
  const columns = (skills) => {
    let column = [];
    let rowInit = 0;
    let rowEnd = 3;
    for (let index = 0; index < Math.ceil(skills.length / 3); index++) {
      column.push(
        <div className="column" key={index}>
          {skills
            .map((skill) => (
              <div className="is-small" key={skill}>
                {skill}
              </div>
            ))
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
