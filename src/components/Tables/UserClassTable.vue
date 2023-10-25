<template>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              User
            </th>
            <th class="text-left">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in desserts"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </template>
  <script>
  export default {
    name:'UserClassTable',
    data () {
      return {
        desserts: [
          {
            name: 'issadiallo130@yahoo.com',
            calories: '1h30min',
          },
          {
            name: 'abdel@yahoo.com',
            calories: '1h30min',
          },
        ],
      }
    },
  }
</script>