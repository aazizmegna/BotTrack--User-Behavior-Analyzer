<template>
  <div>
    <v-row>
      <v-col xl="4">
        <v-card>
          <v-card-title>
            {{ title }}
            <!-- <v-spacer></v-spacer> -->
            <v-text-field
              v-model="mainSearch"
              append-icon="mdi-magnify"
              label="Search App"
              single-line
              hide-details
              class="m-0 p-0 border"
            ></v-text-field>
          </v-card-title>
          <v-data-table 
          :headers="headers" 
          :items="categories"
           height="500"
            :loading="loader"
            loading-text="Loading..." 
            :pagination.sync="pagination"
             :items-per-page="pagination.itemsPerPage"
            hide-default-footer
            class="thead-light">
            <template #header="{ props }">
              <v-data-table-header
                :options="props.options"
                :props="props"
                class="custom-header"
              >
            </v-data-table-header>
            </template>
            <template #item="{ item , index }">
              <tr @click="onRowClick(item, index)" :class="{ 'selected-row': selectedRowIndex === index }">      
                <td class="border-cell">{{ item.category }}</td>
                <td class="border-cell">{{ item.duration }}</td>
                <td class="border-cell">{{ item.percentage }}</td>
  
              </tr>
           </template>
          </v-data-table>
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
      <v-col>
        <div class="d-flex justify-space-between mt-10 text-h5 ">
          <div
            class="ma-2 pa-2"
          >
          {{ clickedItemName }}
          </div>
          <div
          class="ma-2 pa-2"
        >
        -
        </div>
        <div
        class="ma-2 pa-2"
      >
      {{ clickedItemDuration }}
      </div>
        </div>
        <v-card    
        class="mt-1"
        >

  
          <v-card-title>
            <!-- {{ clickedItemName }} -->
            <v-spacer></v-spacer>
            <v-text-field v-model="subSearch" append-icon="mdi-magnify" label="Search Category" single-line
              hide-details class="m-0 p-0 border"></v-text-field>
          </v-card-title>
          <v-data-table :headers="subheaders" :items="subitems" :search="subSearch" height="435"
            hide-default-footer></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import store from "@/store";
//import { secondToHour } from "../../services/secondToHour";
import { getTopAppFilter, getTopAppFilterTitle } from "@/services/activityService";
import { secondToHour } from "@/services/secondToHour";

export default {
  name: "CategoriesTable",
  data() {
    return {
      todayDate: [
        new Date().toISOString().slice(0, 10),
        new Date().toISOString().slice(0, 10),
      ],
      mainSearch: undefined,
      srch: false,
      subSearch: "",
      subitems: [],
      clickedItemName: "",
      clickedItemDuration: "",
      selectedRowIndex: null,

      clickedCatId: null,
      loader: true,
      title: "",
      search: "",

      dataDate: {},
      pagination: {
        page: 1,
        itemsPerPage: 10,
      },
      filteredLogs: [],
      totalActivities: 0,
      headers: [
        {
          text: "App",
          align: "center",
          value: "category",
        },
        { text: "Duration", value: "duration" ,align: "center"},
        { text: " % ", value: "percentage",align: "center"},
      ],
      subheaders: [
        {
          text: "Title",
          align: "start",
          value: "title",
        },
        { text: "Duration", value: "duration" },
        { text: "Percentage", value: "percentage" },
      ],
      categories: [],
    };
  },
  methods: {
    onRowClick(item, index) {
      this.clickedItemName = item.category;
      this.clickedCatId = item.acrId;
      this.selectedRowIndex = index;
      this.clickedItemDuration = item.duration

      //console.log(this.dataDate)
      this.getSubApp(this.dataDate);
    },
    async getArchival(data) {
      await getTopAppFilter(
        this.userId,
        data,
        this.pagination.page,
        this.pagination.itemsPerPage
      ).then((response) => {
        //console.log(response.data);
        const resp = response.data;
        this.today = resp.map((i) => {
          return {
            category: i.activity_name,
            duration: secondToHour(i.duration),
            percentage: i.percentage,
            acrId: i.activity_recognition_id,
          };
        });
        this.totalActivities = response.total;
        this.categories = this.today;

        this.loader = false;
      });
    },
    async getSubApp(data) {
      await getTopAppFilterTitle(this.userId, this.clickedCatId, data).then(
        (response) => {
          let resp = response.data;
          //console.log(resp);
          this.subitems = resp.map((i) => {
            return {
              title: i.title_name,
              duration: secondToHour(i.duration),
              percentage: i.percentage,
            };
          });
        }
      );
    },
  },

  computed: {
    selectedPeriod() {
      return store.state.selectedPeriod;
    },
    defaultDate() {
      return store.state.selectedDefaultDate;
    },
    dataDateDefault() {
      return this.defaultDate ? this.defaultDate : this.todayDate;
    },

    singleDate() {
      return store.state.selectedDate;
    },
    rangeDate() {
      return store.state.selectedDateRange;
    },

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
      return this.totalActivities;
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
  },
  
  watch: {
    pagination: {
      handler() {
        let data = {
          date: this.dataDateDefault,
        };
        this.getArchival(data);
      },
      deep: true,
    },

    categories: {
      handler() {
        this.subitems = [];
        this.clickedItemName = "";
      },
      deep: true,
    },
    userId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log(`userId changed from ${oldVal} to ${newVal}`);
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: this.dataDateDefault,
            };
            this.getArchival(data);
            this.dataDate = data;
            this.pagination.page = 1;
          }
        }
      },
    },

    defaultDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: this.dataDateDefault,
            };
            this.dataDate = { date: this.dataDateDefault };

            this.getArchival(data);
            this.pagination.page = 1;
          }
        }
      },
    },
    singleDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          //console.log(`userId changed from ${oldVal} to ${newVal}`);
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: [newVal, newVal],
            };
            this.dataDate = { date: [newVal, newVal] };

            this.getArchival(data);
            this.pagination.page = 1;
          }
        }
      },
    },
    rangeDate: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal !== undefined && newVal !== null) {
            let data = {
              date: newVal,
            }; 
        this.dataDate = { date: newVal };

            this.getArchival(data);
            this.pagination.page = 1;
          }
        }
      },
    },

    mainSearch: {
      handler: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          let data = {
            date: this.dataDate.date,
            search: this.mainSearch,
          };
          //console.log(data)
          this.getArchival(data);
          this.dataDate = data;
          this.pagination.page = 1;
        }
      },
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
  border: 1px solid gray; /* Ajoutez les styles de bordure que vous préférez */
  background-color: rgb(216, 209, 209) !important; 
  padding: 8px; /* Ajoutez le rembourrage que vous préférez */
}
.category-cell {
  max-height: 1px;
  max-width: 120px; /* Ajustez la largeur maximale de la première colonne */
  overflow: hidden; /* Pour empêcher le contenu de déborder */
  white-space: nowrap; /* Empêcher le contenu de se retourner à la ligne */
  text-overflow: ellipsis; /* Utilisez des points de suspension si le contenu est tronqué */
}
.border-cell {
  padding:0px; /* Ajustez le rembourrage pour contrôler l'espace interne */
  max-width: 100px;
  max-height: 100px; /* Ajustez la largeur maximale des cellules */
   /* Ajustez la largeur maximale des cellules */
  overflow: hidden; /* Pour empêcher le contenu de déborder */
  white-space: nowrap; /* Empêcher le contenu de se retourner à la ligne */
  text-overflow: ellipsis; /* Si le contenu dépasse, utilisez des points de suspension */
}
.selected-row {
  background-color: #626c75 !important;
  color: #fff !important;}

/* width */
::v-deep ::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* Track */
::v-deep ::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::v-deep ::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}

.pointer-cursor {
  cursor: pointer;
}

.my-table {
  overflow-y: scroll;
  height: 500px;
}
</style>
