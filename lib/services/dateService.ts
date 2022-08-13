import dayjs from "dayjs";

class DateService {
  getTime() {
    return `${dayjs().hour()} : ${dayjs().minute()}`;
  }

  getFullDate() {
    return dayjs().format();
  }

  getDateAfter24h() {
    return dayjs().add(1, "day").format();
  }
}

const dateServices = new DateService();

export default dateServices;
