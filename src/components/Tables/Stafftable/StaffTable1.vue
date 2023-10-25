<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="2">
                  <v-text-field
                    outlined
                    v-model="mainSearch"
                    label="Type the Filter"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-select
                    outlined
                    v-model="mainSearch2"
                    :items="[{ team_id: null, name: 'All' }].concat(team)"
                    item-text="name"
                    item-value="team_id"
                    label="Filter on department"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn
                    depressed
                    height="56px"
                    color="success"
                    @click="shoDialog1 = true"
                    >+ Add Staff</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="shoDialog1" persistent max-width="500">
        <v-card>
          <v-card-title class="text-h5">
            Wanna add a new member ?
          </v-card-title>
          <v-card-text
            >Make sure you are a superadmin in the office and make sure you are
            loged in with the Computer of the new member because the Bot will be
            directly install on the member's computer.
          </v-card-text>

          <v-card-text> Have met all the conditions up there? </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="shoDialog"> Yes </v-btn>
            <v-btn color="red darken-1" text @click="shoDialog1 = false">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="shoDialog2" persistent width="800px">
        <v-card>
          <v-card-title class="text-h5"> Add a New Member </v-card-title>
          <br />
          <v-card-text>
            <!-- Form to add new group -->
            <form>
              <v-text-field
                label="Full Name"
                v-model="fullname"
                required
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="Email"
                type="email"
                v-model="email"
                required
                outlined
                :autocomplete="'new-password'"
                dense
              />
              <v-select
                label="Department"
                :items="team"
                item-text="name"
                item-value="team_id"
                v-model="department"
                required
                outlined
                dense
              />
              <v-select
                label="Location"
                :items="shifts"
                item-text="country"
                v-model="shiftLocation"
                required
                outlined
                dense
              />
              <v-select
                label="Shift"
                :items="filteredShifts"
                item-text="name"
                v-model="shiftName"
                required
                outlined
                dense
              />
              <v-text-field
                label="Position"
                type="text"
                v-model="grade"
                required
                outlined
                dense
              />
              <v-text-field
                label="Working Type"
                type="text"
                v-model="workingtype"
                required
                outlined
                dense
              />
              <v-text-field
                label="Salary"
                type="text"
                v-model="salary"
                required
                outlined
                dense
              />
              <v-select
                label="Gender"
                :items="genders"
                v-model="gender"
                required
                outlined
                dense
              />
              <v-text-field
                label="Age"
                type="number"
                v-model="age"
                required
                outlined
                dense
              />
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                required
                outlined
                :autocomplete="'new-password'"
                dense
              />
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addStaff()"> Save </v-btn>
            <v-btn color="secondary" @click="shoDialog2 = false">
              cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="shoDialog3" persistent width="600px">
        <v-card>
          <v-card-title class="text-h5">
            User Created Successfully
          </v-card-title>
          <br />
          <v-card-text>
            <v-row>Employee have been created Successfully!</v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="shoDialog3 = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="displayedItems"
            :pagination.sync="pagination"
            :items-per-page="pagination.itemsPerPage"
            hide-default-footer
          >
          <template #item="{ item , index }">
            <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
              <td class="border-cell">{{ item.name }}</td>
              <td class="border-cell">{{ item.email }}</td>
              <td class="border-cell">{{ item.position }}</td>
              <td class="border-cell">{{ item.status }}</td>
              <td class="border-cell">              <a
                v-bind:href="item.url"
                v-bind:style="{ textDecoration: 'none' }"
                ><v-icon @click="showDetails(item)">mdi-eye</v-icon></a
              >
              &nbsp;&nbsp;
              <a
                v-bind:href="item.url"
                v-bind:style="{ textDecoration: 'none' }"
                ><v-icon @click="showEdit(item)">mdi-pencil</v-icon></a
              ></td>
  

  
            </tr>
         </template>
            <!-- table content goes here -->
            <template v-slot:[`item.searchid`]="{ item }">
              <a
                v-bind:href="item.url"
                v-bind:style="{ textDecoration: 'none' }"
                ><v-icon @click="showDetails(item)">mdi-eye</v-icon></a
              >
              &nbsp;&nbsp;
              <a
                v-bind:href="item.url"
                v-bind:style="{ textDecoration: 'none' }"
                ><v-icon @click="showEdit(item)">mdi-pencil</v-icon></a
              >
            </template>
          </v-data-table>
          <!-- <v-pagination
            v-model="pagination.page"
            :length="totalPages"
            @input="displayedItems"
          ></v-pagination> -->
          <v-pagination
            :length="totalDisplayedPages"
            v-model="pagination.page"
            :total-items="totalItems"
            :items-per-page="pagination.itemsPerPage"
            @update:pagination="(val) => (pagination.page = val)"
            show-arrows
            small
          >
            <template v-slot:prevIcon>
              <v-icon>mdi-chevron-left</v-icon>
            </template>
            <template v-slot:nextIcon>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
            <template v-slot:after="props">
              <span
                v-if="props.page < totalPages - 3 && totalDisplayedPages > 5"
                >...</span
              >
              <span
                v-else-if="props.page >= totalPages - 3 && totalPages > 5"
                class="ellipsis"
                >...</span
              >
            </template>
          </v-pagination>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showDropdown" persistent width="700px">
      <v-card>
        <v-card-title class="text-h5"> Details </v-card-title>
        <v-card-text>
          <!-- Form to add new group -->
          <v-form ref="form" v-if="selectedItem">
            <v-row>
              <v-col>
                <h5>Name:</h5>
              </v-col>
              <v-col>
                <h6>{{ selectedItem.name }}</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Email:</h5>
              </v-col>
              <v-col>
                <h6>{{ selectedItem.email }}</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Position:</h5>
              </v-col>
              <v-col>
                <h6>{{ selectedItem.position }}</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Location:</h5>
              </v-col>
              <v-col>
                <h6>{{ selectedItem.location }}</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Department:</h5>
              </v-col>
              <v-col>
                <h6>Developer</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Role:</h5>
              </v-col>
              <v-col>
                <h6>{{ selectedItem.status }}</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Working type:</h5>
              </v-col>
              <v-col>
                <h6>{{ selectedItem.work }}</h6>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Computer:</h5>
              </v-col>
              <v-col>
                <h6>TRZQB05SD</h6>
                <a href="/computer">more computers</a>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="secondary" @click="showDropdown = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showdialog" persistent width="500px">
      <v-card>
        <v-card-title class="text-h5"> Change role </v-card-title>
        <v-card-text>
          <!-- Form to add new group -->
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="updateProfile"
            v-if="selectedItem"
          >
            <v-row>
              <v-col>
                <v-text-field
                  v-model="userName"
                  label="Name"
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="userEmail"
                  label="Email"
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="role"
                  v-model="userRole"
                  outlined
                  label="Role"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="team"
                  item-text="name"
                  item-value="team_id"
                  v-model="userDepartment"
                  outlined
                  label="Department"
                  :disabled="makeDisable"
                  multiple
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" @click="changerole()">
            Save
          </v-btn>
          <v-btn type="submit" color="secondary" @click="showdialog = false">
            cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAllShifts } from "@/services/calenderService";
import { getAllCompanyDepartements1 } from "../../../services/departmentService";
import {
  changeRole,
  createEmployee,
  getAllEmployees,
} from "../../../services/employeeService";

export default {
  name: "TryT",
  data() {
    return {
      mainSearch: undefined,
      mainSearch2: undefined,
      loader: true,
      total: 0,
      total2: 0,
      selectedRowIndex: 0,

      pagination: {
        page: 1,
        itemsPerPage: 10,
      },
      showDropdown: false,
      showdialog: false,
      shifts: [],
      fullname: "",
      email: "",
      userName: "",
      userEmail: "",
      userRole: "",
      department: "",
      shiftLocation: "",
      shiftName: "",
      age: "",
      grade: "",
      workingtype: "",
      salary: "",
      gender: "",
      password: "",
      team: [],
      role: ["Super_admin", "Admin", "Staff"],
      selectedItem: [],
      shoDialog2: false,
      shoDialog3: false,
      shoDialog1: false,
      searchQuery: "",
      selectedTeam: "",
      userDepartment: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Position", value: "position" },
        { text: "Role", value: "status" },
        { text: "Action", value: "searchid" },
      ],
      genders: ["Male", "Femal"],
      search: "",
      dropdown: "",
      checkbox: false,
      users: [],
      selectedUser_department: [],
      selectedUser_id: "",
      actions: ["Show more", "Edit role"],
    };
  },
  methods: {
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },
    showDetails(item) {
      this.showDropdown = true;
      this.selectedItem = item;
    },
    showEdit(item) {
      this.showdialog = true;
      this.userEmail = item.email;
      this.userName = item.name;
      if (this.role.includes(item.status)) {
        this.userRole = item.status;
      }

      // this.userDepartment = item.department_id;

      // this.selectedUser_department = item.department_id;
      this.selectedUser_id = item.id;
    },

    changerole() {
      const id = this.selectedUser_id;
      let data = {
        department_id: this.userDepartment,
        status: this.userRole,
      };
      console.log(data);
      changeRole(id, data);
      this.showdialog = false;
    },
    loadDepartments() {
      getAllCompanyDepartements1().then((response) => {
        //console.log(response);
        const data = response.result;
        const filter = data.filter((item) => {
          return item.departement_name !== "no_department";
        });
        this.team = filter.map((dep) => {
          return {
            team_id: dep.id,
            name: dep.departement_name,
          };
        });
      });
    },
    async getmyShift() {
      const response = await getAllShifts();
      this.shifts = response.data.map((item) => {
        return {
          name: item.shift_name,
          hours: item.working_hours,
          country: item.Country,
          person: item.Created_by,
          count: item.Staff_count,
        };
      });
    },

    getAllUsers(data) {
      getAllEmployees(data).then((response) => {
        console.log(response.data);
        this.users = response.data.map((i) => {
          return {
            id: i.id,
            name: i.employee_name,
            email: i.employee_email,
            location: i.employee_location,
            position: i.employee_grade,
            status: i.employee_status,
            work: i.employee_working_type,
            department_id: i.department_id,
          };
        });
      });
    },

    createEmployee() {
      const data = {
        employee_age: this.age,
        employee_name: this.fullname,
        employee_email: this.email,
        department_id: this.department,
        employee_location: this.shiftLocation,
        employee_grade: this.grade,
        employee_working_type: this.workingtype,
        employee_salary: this.salary,
        employee_gender: this.gender,
        employee_password: this.password,
        shiftname: this.shiftName,
      };
      console.log(data);
      createEmployee(data);
      this.shoDialog2 = false;
      this.shoDialog3 = true;
    },

    shoDialog() {
      this.shoDialog1 = false;
      this.shoDialog2 = true;
    },
    addStaff() {
      if (this.fullname && this.email) {
        this.createEmployee();
      }
      this.shoDialog2 = false;
      this.getAllUsers();
    },
  },
  watch: {
    shiftLocation() {
      this.getmyShift();
    },
    pagination: {
      immediate: true,
      handler() {
        let data = {
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          search: this.mainSearch,
          searchDep: this.mainSearch2,
        };
        //console.log(data)
        this.getAllUsers(data);
      },
      deep: true,
    },

    mainSearch: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data = {
            page: this.pagination.page,
            itemsPerPage: this.pagination.itemsPerPage,
            search: this.mainSearch,
            searchDep: this.mainSearch2,
          };
          //console.log(data)
          this.getAllUsers(data);
        }
      },
    },
    mainSearch2: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data = {
            page: this.pagination.page,
            itemsPerPage: this.pagination.itemsPerPage,
            search: this.mainSearch,
            searchDep: this.mainSearch2,
          };
          //console.log(data)
          this.getAllUsers(data);
        }
      },
    },
  },

  computed: {
    makeDisable() {
      return !(this.userRole === "Admin" || this.userRole === "Super_admin");
    },
    filteredShifts() {
      return this.shifts.filter(
        (shift) => shift.country === this.shiftLocation
      );
    },
    totalItems() {
      return this.users.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pagination.itemsPerPage);
    },

    displayedItems() {
      const start = (this.pagination.page - 1) * this.pagination.itemsPerPage;
      const end = start + this.pagination.itemsPerPage;
      return this.users.slice(start, end);
    },
    totalDisplayedPages() {
      if (this.totalPages <= 5) {
        return this.totalPages;
      } else if (this.pagination.page <= 3) {
        return 5;
      } else if (this.pagination.page >= this.totalPages - 1) {
        return this.totalPages;
      } else {
        return this.pagination.page + 1;
      }
    },
  },
  created() {
    this.loadDepartments();
    this.getmyShift();
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
