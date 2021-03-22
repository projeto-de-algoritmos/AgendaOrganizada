export default function getTodayDate() {
  const today = new Date();
  let dd = today.getDate().toString();
  let mm = (today.getMonth() + 1).toString(); // January is 0!
  const yyyy = today.getFullYear().toString();
  if (Number(dd) < 10) {
    dd = `0${dd}`;
  }
  if (Number(mm) < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
}
