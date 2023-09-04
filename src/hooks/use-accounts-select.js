import {useFetchAccountsQuery} from "../store";
import UserInfo from "../components/UserInfo";

export default function useAccountsSelect ({ handleAttrChange, user, id }) {
  const { data: users, error: accountsErrors, isFetching: isAccountsFetching } = useFetchAccountsQuery();

  let renderedUserSelect;

  if (users) {
    renderedUserSelect = <select id={id} defaultValue={user?.id} onChange={handleAttrChange} className="form-select">
      <option value={null}>--- Обрати користувача ---</option>
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