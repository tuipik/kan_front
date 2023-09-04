import {useFetchAccountsQuery} from "../store";
import UserInfo from "../components/UserInfo";

export default function useAccountsSelect ({ handleAttrChange, user, id, label }) {
  const { data: users, error: accountsErrors, isFetching: isAccountsFetching } = useFetchAccountsQuery();

  let renderedUserSelect;

  const defaultLabel = `--- ${label} ---`;

  if (users) {
    renderedUserSelect = <select id={id} defaultValue={user} onChange={handleAttrChange} className="form-select">
      <option value="">{defaultLabel}</option>
      {users.data.map((user) => {
        return <option key={user.id} value={user.id}><UserInfo data={user} /></option>;
      })}
    </select>

  } else if (isAccountsFetching) {
    renderedUserSelect = <div>Завантаження користувачів...</div>;
  } else {
    console.log(accountsErrors);
  }

  return renderedUserSelect;
}