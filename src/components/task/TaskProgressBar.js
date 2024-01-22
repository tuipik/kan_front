export default function TaskProgressBar({ task }) {

  const totalDoneHours = task.editing_time_done + task.correcting_time_done + task.tc_time_done;
  const totalEstimateHours = task.editing_time_estimate + task.correcting_time_estimate + task.tc_time_estimate;

  let progressPercentage = Math.round( totalDoneHours * 100 / totalEstimateHours);

  return <div style={{ display: 'flex', alignItems: 'center' }}>
    <progress max={100} value={progressPercentage} />
    <span style={{ fontSize: '13px', marginLeft: '5px' }}>{progressPercentage}%</span>
  </div>
}