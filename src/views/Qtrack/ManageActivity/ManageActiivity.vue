<template>
  <div>
    <div>
      <v-row>
        <v-col>
          <!-- Search bar -->
          <v-text-field label="Search Productive activities.." single-line filled clearable clear-icon="mdi-close"
            append-icon="mdi-magnify" v-model="mainSearch"></v-text-field>

          <!-- Card -->
          <v-card>
            <v-card-subtitle class="card-subtitle-line-prod">
              <div class="activity-info">
                <div>Productive Activities</div>
                <div>Total:{{ total }}</div>
              </div>
            </v-card-subtitle>
            <div>
              <v-data-table :headers="headers" :items="activityprod" :pagination.sync="pagination"
                :items-per-page="pagination.itemsPerPage" hide-default-footer height="530" :loading="loader"
                loading-text="Loading...">
                <template #item="{ item , index }">
                  <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
                    <td class="border-cell">{{ item.Activity }}</td>
                    <td class="border-cell">{{ item.rule }}</td>
                    <td class="border-cell">{{ item.usage }}</td>
                    <td class="border-cell">{{ item.time }}</td>
        
                    <td class="border-cell">       <router-link v-bind:style="{ textDecoration: 'none' }"
                      :to="{ name: 'productiveallowed', params: { id: item.id } }">
                      <v-icon @click="handleRowClick(item.id, item.Activity)">mdi-eye-settings-outline</v-icon>
                    </router-link>
                  </td>
        
                  </tr>
               </template>
                <!-- table content goes here -->
                <template v-slot:[`item.searchid`]="{ item }">
                  <router-link v-bind:style="{ textDecoration: 'none' }"
                    :to="{ name: 'productiveallowed', params: { id: item.id } }">
                    <v-icon @click="handleRowClick(item.id, item.Activity)">mdi-eye-settings-outline</v-icon>
                  </router-link>
                </template>
              </v-data-table>
              <v-pagination :length="totalDisplayedPages" v-model="pagination.page" :total-items="totalItems"
                :items-per-page="pagination.itemsPerPage" @update:pagination="(val) => (pagination.page = val)"
                show-arrows small>
                <template v-slot:prevIcon>
                  <v-icon>mdi-chevron-left</v-icon>
                </template>
                <template v-slot:nextIcon>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
                <template v-slot:after="props">
                  <span v-if="
                    props.page < totalPages - 3 && totalDisplayedPages > 5
                  ">...</span>
                  <span v-else-if="props.page >= totalPages - 3 && totalPages > 5" class="ellipsis">...</span>
                </template>
              </v-pagination>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <!-- Search bar -->
          <v-text-field label="Search Distracting activities.." single-line filled clearable clear-icon="mdi-close"
            append-icon="mdi-magnify" v-model="mainSearch2"></v-text-field>

          <v-card>
            <v-card-subtitle class="card-subtitle-line">
              <div class="activity-info">
                <div>Distracting Activities</div>
                <div>Total:{{ total2 }}</div>
              </div>
            </v-card-subtitle>
            <div>
              <v-data-table :headers="headers1" :items="activitynonprod" :pagination.sync="pagination2"
                :items-per-page="pagination2.itemsPerPage" hide-default-footer height="530" :loading="loader"
                loading-text="Loading...">
                <template #item="{ item , index }">
                  <tr @click="onRowClicks(item, index)" :class="{ 'selected-row': selectedRowIndexs === index }">      
                    <td class="border-cell">{{ item.Activity }}</td>
                    <td class="border-cell">{{ item.rule }}</td>
                    <td class="border-cell">{{ item.usage }}</td>
                    <td class="border-cell">{{ item.time }}</td>
        
                    <td class="border-cell">       <router-link v-bind:style="{ textDecoration: 'none' }"
                      :to="{ name: 'productiveallowed', params: { id: item.id } }">
                      <v-icon @click="handleRowClick(item.id, item.Activity)">mdi-eye-settings-outline</v-icon>
                    </router-link>
                  </td>
        
                  </tr>
               </template>
                <!-- table content goes here -->
                <template v-slot:[`item.searchid`]="{ item }">
                  <router-link v-bind:style="{ textDecoration: 'none' }"
                    :to="{ name: 'productiveallowed', params: { id: item.id } }">
                    <v-icon @click="handleRowClick(item.id, item.Activity)">mdi-eye-settings-outline</v-icon>
                  </router-link>
                </template>
              </v-data-table>

              <v-pagination :length="totalDisplayedPages2" v-model="pagination2.page" :total-items="totalItems"
                :items-per-page="pagination2.itemsPerPage" @update:pagination="(val) => (pagination2.page = val)"
                show-arrows small>
                <template v-slot:prevIcon>
                  <v-icon>mdi-chevron-left</v-icon>
                </template>
                <template v-slot:nextIcon>
                  <v-icon>mdi-chevron-right</v-icon>
                </template>
                <template v-slot:after="props">
                  <span v-if="
                    props.page < totalPages - 3 && totalDisplayedPages > 5
                  ">...</span>
                  <span v-else-if="props.page >= totalPages - 3 && totalPages > 5" class="ellipsis">...</span>
                </template>
              </v-pagination>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import {
  getManageNonProdFilter,
  getManageProdFilter,
} from "../../../services/activityService";
import { secondToHour } from "../../../services/secondToHour";
import store from "@/store";

export default {
  name: "ManageActivity",
  components: {},
  data() {
    return {
      mainSearch: undefined,
      mainSearch2: undefined,
      loader: true,
      total: 0,
      total2: 0,
      pagination: {
        page: 1,
        itemsPerPage: 10,
      },
      pagination2: {
        page: 1,
        itemsPerPage: 10,
      },
      dataParams: [],
      dataParams2: [],
      selectedRowIndex: 0,
      selectedRowIndexs: 0,

      headers: [
        { text: "Activity name", value: "Activity" },
        { text: "Rule", value: "rule" },
        { text: "Used By", value: "usage" },
        { text: "Time spent", value: "time" },
        { text: "", value: "searchid" },
      ],
      items: [],
      headers1: [
        { text: "Activity name", value: "Activity" },
        { text: "Used By", value: "usage" },
        { text: "Time spent", value: "time" },
        { text: "", value: "searchid" },
      ],
      activityprod: [],
      activitynonprod: [],
    };
  },
  methods: {
    onRowClick(item, index) {
      this.selectedRowIndex = index;

    },
    onRowClicks(item, index) {
      this.selectedRowIndexs = index;

    },
    getmanage(data) {
      getManageProdFilter(data).then((response) => {
        //console.log("ici", response);
        this.total = response.total;
        // console.log("mytotal", this.total)
        this.activityprod = response.data.map((item) => {
          return {
            Activity: item.activity_name,
            rule: item.rules,
            usage: item.users,
            time: secondToHour(item.total_duration),
            id: item.id,
            prod: item.total_duration,
          };
        });
        this.loader = false;
      });
    },

    getmanage2(data) {
      getManageNonProdFilter(data).then((response) => {
        console.log(response);
        this.total2 = response.total;
        this.activitynonprod = response.data.map((item) => {
          return {
            Activity: item.activity_name,
            usage: item.users,
            time: secondToHour(item.total_duration),
            id: item.id,
            nonprod: item.total_duration,
          };
        });
        this.loader = false;
      });
    },

    handleRowClick(id, activityname) {
      store.commit("setId", id);
      store.commit("setActivityname", activityname);
    },
    state: {
      id: null,
      activityname: null,
    },
    mutations: {
      setId(state, id) {
        state.id = id;
      },
      setActivityname(state, activityname) {
        state.activityname = activityname;
      },
    },
  },
  watch: {
    pagination: {
      immediate: true,
      handler() {
        let data = {
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          search: this.mainSearch,
        };
        this.getmanage(data);
      },
      deep: true,
    },
    pagination2: {
      immediate: true,
      handler() {
        let data2 = {
          page: this.pagination2.page,
          itemsPerPage: this.pagination2.itemsPerPage,
          search: this.mainSearch2,
        };
        this.getmanage2(data2);
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
          this.getmanage(data);
          this.dataParams = data;
        }
      },
    },
    mainSearch2: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data2 = {
            page: this.pagination2.page,
            itemsPerPage: this.pagination2.itemsPerPage,
            search: this.mainSearch2,
          };
          //console.log(data)
          this.getmanage2(data2);
          this.dataParams2 = data2;
        }
      },
    },
  },

  computed: {
    totalItems() {
      return this.total;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pagination.itemsPerPage);
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

    totalItems2() {
      return this.total2;
    },
    totalPages2() {
      return Math.ceil(this.totalItems2 / this.pagination2.itemsPerPage);
    },

    totalDisplayedPages2() {
      if (this.totalPages2 <= 5) {
        return this.totalPages2;
      } else if (this.pagination2.page <= 3) {
        return 5;
      } else if (this.pagination2.page >= this.totalPages2 - 1) {
        return this.totalPages2;
      } else {
        return this.pagination2.page + 1;
      }
    },
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
.card-subtitle-line-prod {
  border-bottom: 1px solid #00c853;
}

.card-subtitle-line {
  border-bottom: 1px solid #ac1414;
}

.lchart {
  height: 100%;
  width: 100%;
}

.activity-info {
  display: flex;
  justify-content: space-between;
}
</style>
