// DatePicker.js

"use strict";

class DatePicker {
  constructor(id, callback) {
    this.id = id;
    this.callback = callback;
  }

  render(selectedDate) {
    const container = document.getElementById(this.id);
    const currentDate = new Date(selectedDate);
    currentDate.setDate(1); // Set to the first day of the month

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Create the date picker HTML
    const datePickerHTML = `
      <div class="date-picker">
        <div class="header">
          <span class="prev-month">&lt;</span>
          <span class="month-year">
            ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}
          </span>
          <span class="next-month">&gt;</span>
        </div>
        <div class="days-of-week">
          ${daysOfWeek.map((day) => `<span>${day}</span>`).join("")}
        </div>
        <div class="days">
          ${this.generateCalendar(currentDate, selectedDate)}
        </div>
      </div>
    `;

    container.innerHTML = datePickerHTML;

    // Add event listeners to the navigation buttons
    const prevMonthBtn = container.querySelector(".prev-month");
    const nextMonthBtn = container.querySelector(".next-month");

    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      this.render(currentDate);
    });

    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      this.render(currentDate);
    });

    // Add click event listeners to the days
    const dayElements = container.querySelectorAll(".day");
    dayElements.forEach((dayElement) => {
      dayElement.addEventListener("click", () => {
        if (!dayElement.classList.contains("inactive")) {
          const selectedDay = parseInt(dayElement.textContent);
          const selectedMonth = currentDate.getMonth() + 1;
          const selectedYear = currentDate.getFullYear();
          this.callback(this.id, {
            month: selectedMonth,
            day: selectedDay,
            year: selectedYear,
          });
        }
      });
    });
  }

  generateCalendar(currentDate, selectedDate) {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const today = new Date();

    const daysInMonth = lastDay.getDate();
    const daysInPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    const startDayOfWeek = firstDay.getDay();
    const endDayOfWeek = lastDay.getDay();

    const calendarArray = [];

    // Fill in days of the previous month
    for (
      let i = daysInPreviousMonth - startDayOfWeek + 1;
      i <= daysInPreviousMonth;
      i++
    ) {
      calendarArray.push({ day: i, inactive: true });
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        currentDate.getFullYear() === today.getFullYear() &&
        currentDate.getMonth() === today.getMonth() &&
        i === today.getDate();

      calendarArray.push({ day: i, inactive: false, today: isToday });
    }

    // Fill in days of the next month
    for (let i = 1; i <= 6 - endDayOfWeek; i++) {
      calendarArray.push({ day: i, inactive: true });
    }

    // Generate HTML for calendar days
    const dayElements = calendarArray.map((dayInfo) => {
      const classes = ["day"];
      if (dayInfo.inactive) classes.push("inactive");
      if (dayInfo.today) classes.push("today");

      return `<span class="${classes.join(" ")}">${dayInfo.day}</span>`;
    });

    return dayElements.join("");
  }
}
