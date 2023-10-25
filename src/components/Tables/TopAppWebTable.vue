<template>
  <v-row>
    <v-col xl="4">
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search Category"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="displayedItems"
          :search="mainSearch"
          height="500"
          @click:row="onRowClick"
          :loading="loader"
          loading-text="Loading..."
          :pagination="pagination"
          :items-per-page="pagination.itemsPerPage"
          hide-default-footer
        ></v-data-table>
        <v-pagination
          v-model="pagination.page"
          :length="totalPages"
          @input="displayedItems"
        ></v-pagination>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          {{ clickedItemName }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="subSearch"
            append-icon="mdi-magnify"
            label="Search Category"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="subheaders"
          :items="subitems"
          :search="subSearch"
          height="540"
          hide-default-footer
        ></v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import store from "@/store";
import {
  getSubActivitywebtoday,
  getSubActivitywebyesterday,
} from "@/services/activityService";
import { secondToHour } from '@/services/secondToHour';
export default {
  name: "CategoriesTable",
  props: [
    "headers",
    "desserts",
    "subheaders",
    "title",
    "loader",
    "selectedPeriod",
  ],
  data() {
    return {
      mainSearch: "",
      subSearch: "",
      subitems: [],
      subitemsTod: [],
      subitemsYes: [],
      clickedItemName: "",
      clickedAcrId: null,

      pagination: {
        page: 1,
        itemsPerPage: 9,
      },
    };
  },

  mounted() {
    this.clickedItemName = this.desserts.website;
  },
  methods: {
    onRowClick(item) {
      this.clickedItemName = item.website;
      this.clickedAcrId = item.acrid;
      this.getSubActivity();
    },

    getSubActivity() {
      getSubActivitywebtoday(this.userId, this.clickedAcrId).then(
        (response) => {
          const resp = response.data;
          //console.log(resp);
          this.subitemsTod = resp.map((i) => {
            return {
              title: i.title_name,
              duration: secondToHour(i.duration),
              percentage: i.percentage,
            };
          });
          this.subitems = this.subitemsTod;
        }
      );
      getSubActivitywebyesterday(this.userId, this.clickedAcrId).then(
        (response) => {
          const resp = response.data;
          //console.log(resp);
          this.subitemsYes = resp.map((i) => {
            return {
              title: i.title_name,
              duration: secondToHour(i.duration),
              percentage: i.percentage,
            };
          });
        }
      );
    },
    handlePeriodChange() {
      //console.log("okokok:" + this.selectedPeriod);
      if (this.selectedPeriod === "Today") {
        this.subitems = this.subitemsTod;
      } else if (this.selectedPeriod === "Yesterday") {
        this.subitems = this.subitemsYes;
      }
    },
  },

  computed: {
    login_user_id() {
      return store.state.login_user_id;
    },
    clicked_user_id() {
      return store.state.clicked_user_id;
    },
    userId() {
      return this.clicked_user_id ? this.clicked_user_id : this.login_user_id;
    },

    totalItems() {
      return this.desserts.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pagination.itemsPerPage);
    },

    displayedItems() {
      const start = (this.pagination.page - 1) * this.pagination.itemsPerPage;
      const end = start + this.pagination.itemsPerPage;
      return this.desserts.slice(start, end);
    },
  },

  watch: {
    selectedPeriod() {
      this.handlePeriodChange();
    },
    desserts: {
      handler() {
        this.subitems = [];
        this.clickedItemName = "";
      },
      deep: true,
    },

    userId: {
      //immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log(`userId changed from ${oldVal} to ${newVal}`);
          if (newVal !== undefined && newVal !== null) {
            this.getSubActivity();
          }
        }
      },
    },
  },
};
</script>
<style scoped>
.pointer-cursor {
  cursor: pointer;
}

.my-table {
  overflow-y: scroll;
  height: 500px;
}
</style>
