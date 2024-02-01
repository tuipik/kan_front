export class TaskProgressService {

  constructor(task) {
    this.task = task;
  }

  get totalDoneHours() {
    return this.task.editing_time_done + this.task.correcting_time_done + this.task.tc_time_done;
  }

  get totalEstimateHours() {
    return this.task.editing_time_estimate + this.task.correcting_time_estimate + this.task.tc_time_estimate;
  }

  get percentageProgress() {
    return Math.round( this.totalDoneHours * 100 / this.totalEstimateHours);
  }

}