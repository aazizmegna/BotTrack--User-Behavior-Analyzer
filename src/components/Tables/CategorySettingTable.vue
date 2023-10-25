<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      :single-select="singleSelect"
      item-key="id"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-switch
          v-model="singleSelect"
          label="Single select"
          class="pa-3"
        ></v-switch>
        <v-toolbar dense flat>
          <v-btn @click="showForm = true" color="success"
            >+ Add New Category</v-btn
          >
          <v-spacer></v-spacer>

          <v-btn @click="deleteSelected" color="error" disabled>Delete Selected</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-dialog v-model="showForm" width="500">
        <v-card>
          <v-card-title class="text-h5 lighten-2">
            Add a Category
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-text-field
                label="Category name"
                v-model="newCategoryName"
                outline
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="addCategory"> Add </v-btn>
            <v-btn color="red" text @click="showForm = false"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import {
  createCategory,
  deleteCategories,
  getAllCategoriesSetting,
} from "../../services/categoryService";
export default {
  data() {
    return {
      showForm: false,
      singleSelect: false,
      selected: [],
      selectedIds: [],
      newCategoryName: "",
      headers: [
        {
          text: "Categories",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Websites", value: "Websites" },
        { text: "Apps", value: "Apps" },
      ],
      desserts: [],
    };
  },
  methods: {
    getdata() {
      getAllCategoriesSetting().then((response) => {
        let rep = response.data;
        //console.log(rep)
        this.desserts = rep.map((t) => {
          return {
            id: t.category_id,
            name: t.category_name,
            Websites: t.web_number,
            Apps: t.app_number,
          };
        });
      });
    },

    deleteSelected() {
      this.selectedIds = this.selected.map((i) => i.id);

      const data = {
        ids: this.selectedIds,
      };
      console.log(data);
      deleteCategories(data);
      this.getdata();
    },

    addCategory() {
      const data = {
        category_name: this.newCategoryName,
      };
      createCategory(data).then((response) => {
        console.log(response);
        this.getdata();
      });
      this.newCategoryName = "";
      this.showForm = false;
    },
  },
  mounted() {
    this.getdata();
  },
};
</script>
