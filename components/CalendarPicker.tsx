import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CalendarPickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

export function CalendarPicker({ selectedDate, onDateSelect, onClose }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    if (direction > 0) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const isSelectedDate = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);
    onClose();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isSelectedDate(day);
      const isTodayDate = isToday(day);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isTodayDate && !isSelected && styles.todayDay,
          ]}
          onPress={() => handleDateSelect(day)}
        >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isTodayDate && !isSelected && styles.todayDayText,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      {/* Header with month navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.monthYearText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Week day headers */}
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDay}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.calendarGrid}>{renderCalendar()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    width: "100%",
    maxWidth: 350,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  weekDaysContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  weekDay: {
    flex: 1,
    alignItems: "center",
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  selectedDay: {
    backgroundColor: "#000",
    borderRadius: 20,
  },
  selectedDayText: {
    color: "#FFF",
    fontWeight: "700",
  },
  todayDay: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
  todayDayText: {
    fontWeight: "600",
  },
});

