<template>
  <v-navigation-drawer  style="position:fixed; top:0; left:0; overflow-y:hidden;" v-model="$store.state.sidebarOpen" app class="myprimary overflow-hidden custom-scrollbar " hide-overlay stateless>
    <v-img class="logo img-fluid" src="../assets/bottrack.png"> </v-img>
    <!-- <v-divider></v-divider> -->
    <!-- <div class="expand-toggle">
      <v-btn icon fab x-small @click="$store.state.sidebarOpen" class="primary">
        <v-icon color="white">{{isMini ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'}}</v-icon>
      </v-btn>
    </div> -->

    <div style="overflow-y: hidden;" class="mt-0 color-cust overflow-hidden  custom-scrollbar">
      <v-list-item v-for="ok in filteredItems.allowedlink" :key="ok.title" router :to="ok.route">
        <v-list-item-icon class="mr-2">
          <v-icon color="#ABB2BF">{{ ok.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>

          <v-list-item-title class="color-cust" >{{ ok.title }}</v-list-item-title>

        </v-list-item-content>
      </v-list-item>
      <v-list-group v-for="item in filteredItems.allowedItems"  :key="item.title" v-model="item.active" color="primary" class="custom-list-group white--text">
        <template #appendIcon>
          <v-icon color="secondary">keyboard_arrow_down</v-icon>
        </template>
        <template v-slot:activator>
          <v-list-item-icon class="mr-2 secondary--text">
            <v-icon color="#ABB2BF">{{ item.action }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content >
            <v-list-item-title class="color-cust secondary--text" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item  v-for="child in item.items" :key="child.title" router :to="child.route">
          <v-list-item-content>
            <v-list-item-title class="ml-16 color-cust" v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item v-for="[icon, text] in download" :key="icon" link router :to="route">
        <v-list-item-icon class="mr-2">
          <v-icon class="color-cust" color="#ABB2BF">{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="color-cust">{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-navigation-drawer>
</template>
<script>
import { getAllPermission } from '@/services/permissionService';
import store from "@/store";
export default {
  name: "SideBar",
  data() {
    return {
      drawer: false,
      link: [["mdi-monitor-dashboard", "Company Activities", "/company"], ["mdi-monitor-dashboard", "Dashboard", "/dashboard"]],
      oks: [{
        title: "Company Activities", route: "/company", icon: "mdi-monitor-dashboard",
      }
        ,
      {
        title: "Dashboard", route: "/dashboard", icon: "mdi-monitor-dashboard",
      }

      ],
      download: [["mdi-download", "Download Agent"]],
      permission: [],


      items: [

        {
          action: "mdi-magnify",
          active: false,
          allowedlink: [],
          items: [
            { title: "Users and Groups", route: "/topusers" },
            { title: "Productivity", route: "/productivity" },
            { title: "Working Hours", route: "/workinghuours" },
            { title: "Top Websites", route: "/topwebs" },
            { title: "Top Apps", route: "/topapps" },
            { title: "Top Categories", route: "/category" },
            { title: "Activities Log", route: "/logfile" },
            { title: "Manage Activies", route: "/manageactivity" },
            { title: "Pending Requests", route: "/pendingrequest" },
            { title: "Approved Requests", route: "/approuvedrequest" },
            { title: "Denied Requests", route: "/deniedrequest" },
            { title: "Working Calendar", route: "/workingcalendar" },
            { title: "activities count", route: "/activitiescount" },
            { title: "Staff", route: "/staff" },
            { title: "Task", route: "/task" },

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
        {
          action: "mdi-wrench",
          items: [
            { title: "Category", route: "/categorysettinng" },
            { title: "WQ Score", route: "/WorkQuality" },
            { title: "Account Details", route: "/accountdetails" },
          ],
          title: "Settings",
        },
      ],
    };
  },
  methods: {
    Getpermission() {
      getAllPermission().then((response) => {
        let data = response.data

        this.permission = data.map((item) => {
          return {
            permission: item.permission_name,
            roles_allowed: item.roles_allowed
          }
        })
        // this.linkname = []
        // for (let i = 0; i < this.link.length; i++) {
        //   this.linkname.push(this.link[i][1])
        // }
        // this.allowedlink = [];
        // for (let i = 0; i < this.permission.length; i++) {
        //   let perm = this.permission[i];
        //   if (this.linkname.includes(perm.permission)) {
        //     if (perm.roles_allowed.includes(this.userRole)) {
        //       this.allowedlink.push(perm.permission);

        //     }
        //   }
        // }



      })
    },
    isAllowedchild(child) {
      for (let i = 0; i < this.permission.length; i++) {
        let perm = this.permission[i];

        if (perm.permission === child.title && perm.roles_allowed.includes(this.userRole)) {
          return true;
        }
      }

      return false;
    },
    isAllowedlink(link) {
      for (let i = 0; i < this.permission.length; i++) {
        let perm = this.permission[i];

        if (perm.permission === link.title && perm.roles_allowed.includes(this.userRole)) {
          return true;
        }
      }

      return false;
    },

    // isAllowedlink(name) {
    //   return this.allowedlink.includes(name);
    // },
    isAlloweditem(item) {
      for (let i = 0; i < this.permission.length; i++) {
        let perm = this.permission[i];

        if (perm.permission === item.title && perm.roles_allowed.includes(this.userRole)) {
          return true;
        }
      }

      return false;
    },

  },

  mounted() {
    this.Getpermission()
  },
  computed: {
    userRole() {
      return store.state.userRole;
    },
    filteredItems() {
      let allowedItems = [];
      let allowedlink = [];

      for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i];

        // If the user is allowed to access this menu item, add it to the `allowedItems` array.
        if (this.isAlloweditem(item)) {
          // Filter the child items as well.
          let allowedChildren = [];
          for (let j = 0; j < item.items.length; j++) {
            let child = item.items[j];
            if (this.isAllowedchild(child)) {
              allowedChildren.push(child);
            }
          }

          // Add the parent item with filtered children to the `allowedItems` array.
          allowedItems.push({ ...item, items: allowedChildren });
        }
      }
      for (let i = 0; i < this.oks.length; i++) {
        let itemok = this.oks[i];
        if (this.isAllowedlink(itemok)) {
          allowedlink.push(itemok)
        }
      }


      return { allowedItems, allowedlink };
    },
    filteredlink() {
      let allowedItems = [];

      // Filter the top-level links first.
      for (let i = 0; i < this.oks.length; i++) {
        let lin = this.oks[i];

        // Check if the user is allowed to access the link based on the link's route.
        if (this.allowedlink.includes(lin.title)) {
          allowedItems.push(lin);
        }
      }

      return allowedItems;
    },
    // filteredItems() { 
    //   let allowedItems = [];

    //   for (let i = 0; i < this.items.length; i++) {
    //     let item = this.items[i];

    //     // If the user is allowed to access this menu item, add it to the `allowedItems` array.
    //     if (this.isAlloweditem(item)) {
    //       allowedItems.push(item);

    //     }


    //   }

    //   return allowedItems;
    // },
  }
};

</script>



<style scoped>
::v-deep ::-webkit-scrollbar {
  width: 0;
  background: transparent
}
.v-list-group__header__prepend-icon {
  /* Appliquez ici votre style pour changer la couleur de la flèche */
  color: white; /* Par exemple, changez la couleur en bleu */
}
.v-navigation-drawer__content::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px #5d5d5d;
  background-color: #5d5d5d;
}
.v-navigation-drawer__content::-webkit-scrollbar{
  width: 0px;
}
.v-navigation-drawer__content::-webkit-scrollbar-thumb{
  -webkit-box-shadow: inset 0 0 6px #424242;
  background-color: #424242;
}
@media (max-width: 1400px){
  .v-list-item__title {
    align-self: center;
    font-size: 14px;
    font-family: "Segoe UI", Arial, sans-serif;

}
}
.icon-cust{
  position: relative;
  top: 5px;
  left: 265px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: #03dac5;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,.2), 0px 4px 5px 0px rgba(0,0,0,.14), 0px 1px 10px 0px rgba(0,0,0,.12);}
.v-list-item__icon:first-child {
  margin-right: 10px;
}
.v-application .grey.darken-4 {
  background-color: #212121!important;
  border-color: #212121!important;
}
.color-cust{
  color: #AAB2C0
}
.v-navigation-drawer__content{
  overflow-y: hidden !important;
  }

.custom-scrollbar {
  overflow-y: hidden; /* Masque la barre de défilement verticale */
  overflow-x: hidden; /* Masque la barre de défilement verticale */

  scrollbar-width: none; /* Masque la barre de défilement non standard pour Firefox */
  -ms-overflow-style: none; /* Masque la barre de défilement non standard pour Edge */
}
.active_list .v-list-group .v-list-item--active {
  color: #f4f4f4 !important;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 0; /* Masque la barre de défilement pour Chrome, Safari et Opera */
}
.logo {
 padding: 2rem;
  margin-top: 1rem;
  height: 122px;
}
</style>