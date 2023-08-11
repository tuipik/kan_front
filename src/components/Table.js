import { Fragment } from 'react';

function Table({ data, config, keyFn }) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default Table;