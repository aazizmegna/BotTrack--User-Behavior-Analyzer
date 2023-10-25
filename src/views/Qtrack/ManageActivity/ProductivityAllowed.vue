<template>
  <div>
    <v-row>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" cols="1" sm="1">
            <v-btn class="ma-2" color="orange darken-2" dark to="/manageactivity">
              <v-icon dark left> mdi-arrow-left </v-icon>Back
            </v-btn>
          </v-col>
          <v-col class="d-flex" cols="1" sm="1" v-for="item in filteredActivityName" :key="item.name">
            <v-router to="ww.Github.com">{{ item.name }}</v-router>
          </v-col>
          <v-col class="d-flex" cols="1" sm="1"> </v-col>
          <v-col class="d-flex" cols="1" sm="1">
            <v-btn depressed color="error"> Remove All </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-subtitle class="card-subtitle-line-prod">Affected Productive</v-card-subtitle>
          <ProductiveAllowedTable />
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-subtitle class="card-subtitle-line">People</v-card-subtitle>
          <ManageProductivityPeopleTable />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ManageProductivityPeopleTable from "../../../components/Tables/manageactivitytable/ManageProductivityPeopleTable.vue";
import ProductiveAllowedTable from "../../../components/Tables/manageactivitytable/ProductiveAllowedTable.vue";
import store from "@/store";
import {
  getAllActivitymanagenonprod,
  getAllActivitymanageprod,
} from "@/services/activityService";

export default {
  components: {
    ProductiveAllowedTable,
    ManageProductivityPeopleTable,
  },

  data() {
    return {
      activityprod: [],
      activitynonprod: [],
      filteredId: null,
      filteredActivityName: null,
      filteredActivityNameProd: null,
      filteredActivityNamenonProd: null,
    };
  },
  mounted() {
    this.filteredId = this.$route.params.id;
    this.getActivityName();
  },

  computed: {
    activityname() {
      return store.state.activityname;
    },
  },

  methods: {
    getActivityName() {
      Promise.all([
        getAllActivitymanageprod().then((response) => {
          const activprod = response.data.map((item) => {
            return {
              Activity: item.activity_name,
              id: item.id,
            };
          });
          return activprod.filter((item) => {
            return item.id === this.filteredId;
          }).map((item) => {
            return {
              name: item.Activity,
            };
          });
        }),
        getAllActivitymanagenonprod().then((response) => {
          const activitynonprod = response.data.map((item) => {
            return {
              Activity: item.activity_name,
              id: item.id,
            };
          });
          return activitynonprod.filter((item) => {
            return item.id === this.filteredId;
          }).map((item) => {
            return {
              name: item.Activity,
            };
          });
        })
      ]).then(([filteredActivityNameProd, filteredActivityNamenonProd]) => {
        this.filteredActivityName = [...filteredActivityNameProd, ...filteredActivityNamenonProd];
      });
    }
  },
};
</script>
<style scoped>
.card-subtitle-line-prod {
  border-bottom: 1px solid #00c853;
}

.card-subtitle-line {
  border-bottom: 1px solid #9e9e9e;
}
</style>
