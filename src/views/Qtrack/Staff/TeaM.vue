<template>
  <div>
    <v-card>
      <v-row>
        <v-col>
          <StaffWidget />
        </v-col>
      </v-row>
    </v-card>

    <v-card height="800px">
      <v-card-title>
        <v-toolbar dense flat>
          <!-- Add button to open the dialog -->
          <v-btn @click="showDialog = true" color="success">+ Add New Group</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="showDialog1 = true" color="primary" v-if="!isNoDepartment">Edit</v-btn>
          <v-btn @click="deleteSelected" color="error" v-if="!isNoDepartment">Remove</v-btn>
        </v-toolbar>
      </v-card-title>

      <v-row>
        <div>
          <v-card height="800">
            <div class="page">
              <div class="first-box">
                <v-card-title>Teams</v-card-title>
                <v-card-text>
                  <v-col lg="9">
                    <v-row>
                      <v-col>
                        <ul>
                          <li class="select" v-for="(team, index) in departement" :key="index" v-bind="team"
                            @click="selectTeam(team)">
                            {{ team.name }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
              </div>
              <div class="second-box">
                <v-card-title>Team Leads</v-card-title>
                <v-card-text>
                  <v-col lg="9">
                    <v-row>
                      <v-col>
                        <ul>
                          <li v-for="(item, index) in headmembers" :key="index">
                            {{ item.name }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
                <br />
              </div>
              <div class="third-box">
                <v-card-title>Team Members</v-card-title>
                <v-card-text>
                  <v-col lg="9">
                    <v-row>
                      <v-col>
                        <ul>
                          <li v-for="(member, index) in members" :key="index">
                            {{ member.name }}
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-card-text>
              </div>
            </div>
          </v-card>
        </div>
      </v-row>
    </v-card>

    <!-- Dialog component -->
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title>Add New Group</v-card-title>
        <v-card-text>
          <!-- Form to add new group -->
          <form>
            <p>{{ successMessage }}</p>
            <v-select label="Team Name" v-model="newGroup.name" :items="teams" item-text="name" item-value="id"
              required></v-select>
            <v-select label="Team Head" v-model="newGroup.heads" :items="staff" item-text="name" item-value="id" required
              multiple></v-select>
            <v-select label="Team Members" v-model="newGroup.members" :items="staff" item-text="name" item-value="id"
              multiple></v-select>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn class="primary" @click="addGroup">Add Group</v-btn>
          <v-btn class="secondary" @click="showDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- editable dialoge when the team is selected -->
    <template v-if="selectedTeam2">
      <v-dialog v-model="showDialog1" width="500">
        <v-card>
          <v-card-title>Edit: {{ selectedTeam2.name }}</v-card-title>
          <v-card-text>
            <!-- Form to add new group -->
            <form>
              <v-select label="Team Name" :items="teams" item-text="name" v-model="editDepartment" required></v-select>
              <v-select label="Team Head" :items="staff" item-text="name" item-value="id" v-model="editDepartmentHead"
                required multiple></v-select>
              <v-select label="Team Members" :items="staff" item-text="name" item-value="id" v-model="membersEdit"
                multiple></v-select>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-btn class="primary" @click="editTeam">Edit</v-btn>
            <v-btn class="secondary" @click="showDialog1 = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import StaffWidget from "../../../components/widget/StaffWidget.vue";
import { getAllEmployees1 } from "../../../services/employeeService";
import {
  createDepartement,
  // getAllCompanyDepartements,
  getListDepartements,
  // getSelectedDepartements,
  updateDepartement,
  // ::///////////////////////
  getAllCompanyDepartements1,
  getSelectedDepartements1,
  deleteDepartment,
} from "../../../services/departmentService";

export default {
  components: { StaffWidget },
  data() {
    return {
      selectedTeam2: null,
      teams: [],
      departement: [],
      members: [],
      headmembers: [],
      membersEdit: null,
      editDepartment: null,
      editDepartmentHead: null,
      editDepartmentMembers: null,
      editedTeam: {},
      showDialog1: false,
      selectedTeam: null,
      // selectedTeam2: null,
      selectedId: null,
      showDialog: false,
      successMessage: "",
      staff: [],
      newGroup: {
        name: "",
        heads: [],
        members: [],
      },
    };
  },
  created() {
    //this.selectedTeam = this.departement[0];
    this.loadEmployees();
    this.loadDepartments();
  },
  methods: {
    loadDepartments() {
      getListDepartements().then((response) => {
        console.log(response);
        const data = response.data;
        this.teams = data.map((dep) => {
          return {
            id: dep.id,
            name: dep.departement_name,
            heads: dep.head_of_department,
            members: dep.department_members,
          };
        });
      });

      getAllCompanyDepartements1().then((response) => {
        console.log(response);
        const data = response.result;
        this.departement = data.map((dep) => {
          return {
            id: dep.id,
            departement_id: dep.departement_id,
            name: dep.departement_name,
            // heads: dep.head_name,
          };
        });
      });
    },
    selectedMembers() {
      getSelectedDepartements1(this.selectedId).then((response) => {
        console.log(response);
        const data = response.departhead;
        this.headmembers = data.map((dep) => {
          return {
            // id: dep.id,
            name: dep.head_name,
          };
        });
        const data1 = response.teampeople;
        this.members = data1.map((dep) => {
          return {
            // id: dep.id,
            name: dep.name,
          };
        });
      });
    },
    loadEmployees() {
      getAllEmployees1().then((response) => {
        //console.log(response.data)
        const data = response.data;
        this.staff = data.map((emp) => {
          return {
            id: emp.id,
            name: emp.employee_name,
          };
        });
      });
    },


    selectTeam(team) {
      this.selectedTeam = [team];
      this.selectedTeam2 = team;
      this.selectedId = team.id;
      this.selectedMembers();

      console.log("team", team)

      // Set default values for edit dialog
      this.editDepartment = team.name;

      // Set default value for team head
      this.editDepartmentHead = this.staff.find(
        (staff) => staff.name === this.headmembers.name
      );
      if (team.name === "no_department") {
        this.selectedTeam2 = "no_department"
      }

    },

    addGroup() {
      if (this.newGroup.name && this.newGroup.heads) {
        const data = {
          departement_id: this.newGroup.name,
          head_departement_id: this.newGroup.heads,
          people: this.newGroup.members,
        };
        createDepartement(data).then((response) => {
          this.successMessage = response.msg;
          setTimeout(() => {
            this.successMessage = "";
            this.newGroup = { name: "", heads: [], members: [] };
          }, 5000);
          this.loadDepartments();
        });
        this.showDialog = false;
      }
    },
    deleteSelected() {
      const id = this.selectedTeam2.id;
      deleteDepartment(id)
    },

    editTeam() {
      const id = this.selectedTeam2.id;
      let data = {
        departement_id: this.selectedTeam2.departement_id,
        head_departement_id: this.editDepartmentHead,
        people: this.membersEdit,
        name: this.editDepartment
      };

      console.log(data);
      updateDepartement(id, data);

      this.loadDepartments();
      this.showDialog1 = false;
    },
  },
  computed: {
    isNoDepartment() {
      return this.selectedTeam2 === 'no_department';
    }
  }
};
</script>
<style scoped>
.page {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
}

.first-box {
  flex-basis: 40%;
  margin: 1rem;
  height: 600px;
}

.second-box {
  flex-basis: 30%;
  border: 1px solid #ccc;
  margin: 1rem;
  height: 600px;
}

.third-box {
  flex-basis: 30%;
  margin: 1rem;
  height: 600px;
  border: 1px solid #ccc;
}

.select:active {
  color: blue;
}

.select:hover {
  cursor: pointer;
}
</style>
