<template>
  <div>
    <v-card height="850">
      <div class="page">
        <div class="first-box">
          <div class="account" height="300">
            <v-card-title>Account Information</v-card-title>
            <v-card-text>
              <v-col lg="9">
                <v-row>
                  <v-col>
                    <v-form>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="*Company Name"
                            required
                            outlined
                            dense
                            v-model="companyName"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="*Industry"
                            outlined
                            dense
                            v-model="industry"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="*Domain"
                            outlined
                            dense
                            v-model="domaine"
                          ></v-text-field>
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
            <v-card-title>Contact person</v-card-title>
            <v-card-text>
              <v-col lg="9">
                <v-row>
                  <v-col>
                    <v-form>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="*Full Name"
                            required
                            outlined
                            dense
                            v-model="constatName"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field
                            label="*Email"
                            outlined
                            dense
                            v-model="contactEmail"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="5">
                          <v-select
                            label="*Code"
                            :items="countries"
                            item-text="dial_code"
                            required
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                            v-model="countryCode"
                            :value="countryCode"
                          />
                        </v-col>
                        <v-col cols="12" sm="7">
                          <v-text-field
                            label="*Phone Number"
                            outlined
                            dense
                            autocomplete="false"
                            v-model="contactPhone"
                          />
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
              <v-btn @click="saveChange" type="submit" color="primary"
                >Save changes</v-btn
              >
            </v-col>
          </v-row>
        </div>
        <div class="second-box">
          <v-card-title>Billing Address</v-card-title>
          <v-card-text>
            <v-col lg="9">
              <v-row>
                <v-col>
                  <v-form>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="*Country"
                          required
                          outlined
                          dense
                          v-model="billingCountry"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="*City"
                          outlined
                          dense
                          v-model="billingCity"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="*Address Line 1"
                          outlined
                          dense
                          v-model="billingAdress1"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Address Line 2"
                          outlined
                          dense
                          v-model="billingAdress2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Post Code"
                          outlined
                          dense
                          v-model="billingPost"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
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
import { getCompanyInfos, updateCompany } from "@/services/companyService";
import axios from "axios";
export default {
  data() {
    return {
      details: [],
      countries: [],
      companyName: "",
      industry: "",
      constatName: "",
      contactEmail: "",
      countryCode: "",
      contactPhone: "",
      billingCountry: "",
      billingAdress1: "",
      billingAdress2: "",
      domaine: "",
      billingCity: "",
      billingPost: "",
      company_id: "",
    };
  },

  methods: {
    saveChange() {
      let id = this.company_id;
      let data = {
        company_name: this.companyName,
        industry: this.industry,
        contact_person_full_name: this.constatName,
        contact_person_email: this.contactEmail,
        contact_person_phone: this.countryCode + this.contactPhone,
        company_location: this.billingCountry,
        company_addres_line_1: this.billingAdress1,
        company_addres_line_2: this.billingAdress2,
        company_domaine: this.domaine,
        company_city: this.billingCity,
        company_post_code: this.billingPost,
      };
      updateCompany(id, data);
      this.getDetails();
    },
    getDetails() {
      getCompanyInfos().then((response) => {
        const data = response.found; // assuming only one record is returned
        console.log(data);
        this.companyName = data.company_name;
        this.industry = data.industry;
        this.constatName = data.contact_person_full_name;
        this.contactEmail = data.contact_person_email;
        this.countryCode = data.contact_person_phone.substring(0, 4);
        this.contactPhone = data.contact_person_phone.substring(4);
        this.billingCountry = data.company_location;
        this.billingAdress1 = data.company_addres_line_1;
        this.billingAdress2 = data.company_addres_line_2;
        this.domaine = data.company_domaine;
        this.billingCity = data.company_city;
        this.billingPost = data.company_post_code;
        this.company_id = data.id;

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
  },

  mounted() {
    this.getDetails();
    this.getCountriesApi();
  },
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

.second-box {
  flex-basis: 50%;
  border: 1px solid #ccc;
  margin: 1rem;
  padding-bottom: 12rem;
}
</style>
