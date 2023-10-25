<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <StaffWidget />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Permission Settings</v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Rule</th>
                  <th v-for="user in users" :key="user.id">{{ user.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rule in rules" :key="rule.name">
                  <td>{{ rule.name }}</td>
                  <td v-for="user in users" :key="user.id">
                    <v-checkbox v-model="user.permissions[rule.name]"
                      :value="rule.roles_allowed.some(role => ['Admin', 'Staff'].includes(role))" :true-value="true"
                      :false-value="false" @click="clicked(rule, user)" 
                      :disabled="user.name === 'Super_admin'"/>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAllPermission, updatePermission } from '@/services/permissionService';
import StaffWidget from "../../../components/widget/StaffWidget.vue";
export default {
  components: {
    StaffWidget
  },
  data() {
    return {
      rules: [],
      users: [],
      permission_id: null,
      assignedRole: null
    };
  },
  mounted() {
    this.getPermission()
  },
  methods: {
    getPermission() {
      getAllPermission().then((response) => {
        const data = response.data;

        // Transform the permission data into an object of rules
        const rules = {};
        data.forEach((permission) => {
          rules[permission.permission_name] = {
            id: permission.id,
            name: permission.permission_name,
            roles_allowed: permission.roles_allowed,
          };
        });
        this.rules = rules;

        // Initialize the users array with a roles object for each user
        this.users = [
          {
            id: 1,
            name: "Admin",

            permissions: {},
          },
          {
            id: 2,
            name: "Super_admin",

            permissions: {},
          },
          {
            id: 3,
            name: "Staff",

            permissions: {},
          },
        ];

        // Automatically check the boxes for roles "Admin" and "Staff"
        this.users.forEach((user) => {
          Object.keys(this.rules).forEach((ruleName) => {
            const rule = this.rules[ruleName];
            if (rule.roles_allowed.includes(user.name)) {
              user.permissions[ruleName] = true;
            }
          });
        });
      });
    },

    updatePermissions() {
      let data = {
        permission_id: this.permission_id,
        allowed_role: this.assignedRole,
      }
      updatePermission(data)
    },

    clicked(rule, user) {
      this.permission_id = rule.id,
        this.assignedRole = user.name

      this.updatePermissions()
    },
    methods: {
      isChecked(rule, user) {
        // Check if the user's role is allowed for the permission rule
        if (rule.roles_allowed.includes(user.name)) {
          return true; // User's role is allowed, so checkbox should be checked
        }

        // Check if the user's allowed roles include any of the roles allowed for the permission rule
        for (let i = 0; i < user.allowedRoles.length; i++) {
          if (rule.roles_allowed.includes(user.allowedRoles[i])) {
            return null; // User's allowed roles partially match the roles allowed for the permission rule, so checkbox should be indeterminate
          }
        }

        // User's role and allowed roles do not match the roles allowed for the permission rule, so checkbox should be unchecked
        return false;
      },
    }



  },
};
</script>
