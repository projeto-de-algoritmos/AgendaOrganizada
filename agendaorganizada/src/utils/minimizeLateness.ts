import ITask from './itask';

const compare = (taskA: ITask, taskB: ITask): number => {
  if (taskA.deadline < taskB.deadline) {
    return -1;
  }
  if (taskA.deadline > taskB.deadline) {
    return 1;
  }
  return 0;
};

const max = (a: number, b: number): number => {
  if (a > b) {
    return a;
  }
  return b;
};

const minimizeLateness = (tasks: Array<ITask>): number => {
  tasks.sort(compare);
  const currentDate = new Date();
  const dateInSeconds = Date.parse(currentDate.toDateString());
  let startTime = 0;
  let minLateness = 0;
  tasks.forEach((task) => {
    const [hour] = task.deadlineHour.split(':');
    const deadlineDate = new Date(task.deadline).setHours(Number(hour));
    const taskDeadline: number = (deadlineDate - dateInSeconds) / (1000 * 3600);
    minLateness = max(minLateness, (task.duration + startTime) - taskDeadline);
    startTime += task.duration;
  });
  return minLateness;
};

export default minimizeLateness;
