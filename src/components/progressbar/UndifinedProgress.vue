<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-card min-height="400">
          <v-card-title class="title card-subtitle-line-unpro">undefined</v-card-title>
          <div v-for="item in UndifinedProgress.slice(0, 4)" :key="item.title">
            <v-card-text>
              <div>
                <div class="item">
                  <div class="icon">
                    <v-btn icon @click="showSubitems(item)"><v-icon>mdi-expand-all</v-icon></v-btn>
                    {{ item.title }}
                  </div>
                  <div class="time">
                    {{ item.time }}
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" icon @click="dialog = true"><v-icon
                            color="#afa7a7">mdi-wrench</v-icon></v-btn>
                      </template>
                      <span>define it </span>
                    </v-tooltip>
                  </div>
                </div>
                <v-progress-linear v-model="item.percent" color="#afa7a7" stream></v-progress-linear>
              </div>
            </v-card-text>
          </div>
          <v-expand-transition>
            <div v-if="expandedUn">
              <div v-for="item in UndifinedProgress.slice(4)" :key="item.title">
                <v-card-text>
                  <div>
                    <div class="item">
                      <div class="icon">
                        <v-btn icon @click="showSubitems(item)"><v-icon>mdi-expand-all</v-icon></v-btn>
                        {{ item.title }}
                      </div>
                      <div class="time">
                        {{ item.time }}
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn text v-on="on" icon @click="dialog = true"><v-icon
                                color="#afa7a7">mdi-wrench</v-icon></v-btn>
                          </template>
                          <span>define it </span>
                        </v-tooltip>
                      </div>
                    </div>
                    <v-progress-linear v-model="item.percent" color="#afa7a7" stream></v-progress-linear>
                  </div>
                </v-card-text>
              </div>
            </div>
          </v-expand-transition>
          <div class="moreless">
            <span @click="expandedUn = !expandedUn" v-if="!expandedUn" :class="{ 'pointer-cursor': true }">Show
              more</span>
            <span @click="expandedUn = !expandedUn" v-if="expandedUn" :class="{ 'pointer-cursor': true }">Show
              less</span>
          </div>
        </v-card>
        <v-dialog v-model="dialog" max-width="600px" full-width>
          <v-card>
            <v-card-title>Define</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-select label="Select category" :items="categories" item-text="name" required></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submitForm">Save</v-btn>
              <v-btn color="secondary" @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="showDialog" width="500px">
          <v-card>
            <v-card-title v-if="selectedItem">
              {{ selectedItem.title }}
            </v-card-title>
            <v-card-text v-if="selectedItem">
              <div v-for="subitem in selectedItem.subTasks" :key="subitem.title">

                <div class="item">
                  <div class="icon">
                    <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                  </div>
                  <div class="time">
                    <v-list-item-subtitle>{{
                      subitem.time
                    }}</v-list-item-subtitle>
                  </div>
                </div>
                <v-progress-linear v-model="subitem.percent" color="#afa7a7" stream></v-progress-linear>
                <div class="text-center mt-2">{{ subitem.percent }}%</div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="closeDialog">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-app>
  </div>
</template>
<script>
import Vue from "vue";
import Vuetify from "vuetify";
import { getAllCategories } from "../../services/categoryService";

Vue.use(Vuetify);
export default {
  name: "UndifinedProgress",
  props: ["UndifinedProgress"],
  data() {
    return {
      showDialog: false,
      selectedItem: null,
      dialog: false,
      expandedUn: false,
      valid: false,
      name: "",
      email: "",
      message: "",
      selectedRadio: "",
      categories: [],
      showDateInput: false,
      selectedDate: null,
    };
  },
  methods: {
    getAllCategories() {
      getAllCategories().then((response) => {
        //console.log(response);
        this.categories = response;
        this.categories = response.data.map((c) => {
          return { name: c.category_name };
        });
      });
    },

    submitForm() {
      if (this.$refs.form.validate()) {
        // Form is valid, do something with the form data
        this.dialog = false;
      }
    },
    showSubitems(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
  },

  mounted() {
    this.getAllCategories();
  },
};
</script>
<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-subtitle-line-unpro {
  border-bottom: 1px solid #afa7a7;
}

.moreless {
  text-align: center;
}

.item {
  display: flex;
}

.time {
  margin-left: auto;
}

.pointer-cursor {
  cursor: pointer;
}
</style>
