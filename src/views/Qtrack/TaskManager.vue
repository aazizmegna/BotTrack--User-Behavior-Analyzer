<template>
  <div class="table-container">
    <table class="task-table">
      <thead>
        <tr>
          <th>Task description</th>
          <th>Category</th>
          <th>Status</th>
          <th>Assignee</th>
          <th>Completion time</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>
            <input v-model="task.description" type="text" />
          </td>
          <td>
            <input v-model="task.category" type="text"/>
          </td>
          <td>
            <select v-model="task.status">
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </td>
          <td>
            <select v-model="task.assignee">
              <option value="user1">Abdel Aziz</option>
              <option value="user2">Issa</option>
              <option value="user3">Halasan</option>
            </select>
          </td>
          <td>
            <input v-model="task.completionTime" type="text" :disabled="isDisabled"/>
          </td>
          <td>
            <input v-model="task.priority" type="text" :disabled="isDisabled"/>
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <button @click="addTask" class="add-button">+</button> Create tiket
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: true,
      tasks: [
        {
          description: "Task 1",
          category: "Category 1",
          status: "in progress",
          assignee: "user1",
          completionTime: "2 hours",
          priority: "High",
        },
        {
          description: "Task 2",
          category: "Category 2",
          status: "done",
          assignee: "user2",
          completionTime: "1 day",
          priority: "Medium",
        },
      ],
    };
  },
  methods: {
    addTask() {
      const newTask = {
        description: "New description",
        category: "New category",
        status: "in progress",
        assignee: "user1",
        completionTime: "00",
        priority: "Medium",
      };
      this.tasks.push(newTask);
    },
  },
};
</script>

<style scoped>
.table-container {
  background-color: #d1e5f0;
  padding: 20px;
  border-radius: 4px;
}
.task-table {
  width: 100%;
  border-collapse: collapse;
}

.task-table th,
.task-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.task-table th:first-child,
.task-table td:first-child {
  border-left: none;
}

.task-table th:last-child,
.task-table td:last-child {
  border-right: none;
}

.task-table input,
.task-table select {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
}

.task-table select {
  padding: 5px 10px;
}

.task-table tbody tr:hover {
  background-color: #f5f5f5;
}

.add-button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f5f5f5;
  color: #888;
  font-size: 20px;
  border: none;
  cursor: pointer;
}
</style>
