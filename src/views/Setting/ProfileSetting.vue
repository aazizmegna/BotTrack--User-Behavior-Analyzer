<template>
  <div>
    <v-card color="#ecf5ff">
      <v-col lg="12">
        <v-row>
          <v-col>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field outlined label="Emplyer ID"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="3">
                  <v-btn
                    @click="updateProfile"
                    type="submit"
                    color="primary"
                    :disabled="saveDisabled2"
                    >Update</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-col>
          <v-col> </v-col>
          <v-col>
            <v-row>
              <v-col cols="12" md="3">
                <img src="../../assets/img.jpg" alt="" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-btn @click="showdialog = true" color="primary">
                  <v-icon>mdi-key</v-icon>&nbsp;Change password</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-dialog v-model="showdialog" persistent width="550px">
          <v-card>
            <v-card-title class="text-h5"> Change my password </v-card-title>
            <br />
            <v-row v-if="message">
              <v-col class="message"> {{ message }}</v-col></v-row
            >
            <br />
            <v-card-text>
              <!-- Form to add new group -->
              <form>
                <v-text-field
                  label="Old password"
                  type="password"
                  v-model="oldpass"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  label="New password"
                  type="password"
                  v-model="newpass"
                  required
                  outlined
                />
                <v-text-field
                  label="New password again"
                  type="password"
                  v-model="newpassagain"
                  required
                  outlined
                />
              </form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                :disabled="saveDisabled"
                @click="changepass()"
              >
                Save
              </v-btn>
              <v-btn color="secondary" text @click="showdialog = false">
                cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import store from "@/store";
import {
  getAllEmployees1,
  updatePassword,
  updateMyProfile,
} from "@/services/employeeService";
import bcrypt from "bcryptjs";
// Initialize bcrypt with the desired salt rounds

export default {
  data() {
    return {
      oldpass: "",
      newpass: "",
      newpassagain: "",
      email: "",
      name: "",
      message: null,
      message2: null,
      users: [],

      showdialog: false,

      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      valid: true,
    };
  },
  mounted() {
    this.email = this.login_user_email;
    this.name = this.login_user_name;
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      getAllEmployees1().then((response) => {
        console.log(response.data);
        this.users = response.data.map((i) => {
          return {
            id: i.id,
            password: i.employee_password,
          };
        });
      });
    },

    async changepass() {
      const employee = this.users.find(
        (user) => user.id === this.login_user_id
      );

      if (this.newpass !== this.newpassagain) {
        this.message = "The passwords entered do not match";
        setTimeout(() => {
          this.message = "";
        }, 5000);
      } else if (!bcrypt.compareSync(this.oldpass, employee.password)) {
        this.message = "The old password entered is incorrect";
        setTimeout(() => {
          this.message = "";
        }, 5000);
      } else if (bcrypt.compareSync(this.newpass, employee.password)) {
        this.message =
          "The new password must be different from the old password";
        setTimeout(() => {
          this.message = "";
        }, 5000);
      } else {
        let id = this.login_user_id;
        let data = {
          employee_password: this.newpass,
          employee_email: this.email,
          employee_name: this.name,
        };
        updatePassword(id, data);
        (this.newpass = ""), (this.oldpass = ""), (this.newpassagain = "");
      }
    },

    updateProfile() {
      if (this.$refs.form.validate()) {
        let id = this.login_user_id;
        let data = {
          employee_email: this.email,
          employee_name: this.name,
        };
        updateMyProfile(id, data);
      } else {
        console.log("Invalid form");
      }
    },
  },
  computed: {
    login_user_name() {
      return store.state.login_user_name;
    },
    login_user_email() {
      return store.state.loggedInUser;
    },
    login_user_id() {
      return store.state.login_user_id;
    },

    saveDisabled() {
      return !this.newpass || !this.newpassagain || !this.oldpass;
    },
    saveDisabled2() {
      return !this.name || !this.email;
    },
  },
};
</script>
<style scoped>
.message {
  color: blue;
  margin-left: 3rem;
}
</style>
