<template>
  <div>
    <v-card height="500">
      <div class="page page-container">
        <div class="first-box">
          <div class="account" height="350">
            <v-card-title>Shift information</v-card-title>
            <v-card-text>
              <v-col lg="9">
                <v-row>
                  <v-col>
                    <v-form>
                      <v-row>
                        <v-col>
                          <v-text-field label="*Country Name" required outlined dense
                            v-model="countryName"></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field label="*Shift name" outlined dense v-model="shiftName"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                </v-row>
              </v-col>
            </v-card-text>
          </div>
          <br />
          <div class="contact" height="400">
            <v-card-title>Choosing People for the shift</v-card-title>
            <v-card-text>
              <v-col lg="9">
                <v-row>
                  <v-col>
                    <v-form>
                      <v-row>
                        <v-col>
                          <v-select
                            required
                            outlined
                            :items="users"
                            item-text="name"
                            item-value="id"
                            dense
                            v-model="people"
                            multiple
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-col>
                </v-row>
              </v-col>
            </v-card-text>
          </div>
          <v-row>
            <v-col cols="12" md="3">
              <v-btn @click="savechanges" color="primary">Save changes</v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="second-box">
          <v-card-title>Showing People</v-card-title>
          <v-card-text>
            <v-col lg="12">
              <v-row>
                <v-data-table :headers="headers" :items="myshift" :search="search" :loading="loading" height="335"
                  :rows-per-page-items="[10, 20, 30]" :pagination.sync="pagination" class="elevation-1" :selectable="true"
                  :show-select-all="true" @click:row="selectRow" fluid>
                </v-data-table>
              </v-row>
            </v-col>
          </v-card-text>
          <br />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { getShifts, updateShift } from "@/services/calenderService";
import { getAllEmployees1 } from '@/services/employeeService';
export default {
  data() {
    return {
      filteredId: null,
      people: "",
      shiftName: "",
      users: [],
      countryName: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Grade", value: "grade" },
        { text: "Location", value: "location" },
        { text: "Status", value: "status" },
      ],
      myshift: [],
    };
  },
  methods: {
    savechanges(){
      let id = this.$route.params.id;
      let data = {
        name: this.shiftName,
        location: this.countryName,
        people: this.people
      }
      updateShift(id, data).then(()=>{
        this.GetmyShift()
      })
    },
    async GetmyShift() {
      this.filteredId = this.$route.params.id;
      //console.log(this.filteredId)
      if (this.filteredId) {
        await getShifts(this.filteredId).then((response) => {
          console.log(response)
          this.myshift = response.employee.map(i => {
            return {
              name: i.employee_name,
              email: i.employee_email,
              grade: i.employee_grade,
              location: i.employee_location,
              status: i.employee_status,
            }
          })
          const shift = response.shift.map(i => {
            return {
              name: i.shift_name,
              country: i.country,
            }
          })
          this.shiftName = shift[0].name;
          this.countryName = shift[0].country;
        })
      }
    },
    getAllUsers() {
      getAllEmployees1().then((response) => {
        console.log(response.data);
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
    this.getAllUsers()
    this.filteredId = this.$route.params.id;
  },

  // methods: {
  //     getDetails() {
  //         getCompanyInfos().then((response) => {
  //             const data = response.found; // assuming only one record is returned

  //             this.companyName = data.company_name;
  //             this.industry = data.industry;
  //             this.constatName = data.contact_person_full_name;
  //             this.contactEmail = data.contact_person_email;
  //             this.countryCode = data.contact_person_phone.substring(0, 4);
  //             this.contactPhone = data.contact_person_phone.substring(4);
  //             this.billingCountry = data.company_location;
  //             this.billingAdress1 = data.billing_address_line_1;
  //             this.billingAdress2 = data.billing_address_line_2;
  //             this.billingState = data.company_location;
  //             this.billingCity = data.billing_city;
  //             this.billingPost = data.billing_post_code;
  //         });
  //     },
  //     getCountriesApi() {
  //         axios
  //             .get("https://restcountries.com/v2/all")
  //             .then((response) => {
  //                 this.countries = response.data.map((c) => {
  //                     const code = "+" + c.callingCodes[0];
  //                     return { name: c.name, dial_code: code };
  //                 });
  //             })
  //             .catch((error) => {
  //                 console.log(error);
  //             });
  //     },
  // },

  // mounted() {
  //     this.getDetails();
  //     this.getCountriesApi();
  // },
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
  flex-basis: 50%;
  margin: 1rem;
}

.account {
  border: 1px solid #ccc;
}

.contact {
  border: 1px solid #ccc;
}

table {
  table-layout: fixed;
  width: 100%;
}

.second-box td {
  width: 25%;
}

.page-container {
  background-color: #f0f3f4;
  /* Set the background color */
  color: #333;
  /* Set the text color */
}

/* Style the top bar */
.v-toolbar {
  background-color: blue;
  color: white;
}

.second-box {
  flex-basis: 50%;
  border: 1px solid #ccc;
  margin: 1rem;
  padding-bottom: 1rem;
}
</style>
