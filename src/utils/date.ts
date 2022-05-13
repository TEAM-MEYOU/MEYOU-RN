/**
 * 서버 DATE TIME -> 미유에서 사용하는 DateString으로 변환
 * @param date
 * @constructor
 */
export const ConvertMeYouDateString = (date: Date) => {
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};

/**
 * 커플 D-Day 계산
 * @param date
 * @constructor
 */
export const DiffCoupleTime = (date: Date) => {
  date.setHours(0);
  const current = new Date();
  current.setHours(0);
  return Math.ceil((current.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
};

/**
 * Javascript Date -> Java LocaleTime Convert
 * @param date
 * @constructor
 */
export const ToJavaLocaleDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const padMonth = month < 10 ? '0' + month : month;
  const padDay = day < 10 ? '0' + day : day;
  return `${date.getFullYear()}-${padMonth}-${padDay}`;
};

/**
 * Java LocaleTime -> DiaryLog DateTime Convert
 * @param date
 * @constructor
 */
export const ToDiaryDateString = (date: string) => {
  const currentDate = new Date();
  const [cYear, cMonth, cDay] = [currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()];
  const [year, month, day] = date.split('-').map(el => Number(el));

  if (cYear === year && cMonth === month && cDay === day) {
    return '오늘';
  } else if (year === year) {
    return `${month}월 ${day}일`;
  } else {
    return `${year}년 ${month}월 ${day}일`;
  }
};

/**
 * 통계에서 사용하는 날짜 형식
 * @param date
 * @constructor
 */
export const ToStatDateString = (date: string) => {
  const [year, month] = date.split('-').map(el => Number(el));
  return `${year}년 ${month}월`;
};
