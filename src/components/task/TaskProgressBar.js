import './task.css';
import {TaskProgressService} from "../../services/taskProgress";

export default function TaskProgressBar({ task }) {

  const taskProgressService = new TaskProgressService(task);
  let progressPercentage = taskProgressService.percentageProgress;

  return <div style={{ display: 'flex', alignItems: 'center' }}>
    <progress max={100} value={progressPercentage} />
    <span style={{ fontSize: '13px', marginLeft: '5px' }}>{progressPercentage}%</span>
  </div>
}