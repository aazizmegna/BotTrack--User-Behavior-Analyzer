<template>
  <v-simple-table fixed-header height="800px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Requested By</th>
          <th class="text-left">Activity</th>
          <th class="text-left">Duration</th>
          <th class="text-left">Class</th>
          <th class="text-left">Requested Detail</th>
          <th class="text-left">Requested Date</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.requestedby">
          <td>{{ item.requestedby }}</td>
          <td>{{ item.activity }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ item.class }}</td>
          <td>{{ item.requesteddetail }}</td>
          <td>{{ item.requesteddate }}</td>
          <td>
            <v-btn class="ma-2" text icon color="blue lighten-2">
              <v-icon @click.stop="dialog2 = true">mdi-thumb-up</v-icon>
            </v-btn>

            <v-btn class="ma-2" text icon color="red lighten-2">
              <v-icon @click.stop="dialog = true">mdi-thumb-down</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
      <v-dialog v-model="dialog" persistent max-width="900px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Decline Request</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <h3 class="reason">Your reason:</h3>
              <br />
              <v-textarea outlined height="70px"></v-textarea>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--Thumb up dialog-->
      <v-dialog v-model="dialog2" persistent max-width="900px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Confirm kbdedit.com</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <h3 class="reason">Activity Duration</h3>
              <p>51s</p>

              <br />
              <h3 class="reason">Reason:</h3>
              <p>Ender Bey'in sorunu için kaynak araştırması yapıldı.</p>
              <br />
              <h3 class="reason">Valid For</h3>
              <v-container>
                <v-radio-group v-model="row" row>
                  <v-radio
                    label="Select User and Team"
                    value="radio-1"
                  ></v-radio>
                  <v-radio label="All Users" value="radio-2"></v-radio>
                </v-radio-group>
                <v-textarea outlined height="70px"></v-textarea>
                <v-select class="selectitem" label="Select" outlined></v-select>
                <table class="tb">
                  <th class="th1">For this date</th>
                  <th class="th2">For this date range</th>
                  <th class="th3">As of this date</th>
                  <th class="th4">All the time</th>
                </table>
              </v-container>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog2 = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog2 = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: "RequestClassificationTable",
  data() {
    return {
      dialog: false,
      dialog2: false,

      desserts: [
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
        {
          requestedby: "Issa Diallo",
          activity: "TERZIONDX.com",
          duration: "1h30m",
          class: "Developer",
          requesteddetail: "For this date: Dec 23, 2022 BUSINESS",
          requesteddate: "16h ago",
        },
      ],
    };
  },
};
</script>
<style scoped>
.reason {
  color: cornflowerblue;
}
.selectitem {
  width: 40%;
}
.tb{
  border: solid 1px black;
}
.tb .th2, .th3{
  height: 60px;
  width: 180px;
  border-right: solid 0.5px black;
  text-align: center;
  padding-top: 1.3rem;
  margin: 0;
}
.tb .th4{
    height: 60px;
  width: 180px;
    text-align: center;
  padding-top: 1.3rem;
  margin: 0;
}

.th1{
  background-color: cornflowerblue;
  color: white;
    height: 60px;
  width: 180px;
  text-align: center;
  padding-top: 1.3rem;
  margin: 0;
}
.tb .th2:hover, .th3:hover, .th4:hover{
  color: cornflowerblue;
}
</style>
