<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :sort-by="['duration']"
      :sort-desc="[false, true]"
      :headers="headers"
      :items="activitiesData"
      hide-default-footer
      :search="search"
      height="500"
      :loading="loader"
      loading-text="Loading..."
    >
    <template #item="{ item , index }">
      <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
        <td class="border-cell">{{ item.requestedby }}</td>
        <td class="border-cell">{{ item.date }}</td>
        <td class="border-cell">{{ item.duration }}</td>
        <td class="border-cell">{{ item.requesteddetail }}</td>
        <td class="border-cell">{{ item.requested_date }}</td>
        <td class="border-cell">        <div>
          <v-btn text icon color="green lighten-2">
            <v-icon @click.stop="onThumbUpClick(item)">mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn class="ma-2" text icon color="red lighten-2">
            <v-icon @click.stop="onThumbDownClick(item)">mdi-thumb-down</v-icon>
          </v-btn>
        </div></td>

      </tr>
   </template>
      <template v-slot:[`item.approval`]="{ item }">
        <div>
          <v-btn text icon color="green lighten-2">
            <v-icon @click.stop="onThumbUpClick(item)">mdi-thumb-up</v-icon>
          </v-btn>
          <v-btn class="ma-2" text icon color="red lighten-2">
            <v-icon @click.stop="onThumbDownClick(item)">mdi-thumb-down</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="showDialogDown" persistent max-width="600px">
      <v-card>
        <v-form ref="form1" v-model="valid">
          <v-card-title v-if="selectedItem">
            Decline Request: {{ selectedItem.activity }}
          </v-card-title>
          <br />
          <v-card-text>
            <v-container>
              <h6>Your reason:</h6>
              <br />
              <v-text-field
                v-model="declinedReason"
                label="Reason"
                outlined
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="submitDeclined"> Reject </v-btn>
            <v-btn color="secondary" @click="showDialogDown = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!--Thumb up dialog-->
    <v-dialog v-model="showDialogUp" max-width="600px" persistent full-width>
      <v-card>
        <v-card-title v-if="selectedItem"
          >Warning <br />
          {{ selectedItem.activity }}</v-card-title
        >
        <br />
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <h6>
              <v-icon color="warning">mdi-alert-octagon</v-icon>Are you sure you
              want to confirm this request?
            </h6>
            <br />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitApprove">Confirm</v-btn>
          <v-btn color="secondary" @click="closeDialogProd">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { RejectNoActivityRequest,ApprouveNoActivityRequest } from "../../services/makeProdService";
export default {
  name: "RequestTable",
  props: ["activitiesData", "loader", "title"],
  data() {
    return {
      showDialog: false,
      showDialogUp: false,
      showDialogDown: false,
      selectedItem: null,
      options: [],

      search: "",

      pagination: {
        page: 1,
        itemsPerPage: 9,
      },
      selectedRowIndex: 0,

      declinedReason: "",
      headers: [
        {
          text: "Requested By",
          align: "start",
          sortable: true,
          value: "requestedby",
        },
        { text: "Date", value: "date" },
        { text: "Duration", value: "duration" }, 
        { text: "Requested Details", value: "requesteddetail" },
        //{ text: "Activity Date", value: "activity_date" },
        { text: "Requested Date", value: "requested_date" },
        {
          text: "Approval",
          value: "approval",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },
    submitDeclined() {
      if (this.$refs.form1.validate()) {
        // Form is valid, do something with the form data
        try {
          this.declinedRequest();
          this.declinedReason = "";
          this.showDialogDown = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
    submitApprove() {
      if (this.$refs.form.validate()) {
        // Form is valid, do something with the form data
        try {
          this.approuvedRequest();
          this.showDialogUp = false;
        } catch (error) {
          console.log(error);
        }
      }
    },

    declinedRequest() {
      const id = this.selectedItem.noact_id;
      const data = {
        not_aproved_cause: this.declinedReason,
      };

      RejectNoActivityRequest(id, data);
      //console.log(id, data);
    },
    approuvedRequest() {
      const id = this.selectedItem.noact_id;
      const data = {
        activity_recognition_id: this.selectedItem.act_recog_id,
        employee_id: this.selectedItem.employee_id,
        activity_date: this.selectedItem.requesteddate,
        total_duration: this.selectedItem.total_duration,
      };

      ApprouveNoActivityRequest(id, data);
      console.log(id, data);
    },
    onThumbUpClick(item) {
      this.showDialogUp = true;
      this.selectedItem = item;
    },
    onThumbDownClick(item) {
      this.showDialogDown = true;
      this.selectedItem = item;
    },
    closeDialogProd() {
      this.showDialogUp = false;
    },
    allowedDates: (val) => {
      const selectedDate = new Date(val);
      const currentDate = new Date();
      return selectedDate >= currentDate.setHours(0, 0, 0, 0);
    },
  },
};
</script>
<style scoped>
::v-deep .v-data-table .v-data-table-header {
  background-color: #FAFAFA !important; 

}
::v-deep .selected-row {
  background-color: #626c75 !important;
  color: #fff !important;
}

.custom-header {
  border: 1px solid rgb(206, 206, 206); /* Ajoutez les styles de bordure que vous préférez */
  background-color: rgb(241, 241, 241) !important; 
  padding: 8px; /* Ajoutez le rembourrage que vous préférez */
}
</style>