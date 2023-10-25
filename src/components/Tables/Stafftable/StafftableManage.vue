<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="2">
                  <v-text-field outlined v-model="mainSearch" label="Type the Filter"></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn depressed height="56px" color="success" @click="shoDialog2 = true">+ Add Manager</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog v-model="shoDialog2" width="800px">
        <v-card>
          <v-card-title>Add a Manager</v-card-title>
          <v-card-text>
            <v-form>
              <v-select outlined label="Full Name" v-model="NewselectedName" :items="employees" item-text="name"
                item-value="id" />

              <v-select outlined label="Role" v-model="NewselectedRole" :items="role" />
              <v-select outlined label="Team to Manage" v-model="NewselectedTeam" :items="team" item-text="name"
                item-value="team_id" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addManager">Submit</v-btn>
            <v-btn color="secondary" @click="shoDialog2 = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="shoDialog3" persistent width="600px">
        <v-card>
          <v-card-title class="text-h5">
            Manager Created Successfully
          </v-card-title>
          <br />
          <v-card-text>
            <v-row>Manager have been created Successfully!</v-row>
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
          <v-data-table :headers="headers" :items="displayedItems" :pagination.sync="pagination"
            :items-per-page="pagination.itemsPerPage" hide-default-footer>
            <!-- table content goes here -->
            <template v-slot:[`item.searchid`]="{ item }">
              <a v-bind:href="item.url" v-bind:style="{ textDecoration: 'none' }"><v-icon
                  @click="showDetails(item)">mdi-eye</v-icon></a>
              &nbsp;&nbsp;
              <a v-bind:href="item.url" v-bind:style="{ textDecoration: 'none' }"><v-icon
                  @click="showEdit(item)">mdi-pencil</v-icon></a>
            </template>
          </v-data-table>
          <!-- <v-pagination
            v-model="pagination.page"
            :length="totalPages"
            @input="displayedItems"
          ></v-pagination> -->
          <v-pagination :length="totalDisplayedPages" v-model="pagination.page" :total-items="totalItems"
            :items-per-page="pagination.itemsPerPage" @update:pagination="(val) => (pagination.page = val)" show-arrows
            small>
            <template v-slot:prevIcon>
              <v-icon>mdi-chevron-left</v-icon>
            </template>
            <template v-slot:nextIcon>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
            <template v-slot:after="props">
              <span v-if="props.page < totalPages - 3 && totalDisplayedPages > 5">...</span>
              <span v-else-if="props.page >= totalPages - 3 && totalPages > 5" class="ellipsis">...</span>
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
          <v-form ref="form" v-model="valid" @submit.prevent="updateProfile">
            <v-row>
              <v-col>
                <v-text-field v-model="userName" label="Name" outlined disabled></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select :items="role" v-model="userRole" outlined label="Role"></v-select>
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
import { getAllCompanyDepartements } from "../../../services/departmentService";
import {
  changeRole,
  //createEmployee,
  getAllManagers,
  getAllEmployees
} from "../../../services/employeeService";

export default {
  name: "TryT",
  data() {
    return {
      mainSearch: undefined,
      loader: true,
      total: 0,
      total2: 0,
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
      employees: [],
      searchQuery: "",
      selectedTeam: "",
      userDepartment: "",
      NewselectedTeam: "",
      NewselectedName: "",
      NewselectedRole: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Managed Team", value: "manage_team" },
        { text: "Role", value: "role" },
        { text: "Action", value: "searchid" },
      ],

      genders: ["Male", "Femal"],
      search: "",
      dropdown: "",
      checkbox: false,
      users: [],
      selectedUser_department: "",
      selectedUser_id: "",
      actions: ["Show more", "Edit role"],
    };
  },
  methods: {
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

      this.userDepartment = item.department_id;

      this.selectedUser_department = item.department_id;
      this.selectedUser_id = item.id;
    },

    changerole() {
      const id = this.selectedUser_id;
      let data = {
        department_id: this.selectedUser_department,
        status: this.userRole,
      };
      console.log(data);
      changeRole(id, data);
      this.showdialog = false;
    },
    loadDepartments() {
      getAllCompanyDepartements().then((response) => {
        //console.log(response);
        const data = response.result;
        this.team = data.map((dep) => {
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
      getAllManagers(data).then((response) => {
        console.log(response.data);
        this.users = response.data.map((i) => {
          return {
            id: i.id,
            name: i.name,
            manage_team: i.manageteam,
            role: i.role,
          };
        });
      });
      getAllEmployees(data).then((response) => {
        console.log(response.data);
        this.employees = response.data.map((i) => {
          return {
            id: i.id,
            name: i.employee_name,
            email: i.employee_email,
            location: i.employee_location,
            position: i.employee_grade,
            status: i.employee_status,
            work: i.employee_working_type,
            department_id: i.department_id
          };
        });
      });
    },


    // createManage() {
    //   const data = {
    //     employee_age: this.age,
    //     employee_name: this.fullname,
    //     employee_email: this.email,
    //     department_id: this.department,
    //     employee_location: this.shiftLocation,
    //     employee_grade: this.grade,
    //     employee_working_type: this.workingtype,
    //     employee_salary: this.salary,
    //     employee_gender: this.gender,
    //     employee_password: this.password,
    //     shiftname: this.shiftName,
    //   };
    //   console.log(data);
    //   createEmployee(data);
    //   this.shoDialog2 = false;
    //   this.shoDialog3 = true;
    // },

    // shoDialog() {
    //   this.shoDialog1 = false;
    //   this.shoDialog2 = true;
    // },
    // addManager() {
    //   if (this.fullname && this.email) {
    //     this.createManage();
    //   }
    //   this.shoDialog2 = false;
    //   this.getAllUsers();
    // },
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
          };
          //console.log(data)
          this.getAllUsers(data);
        }
      },
    },
  },

  computed: {
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
<style></style>
