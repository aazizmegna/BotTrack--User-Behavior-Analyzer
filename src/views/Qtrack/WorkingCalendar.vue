<template>
  <div>
    <v-row>
      <v-col>
        <v-toolbar color="white">
          <div>
            <v-btn class="ma-2" color="green" @click="addShift">
              <v-icon dark left>mdi-plus</v-icon>Add a New Shift
            </v-btn>
          </div>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="myshift"
          :search="search"
          :loading="loading"
          height="300"
          :rows-per-page-items="[10, 20, 30]"
          :pagination.sync="pagination"
          class="elevation-1"
          :selectable="true"
          :show-select-all="true"
          @click:row="selectRow"
        >
        <template #item="{ item , index }">
          <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
            <td class="border-cell">{{ item.name }}</td>
            <td class="border-cell">{{ item.hours }}</td>
            <td class="border-cell">{{ item.country }}</td>
            <td class="border-cell">{{ item.person }}</td>
            <td class="border-cell">{{ item.count }}</td>
            <td class="border-cell">            <router-link
              v-bind:style="{ textDecoration: 'none' }"
              :to="{ name: 'vueshift', params: { id: item.id } }"
            >
              <v-icon color="blue lighten-2" @click="showEdit(item.id)"
                >mdi-pencil</v-icon
              >
            </router-link>
            &nbsp;&nbsp;
            <a v-bind:href="item.url" v-bind:style="{ textDecoration: 'none' }">
              <span v-if="item.default !== 'yes'">
                <v-icon color="red lighten-2" @click="deleteShift(item)"
                  >mdi-delete</v-icon
                ></span
              >
              <span v-else>
               &nbsp;&nbsp; -  &nbsp;
                </span
              ></a
            >
            &nbsp;&nbsp;
            <router-link
              v-bind:style="{ textDecoration: 'none' }"
              :to="{ name: 'workshift', params: { id: item.id } }"
            >
              <v-icon @click="showTime(item.id)">mdi-clock-time-four</v-icon>
            </router-link></td>



          </tr>
       </template>
          <template v-slot:[`item.searchid`]="{ item }">
            <router-link
              v-bind:style="{ textDecoration: 'none' }"
              :to="{ name: 'vueshift', params: { id: item.id } }"
            >
              <v-icon color="blue lighten-2" @click="showEdit(item.id)"
                >mdi-pencil</v-icon
              >
            </router-link>
            &nbsp;&nbsp;
            <a v-bind:href="item.url" v-bind:style="{ textDecoration: 'none' }">
              <span v-if="item.default !== 'yes'">
                <v-icon color="red lighten-2" @click="deleteShift(item)"
                  >mdi-delete</v-icon
                ></span
              >
              <span v-else>
               &nbsp;&nbsp; -  &nbsp;
                </span
              ></a
            >
            &nbsp;&nbsp;
            <router-link
              v-bind:style="{ textDecoration: 'none' }"
              :to="{ name: 'workshift', params: { id: item.id } }"
            >
              <v-icon @click="showTime(item.id)">mdi-clock-time-four</v-icon>
            </router-link>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="text-center">
          <h1 class="display-2">Add a shift</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-select
              v-model="selectedCountry"
              :items="countries"
              item-text="name"
              label="Select Country"
              required
              outlined
            ></v-select>
            <v-text-field
              v-model="name"
              label="Name"
              required
              outlined
            ></v-text-field>
            <v-select
              v-model="selectedUsers"
              :items="users"
              item-text="name"
              item-value="id"
              label="Select Users"
              multiple
              outlined
            ></v-select>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="createNewShift"
                color="primary"
                :disabled="disabledForm"
              >
                Submit
              </v-btn>
              <v-btn color="secondary" @click="close"> Cancel </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  getAllShifts,
  createShift,
  deleteShifts,
} from "@/services/calenderService";
import axios from "axios";
import { getAllEmployees1 } from "@/services/employeeService";
export default {
  data() {
    return {
      myshift: [],
      selectedCountry: "",
      selectedUsers: [],
      users: "",
      countries: "",
      name: "",
      selectedRowIndex: 0,

      dialog: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Working hours", value: "hours" },
        { text: "Country", value: "country" },
        { text: "Created By", value: "person" },
        { text: "Number of staff", value: "count" },
        { text: "", value: "searchid" },
      ],
    };
  },
  methods: {
    deleteShift(item) {
      let id = item.id;
      deleteShifts(id).then(() => {
        this.GetmyShift();
      });
    },
    addShift() {
      this.dialog = true;
    },
    createNewShift() {
      let data = {
        location: this.selectedCountry,
        people: this.selectedUsers,
        name: this.name,
      };
      createShift(data).then(() => {
        this.GetmyShift();
      });
      this.close();
    },

    close() {
      this.dialog = false;
      this.name = "";
      this.selectedCountry = "";
      this.selectedUsers = "";
    },

    showEdit(item) {
      console.log(item);
    },
    async GetmyShift() {
      await getAllShifts().then((response) => {
        console.log(response.data);
        this.myshift = response.data.map((item) => {
          return {
            id: item.id,
            name: item.shift_name,
            hours: item.working_hours,
            country: item.Country,
            person: item.Created_by,
            count: item.Staff_count,
            default: item.default,
          };
        });
      });
    },
    getCountriesApi() {
      axios
        .get("https://restcountries.com/v2/all")
        .then((response) => {
          this.countries = response.data.map((c) => {
            const code = "+" + c.callingCodes[0];
            return { name: c.name, dial_code: code };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllUsers() {
      getAllEmployees1().then((response) => {
        //console.log(response.data);
        this.users = response.data.map((i) => {
          return {
            id: i.id,
            name: i.employee_name,
          };
        });
      });
    },
  },
  mounted() {
    this.GetmyShift();
    this.getCountriesApi();
    this.getAllUsers();
  },
  computed: {
    disabledForm() {
      return !(this.name && this.selectedCountry);
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
