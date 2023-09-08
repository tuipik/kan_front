export default function UserInfo( { data }) {
  return (
    <>
      <span style={{display: 'inline'}}>{data.last_name} {data.first_name} ({data.department?.name})</span>
    </>
  );
}