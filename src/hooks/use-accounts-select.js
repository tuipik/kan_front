import {useFetchAccountsQuery} from "../store";
import UserInfo from "../components/user/UserInfo";

export default function useAccountsSelect ({ handleAttrChange, user, id, label, department }) {

  const skip = !department;

  const { data: users, error: accountsErrors, isFetching: isAccountsFetching } = useFetchAccountsQuery(department, {skip});

  let defaultLabel = `--- ${label} ---`;

  let userOptions;

  let renderedUserSelect;

  if (users) {
    userOptions = users.data.map((user) => {
      return <option key={user.id} value={user.id}><UserInfo data={user} /></option>;
    })
  } else if (isAccountsFetching) {
    defaultLabel = 'Завантаження користувачів...';
  } else if (accountsErrors) {
    defaultLabel = 'Помилка завантаження користувачів';
    console.log(accountsErrors);
  }

  renderedUserSelect = <select id={id} defaultValue={user} onChange={handleAttrChange} disabled={skip} className="form-select">
    <option value="">{defaultLabel}</option>
    {userOptions}
  </select>

  return renderedUserSelect;
}