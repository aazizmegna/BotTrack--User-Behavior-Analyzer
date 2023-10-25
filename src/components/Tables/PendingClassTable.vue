<template>
  <v-simple-table fixed-header height="390px" :loading="loader" loading-text="Loading..." v-if="classes.length > 0">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Category</th>
          <th class="text-left">Duration</th>
        </tr>
      </thead>
      <tbody>
        <template>
          <tr v-for="item in classes" :key="item.name" :class="{ 'pointer-cursor': true }">
            <td>{{ item.name }}</td>
            <td>
              <v-form ref="form">
                <v-select label="Select category" :items="categories" item-text="name"
                  v-model="selectedCategory[item.arId]" @change="updateActivityCategory(item, selectedCategory[item.arId])
                  " item-value="id" required></v-select>
              </v-form>
            </td>
            <td>{{ item.duration }}</td>
          </tr>
        </template>
      </tbody>
    </template>
  </v-simple-table>
  <v-card v-else height="390px">
    <v-row justify="center" align="center">
      <v-col lg="6" cols="6" class="text-center">
        <v-icon x-large color="grey">mdi-emoticon-happy-outline</v-icon>
        <div class="text-h5 mt-4">Great job!
          There are no more pending Classifications.</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {
  updateActivityCategory,
} from "../../services/activityService";
import { getAllCategories } from "../../services/categoryService";
export default {
  name: "PendingClassTable",
  props: {
    selectedPeriod: String,
    classes:[]
  },
  data() {
    return {
      categories: [],
      loader: true,
      selectedCategory: {},
    };
  },
  methods: {
    async getAllCategories() {
      await getAllCategories().then((response) => {
        //console.log(response);
        this.categories = response.data.map((c) => {
          return { name: c.category_name, id: c.id };
        });
      });
    },

    async updateActivityCategory(item, category) {
      try {
        await updateActivityCategory(item.arId, item.category_id, category);
        console.log("update done!!!!!!");
        this.$emit('refresh-table');
        //this.getPending();
      } catch (error) {
        console.error(error);
      }
    },

  },
  async mounted() {
    await this.getAllCategories();
  },
};
</script>

<style>
.pointer-cursor {
  cursor: pointer;
}
</style>
