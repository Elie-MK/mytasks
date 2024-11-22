import React, { useMemo, useRef, useState } from "react";

import moment from "moment";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

import { Colors } from "../../../constants/Color";

type Props = {};

const width = Dimensions.get("screen").width;

const CalendarComp = (props: Props) => {
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const swiper = useRef<Swiper | null>(null);

  const weeks = useMemo(() => {
    const start = moment().add(week, "week").startOf("week");
    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }, (_, i) => {
        const date = moment(start).add(adj, "week").add(i, "day");
        return {
          date: date.toDate(),
          weekday: date.format("ddd"),
          month: date.format("MMM"),
        };
      });
    });
  }, [week]);

  return (
    <View style={{ flex: 0.3 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.todayDate}>
          Today {moment().format(" ddd, MMM DD ")}
        </Text>
      </View>
      {/* Weekdays and Dates */}
      <View style={styles.picker}>
        <Swiper ref={swiper} index={1} showsPagination={false} loop={false}>
          {weeks.map((week, weekIndex) => (
            <View
              key={weekIndex}
              style={[styles.itemRow, { paddingHorizontal: 16 }]}
            >
              {week.map((day, dayIndex) => {
                const isActive =
                  value.toDateString() === day.date.toDateString();

                return (
                  <TouchableWithoutFeedback
                    onPress={() => setValue(day.date)}
                    key={dayIndex}
                  >
                    <View>
                      <Text style={styles.weekday}>{day.weekday}</Text>
                      <Text
                        style={[
                          styles.days,
                          isActive && {
                            backgroundColor: Colors.BLUE,
                            borderRadius: 20,
                            color: Colors.WHITE,
                            fontFamily: "Roboto-bold",
                          },
                        ]}
                      >
                        {day.date.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>

      {/* Selected Date */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
        <Text style={styles.selectedDate}>{value.toDateString()} tasks</Text>
      </View>
    </View>
  );
};

export default CalendarComp;

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    maxHeight: 300,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  todayDate: {
    color: Colors.GRAY,
    fontSize: 16,
    fontFamily: "Roboto-bold",
  },
  weekday: {
    color: Colors.GRAY,
    fontSize: 16,
    textAlign: "center",
  },
  selectedDate: {
    color: Colors.BLACK,
    fontSize: 16,
    fontFamily: "Roboto-bold",
  },
  days: {
    fontSize: width < 380 ? 14 : 16,
    height: width < 380 ? 45 : 35,
    width: width < 380 ? 45 : 35,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 35,
  },
  itemRow: {
    width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
