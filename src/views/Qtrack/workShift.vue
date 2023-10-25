<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="item in days" :key="item.id" cols="12" md="4">
          <v-card outlined min-height="400">
            <v-card-title
              >{{ item.day }} <v-spacer></v-spacer
              ><v-btn color="blue lighten-2" small @click="dialog = true">
                <v-icon @click="selectDay(item)" color="white" fa
                  >fa-edit</v-icon
                >
              </v-btn></v-card-title
            >
            <v-card-text>
              <v-row
                v-for="workinghour in workingHours[item.day]"
                :key="workinghour"
              >
                <v-col>
                  <v-text-field
                    label="Start-Work"
                    v-model="workinghour.start"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="workinghour.end"
                    label="End-Work"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- <div v-if="!isWorkingDay(day)">Not a working day</div> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>Set Working Hours</v-card-title>
        <v-card-text>
          <div>
            <div v-for="(range, index) in ranges" :key="index">
              <div class="d-flex">
                <v-menu offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="range.startTime"
                      label="Start Time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="range.startTime"
                    format="HH:mm"
                  ></v-time-picker>
                </v-menu>
                <v-menu offset-y full-width>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="range.endTime"
                      label="End Time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="range.endTime"
                    format="HH:mm"
                  ></v-time-picker>
                </v-menu>
                <div class="selected-range">
                  <div class="selected-range-box">{{ range.startTime }}</div>
                  <div class="selected-range-box">{{ range.endTime }}</div>
                  <v-btn icon @click="removeRange(index)"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </div>
              </div>
              <hr />
            </div>
            <v-btn color="primary" @click="addRange">Add Range</v-btn>
            <br />
            <div>Total hours: {{ totalHours }}</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" text @click="saveWorkingHours">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { createStartend, getstartend } from "@/services/calenderService";
import { VTimePicker } from "vuetify/lib";

export default {
  components: {
    VTimePicker,
  },
  data() {
    return {
      ranges: [],
      dialog: false,
      workDayId: null,
      days: [],
      workingHours: {
        start: null,
        end: null,
      },
    };
  },
  methods: {
    selectDay(day) {
      //console.log("Selected day:", day);

      this.workDayId = day.id

      this.ranges = [];
      if (this.workingHours[day.day].length > 0) {
        for (let i = 0; i < this.workingHours[day.day].length; i++) {
          let workinghour = this.workingHours[day.day][i];
          if (workinghour.start && workinghour.end) {
            this.ranges.push({
              startTime: workinghour.start,
              endTime: workinghour.end,
            });
          } else {
            this.ranges = [];
          }
        }
      } else {
        this.ranges = [];
      }
    },
    addRange() {
      this.ranges.push({ startTime: "08:00", endTime: "12:00" });
    },
    removeRange(index) {
      this.ranges.splice(index, 1);
    },
    async getWokShiftTime() {
      let shiftId = this.$route.params.id;
      await getstartend(shiftId).then((response) => {
        // console.log(response);
        this.days = response.PendingProductivitys.map((item) => {
          return { id: item.id, day: item.day };
        });
        let tempWorkingHours = {};
        response.PendingProductivitys.forEach((item) => {
          let subTable = item.workstartends.map((subItem) => {
            return {
              start: subItem.work_start,
              end: subItem.work_end,
            };
          });
          tempWorkingHours[item.day] = subTable;
        });
        this.workingHours = tempWorkingHours;
      });
    },

    saveWorkingHours() {
      // Code to save working hours
      this.dialog = false;
      const startTimes = [];
      const endTimes = [];
      for (let i = 0; i < this.ranges.length; i++) {
        const range = this.ranges[i];
        startTimes.push(range.startTime);
        endTimes.push(range.endTime);
      }

      let id = this.$route.params.id
      let data = { 
        work_day_id: this.workDayId,
        work_starts: startTimes,
        work_ends: endTimes,
      };

      createStartend(id, data).then(()=>{
        this.getWokShiftTime()
      })

      console.log(id, data);
    },
    isWorkingDay(day) {
      return this.workingHours[day].morning !== "Not a working day";
    },
  },
  mounted() {
    this.getWokShiftTime();
  },
  computed: {
    totalHours() {
      let total = 0;
      for (let range of this.ranges) {
        if (range && typeof range.startTime === "string") {
          const startHour = parseInt(range.startTime.split(":")[0]);
          const endHour = parseInt(range.endTime.split(":")[0]);

          if (startHour < endHour) {
            total += endHour - startHour;
          } else if (startHour > endHour) {
            total += 24 - startHour + endHour;
          } else if (startHour === endHour) {
            total += 24;
          }
        }
      }

      if (total % 1 !== 0) {
        const decimalPart = total % 1;
        const minutePart = decimalPart === 0.5 ? "30" : "00";
        const hourPart = Math.floor(total);
        return `${hourPart}:${minutePart}`;
      } else {
        return `${total}:00`;
      }
    },
  },
};
</script>
<style scoped>
.selected-range {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
}

.selected-range-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  font-size: 12px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}
</style>
