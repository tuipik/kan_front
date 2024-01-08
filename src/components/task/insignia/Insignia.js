import './insignia.css';

export default function Insignia({ task }) {

  let rank = 0;

  for (const tracker of task.time_trackers) {
    const status = tracker.task_status;
    if (status === 'TC' && rank < 3) {
      rank = 3;
      break;
    }
    if (status === 'CORRECTING' && rank < 2) rank = 2;
    if (status === 'EDITING' && rank < 1) rank = 1;
  }

  return rank
    ? <div className='insignia'>
      {'*'.repeat(rank)}
    </div>
    : ''
}