import React from 'react';
import Container from '@components/Container';
import styled, { css } from '@emotion/native';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import colors from '@constants/colors';
import { Image, Text, TouchableOpacity } from 'react-native';
import ImageButton from '@components/ImageButton';

/**
 * 해당 년도가 윤년인지 판단해주는 유틸
 * @param year
 */
function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 해당 년,월에 해당하는 시작 요일과, 총 날짜를 계산해주는 유틸
 * @param year
 * @param month
 */
function getCalendar(year: number, month: number) {
  const date = new Date(year, month - 1);
  const startDay = date.getDay();
  let totalOfDay = 0;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      totalOfDay = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      totalOfDay = 30;
      break;
    case 2:
      isLeapYear(year) ? (totalOfDay = 29) : (totalOfDay = 28);
      break;
  }
  return { startDay, totalOfDay };
}

export interface DiaryDate {
  year: number;
  month: number;
  day: number;
}

interface Props {
  date: DiaryDate;
  setDate: Dispatch<SetStateAction<DiaryDate>>;
  diaryDate: Array<number>;
}

function Calendar({ date, setDate, diaryDate }: Props) {
  const { startDay, totalOfDay } = getCalendar(date.year, date.month);

  const onIncreaseMonth = () => {
    if (date.month === 12) {
      setDate(prevState => ({ ...prevState, year: prevState.year + 1, month: 1 }));
    } else {
      setDate(prevState => ({ ...prevState, month: prevState.month + 1 }));
    }
  };

  const onDecreaseMonth = () => {
    if (date.month === 1) {
      setDate(prevState => ({ ...prevState, year: prevState.year - 1, month: 12 }));
    } else {
      setDate(prevState => ({ ...prevState, month: prevState.month - 1 }));
    }
  };
  const renderCalendar = new Array(startDay + totalOfDay).fill(0).map((key, index) => {
    if (index % 7 === 0) {
      return (
        <DayBox key={index}>
          {new Array(Math.ceil(startDay + totalOfDay / 7) * 7)
            .fill(0)
            .slice(index, index + 7)
            .map((zero, i) => {
              const idx = index + i + 1;
              const value = idx - startDay;
              if (idx > startDay && idx <= totalOfDay + startDay) {
                return (
                  <DateBox value={value} key={index + i} date={date} setDate={setDate}>
                    <Text
                      style={css`
                        margin-bottom: 5px;
                        color: ${idx % 7 === 0 ? colors.blue300 : idx % 7 === 1 ? colors.red300 : colors.black};
                      `}>
                      {index + i + 1 - startDay}
                    </Text>
                    {diaryDate.indexOf(value) > -1 && (
                      <Image style={{ width: 20, height: 20 }} source={require('assets/icons/checked.png')} />
                    )}
                  </DateBox>
                );
              } else return <DateBox key={index + i} />;
            })}
        </DayBox>
      );
    }
  });
  return (
    <Container
      style={css`
        align-items: center;
      `}>
      <Box
        style={css`
          opacity: 0.4;
        `}>
        <ImageButton
          style={{ width: 15, height: 15 }}
          uri={require('/assets/icons/left.png')}
          onPress={() => {
            setDate(prevState => ({ ...prevState, year: prevState.year - 1 }));
          }}
        />
        <Text>{date.year}</Text>
        <ImageButton
          style={{ width: 15, height: 15 }}
          uri={require('/assets/icons/right.png')}
          onPress={() => {
            setDate(prevState => ({ ...prevState, year: prevState.year + 1 }));
          }}
        />
      </Box>
      <Box
        style={css`
          margin-bottom: 20px;
        `}>
        <ImageButton
          style={{ width: 30, height: 30 }}
          uri={require('/assets/icons/left.png')}
          onPress={onDecreaseMonth}
        />
        <Text>{date.month}월</Text>
        <ImageButton
          style={{ width: 30, height: 30 }}
          uri={require('/assets/icons/right.png')}
          onPress={onIncreaseMonth}
        />
      </Box>
      <CalendarBox>
        <HeaderBox>
          <DayText color={colors.red300}>일</DayText>
          <DayText>월</DayText>
          <DayText>화</DayText>
          <DayText>수</DayText>
          <DayText>목</DayText>
          <DayText>금</DayText>
          <DayText color={colors.blue300}>토</DayText>
        </HeaderBox>
        {renderCalendar}
      </CalendarBox>
    </Container>
  );
}

const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  width: 15%;
  margin-bottom: 5px;
`;

const CalendarBox = styled.View`
  width: 100%;
`;

const HeaderBox = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: #eff0f2;
`;

const DayText = styled.Text<{ color?: string }>`
  flex: 1;
  height: 30px;
  text-align: center;
  font-weight: 500;
  color: ${props => props.color};
`;

interface DateBoxProps {
  children?: ReactNode;
  value?: number;
}

type DateBox = DateBoxProps & Partial<Props>;

const DateBox = ({ children, value = 0, date, setDate }: DateBox) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (setDate) {
          setDate(prevState => ({ ...prevState, day: value }));
        }
      }}
      style={css`
        flex: 1;
        padding: 1px;
        align-items: center;
        background-color: ${value === date?.day ? colors.red100 : 'transparent'};
        border-radius: 12px;
      `}>
      {children}
    </TouchableOpacity>
  );
};

const DayBox = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  height: 50px;
`;

export default Calendar;
