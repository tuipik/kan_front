import { Fragment } from 'react';
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";

function Table({ data, config, keyFn, classes, isCard}) {

  const authUserId = useSelector((state) => state.auth.data.id);

  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }

    return <th key={column.label}>{column.label}</th>;
  });

  const highlightUsersTask = (taskUserId) => {
    if (authUserId === taskUserId) {
      return {backgroundColor: "rgb(67 208 72 / 0.25)"}
    }
  }

  const wrapTaskCard = (task) => {
    if (task && isCard) {
      const taskUserId = task.props.task.user
      const style = {display: "flex", justifyContent: "center", padding: 8, ...highlightUsersTask(taskUserId)}
      return (
        <Card>
          <Card.Body style={style}>
            <Card.Text>
              {task}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return task
    }
  }

  const renderedRows = data.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td key={column.label}>
          {wrapTaskCard(column.render(rowData))}
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