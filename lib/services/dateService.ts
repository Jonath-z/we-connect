import dayjs from "dayjs";

class DateService {
  getTime() {
    return `${dayjs().hour()} : ${dayjs().minute()}`;
  }

  getFullDate() {
    return dayjs().format();
  }
}

const dateServices = new DateService();

export default dateServices;
