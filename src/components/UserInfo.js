export default function UserInfo( { data }) {
  return (
    <>
      <div style={{display: 'inline'}}>{data.last_name} {data.first_name} ({data.department.name})</div>
    </>
  );
}