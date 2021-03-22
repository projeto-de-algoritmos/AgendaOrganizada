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
  console.log(`Current date: ${currentDate}`);
  const dateInSeconds = currentDate.getTime();
  let startTime = 0;
  let minLateness = 0;
  tasks.forEach((task) => {
    const [hour, min] = task.deadlineHour.split(':');
    const dateArray: string[] = task.deadline.split('-');
    const deadlineDate = new Date(
      Date.UTC(Number(dateArray[0]),
        Number(dateArray[1]) - 1,
        Number(dateArray[2]),
        Number(hour) + 3,
        Number(min)),
    );
    const deadlineSeconds = deadlineDate.getTime();
    console.log(`Deadline date: ${deadlineDate}`);
    const taskDeadline: number = (deadlineSeconds - dateInSeconds) / (1000 * 3600);
    console.log(`task deadline: ${taskDeadline}`);
    minLateness = max(minLateness, (task.duration + startTime) - taskDeadline);
    startTime += task.duration;
  });
  return minLateness;
};

export default minimizeLateness;
