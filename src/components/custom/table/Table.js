import { Fragment } from 'react';

function Table({ data, config, keyFn, classes, equalColumns}) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return equalColumns
      ? <th key={column.label} style={{width: `${100/config.length}%`}}>
        {column.label}
      </th>
      : <th key={column.label}>{column.label}</th>
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
    <table className={classes}>
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default Table;