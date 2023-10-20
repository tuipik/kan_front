import {Fragment} from "react";

export default function UserInfo( { data }) {
  return (
    <Fragment>
      {data.last_name} {data.first_name} ({data.department_obj?.name})
    </Fragment>
  );
}