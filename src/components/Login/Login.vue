<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <v-row align="center" justify="center">
                      <img class="logo" src="../../assets/bottrack.png" />
                      <v-col cols="12" sm="8">
                        <div v-if="msg" class="message">
                          {{ loginError }}
                        </div>
                        <v-text-field
                          label="Email"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          class="mt-16"
                          v-model="loginemail"
                        />
                        <v-text-field
                          label="Password"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="loginpassword"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="Remember Me"
                              class="mt-n1"
                              color="blue"
                            >
                            </v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text"
                              >Forgot password</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn  dark block tile @click="login()"
                          >Log in</v-btn
                        >

                        <h5 class="text-center grey--text mt-4 mb-3">
                          Or Log in using
                        </h5>
                        <div
                          class="d-flex justify-space-between align-center mx-10 mb-16"
                        >
                          <v-btn depressed outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="blue">fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="light-blue lighten-3"
                              >fab fa-twitter</v-icon
                            >
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="myprimary  rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Don't Have an Account Yet?</h3>
                      <h6 class="text-center">
                        Let's get you all set up so you can start creating your
                        your first<br />
                        onboarding experience
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn  tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="purple rounded-br-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Alredy Signed up?</h3>
                      <h6 class="text-center">
                        Log in to your account so you can continue building
                        and<br />
                        editing your onboarding flows
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <v-row align="center" justify="center">
                      <img class="logo" src="../../assets/bottrack.png" />
                      <v-col cols="12" sm="8">
                        <div v-if="successMessage">
                          {{ successMessage }}
                        </div>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="First Name*"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              v-model="firstname"
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="Last Name*"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              v-model="lastname"
                            />
                          </v-col>
                        </v-row>
                        <v-text-field
                          label="Organization*"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="organization"
                        />
                        <v-text-field
                          label="Business Email*"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="email"
                        />
                        <v-select
                          label="Country*"
                          :items="countries"
                          item-text="name"
                          required
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          v-model="country"
                        />
                        <v-row>
                          <v-col cols="12" sm="5">
                            <v-select
                              label="Code*"
                              :items="countries"
                              item-text="dial_code"
                              required
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              v-model="countrycode"
                            />
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-text-field
                              label="Phone Number*"
                              outlined
                              dense
                              color="blue"
                              autocomplete="false"
                              v-model="phone"
                            />
                          </v-col>
                        </v-row>

                        <v-text-field
                          label="Password*"
                          outlined
                          dense
                          color="blue"
                          autocomplete="false"
                          type="password"
                          v-model="password"
                        />
                        <v-row>
                          <v-col cols="12" sm="7">
                            <v-checkbox
                              label="I Accept AAE"
                              class="mt-n1"
                              color="blue"
                            >
                            </v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="5">
                            <span class="caption blue--text ml-n4"
                              >Terms & Conditions</span
                            >
                          </v-col>
                        </v-row>
                        <v-btn
                          color="purple"
                          @click="CreateCompany()"
                          dark
                          block
                          tile
                          >Sign up</v-btn
                        >

                        <h5 class="text-center grey--text mt-4 mb-3">
                          Or Sign up using
                        </h5>
                        <div
                          class="d-flex justify-space-between align-center mx-10 mb-11"
                        >
                          <v-btn depressed outlined color="grey">
                            <v-icon color="red">fab fa-google</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="blue">fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn depressed outlined color="grey">
                            <v-icon color="light-blue lighten-3"
                              >fab fa-twitter</v-icon
                            >
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { createCompany } from "../../services/companyService";
import { loginService } from "../../services/loginService";

export default {
  name: "LogIn",
  components: {},
  data: () => ({
    step: 1,
    msg: false,
    successMessage: "",
    loginError: "",

    firstname: "",
    lastname: "",
    phone: "",
    organization: "",
    email: "",
    country: "",
    countrycode: "",
    password: "",

    countries: [],

    loginemail: "",
    loginpassword: "",
  }),
  props: {
    source: String,
  },

  methods: {
    async login() {
      try {
        const data = {
          username: this.loginemail,
          password: this.loginpassword,
        };
        const rep = loginService(data).then((response) => {
          //this.loginError = response.message
          console.log(response);
          this.clearFormLogin();
          this.$router.push("/dashboard");

          console.log("Token:", response)
        });

        if (rep) {
          await rep;
          return;
        }
      } catch (err) {
        console.error(err);
        if (err.response.statusText === "Unauthorized"){
          this.msg = true;
          this.loginError = "Invalid credentials";
          setTimeout(() => {
            this.loginError = "";
          }, 2000);
        }
      }
    },

    clearFormLogin() {
      this.loginemail = "";
      this.loginpassword = "";
    },

    CreateCompany() {
      const data = {
        company_name: this.organization,
        company_location: this.country,
        contact_person_full_name: this.firstname + " " + this.lastname,
        contact_person_email: this.email,
        contact_person_phone: this.countrycode + this.phone,
        contact_person_password: this.password,
      };

      //console.log("data:::", data);

      createCompany(data).then((response) => {
        this.successMessage = response.msg;
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      });
      this.clearForm();
    },

    clearForm() {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.phone = "";
      this.organization = "";
      this.country = "";
      this.countrycode = "";
      this.password = "";
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
  },

  mounted() {
    this.getCountriesApi();
  },
};
</script>

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
.logo {
  width: 300px;
  height: 120px;
}

.message {
  color: red;
  margin: 3rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1rem;
}
</style>
