<template>
  <div class="todo-app">
    <h2 class="title" :style="dynamicColor">Todo List</h2>

    <div v-if="items.length > 0">
      <to-do-list :items="items" :active-item="activeItem" @select-item="selectItem" @edit-item="editItem"
        @remove-item="removeItem" @save-item="saveItem"></to-do-list>
    </div>
    <div v-else>
      <p>No items yet. Let's add some!</p>
    </div>

    <div class="add-form">
      <input type="text" class="add-input" v-model="newItem" ref="newItemInput" placeholder="Add new item"
        @keyup.enter="addItem">
      <button class="add-button" @click="addItem">
        <i>ADD</i>
      </button>
    </div>

    <p class="total-items">Total items: {{ totalItems }}</p>
  </div>
</template>

<script>
import ToDoList from "./components/ToDoList.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ToDoList
  },
  data() {
    return {
      newItem: ''
    };
  },
  computed: {
    ...mapState("todos", ["items", "activeItem"]),
    totalItems() {
      return this.items.length;
    },
    dynamicColor() {
      return {
        color: this.color
      };
    }
  },
  methods: {
    ...mapActions("todos", ["removeItem", "selectItem", "editItem", "saveItem"]),
    addItem() {
      if (this.newItem) {
        const newItem = {
          title: this.newItem,
          status: 'pending',
        };
        this.$store.dispatch('todos/addItem', newItem);
        this.newItem = '';
      }
    }

  },
  mounted() {
    this.$refs.newItemInput.focus();
    this.$store.dispatch('todos/fetchItems');
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
.todo-app {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  animation: fade-in 0.5s ease;
}

.title {
  margin-top: 0;
  color: #333;
  font-size: 24px;
  text-align: center;
  animation: slide-down 0.5s ease;
}

.add-form {
  display: flex;
  align-items: center;
  margin-top: 20px;
  animation: fade-in 0.5s ease;
}

.add-input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.add-button {
  padding: 12px;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #45a049;
}

.total-items,
.seconds-alive {
  margin-top: 20px;
  color: #888;
  text-align: center;
  animation: fade-in 0.5s ease;
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
