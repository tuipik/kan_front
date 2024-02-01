export class CardStyleService {

  constructor(task) {
    this.task = task;
  }


  setOverdueStyles (styles, statuses, task, prefix) {
    const doneTimeKey = `${prefix}_time_done`;
    const estimateTimeKey = `${prefix}_time_estimate`;
    if (statuses.includes(task.status) && task[doneTimeKey] >= task[estimateTimeKey]){
      styles.background = 'rgb(256 0 0 / 0.4)';
    }
  }

  get styles() {
    const task = this.task;
    const styles = {display: "flex", justifyContent: "center", padding: 8};

    if (['EDITING', 'CORRECTING', 'VTK'].includes(task.status)) {
      styles.background = "rgb(67 208 72 / 0.25)";
    }
    if (task.status === 'DONE') {
      styles.background = "rgb(179 204, 204)";
    }
    // Check is corrector return to editor
    if (
      ['EDITING_QUEUE', 'EDITING'].includes(task.status) &&
      task.involved_users.length > 1
    ) {
      for(const user of task.involved_users) {
        if (user.role === 'CORRECTOR') {
          styles.background = "rgb(205 209 30 / 0.73)";
          break;
        }
      }
    }

    this.setOverdueStyles(styles,['EDITING_QUEUE', 'EDITING'], task, 'editing');
    this.setOverdueStyles(styles, ['CORRECTING_QUEUE', 'CORRECTING'], task, 'correcting');
    this.setOverdueStyles(styles, ['VTK_QUEUE', 'VTK'], task, 'tc');

    return styles;
  }

}