<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-img
      height="100"
      class="pa-4"
      src="https://qbot.com.tr/web/image/3930-2504c714/qdisco_slogan_2.png"
    >
    </v-img>
    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text] in link" :key="icon" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title link>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          router
          :to="child.route"
          link
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      drawer: true,
      link: [["mdi-monitor-dashboard", "Dashboard"]],
      items: [
        {
          action: "mdi-magnify",
          items: [
            { title: "Users and Groups", route: "/usersgroups" },
            { title: "Productivity", route: "/productivity" },
            { title: "Working Hours", route: "/workinghours" },
            { title: "Top Websites", route: "/topwebsites" },
            { title: "Top Apps", route: "/topapps" },
            { title: "Top Categories", route: "/topcategories" },
            { title: "Activities Log", route: "/activitieslog" },
          ],
          title: "Qtrack",
        },
        {
          action: "mdi-eye-settings-outline",
          items: [{ title: "List Item" }],
          title: "Qwatch",
        },
        {
          action: "mdi-share",
          items: [{ title: "List Item" }],
          title: "Qsense",
        },
      ],
    };
  },
};
</script>
