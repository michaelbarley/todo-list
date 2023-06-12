<template>
  <ul class="todo-list">
      <to-do-item
          v-for="(item, index) in items"
          :key="item.id"
          :item="item"
          :index="index"
          :active-item="activeItem"
          @remove-item="removeItem(item)"
          @save-item="saveItem(item)"
      ></to-do-item>
  </ul>
</template>

<script>
import ToDoItem from "./ToDoItem.vue";
import { mapActions } from "vuex";

export default {
  components: {
      ToDoItem
  },
  props: {
      items: {
          type: Array,
          required: true
      },
      activeItem: {
          type: Number,
          default: null
      }
  },
  methods: {
      ...mapActions("todos", ["selectItem", "editItem", "removeItem", "saveItem"])
  }
};
</script>

<style scoped>
.todo-list {
  list-style: none;
  padding: 0;
}

@keyframes slide-up {
  0% {
      opacity: 0;
      transform: translateY(20px);
  }

  100% {
      opacity: 1;
      transform: translateY(0);
  }
}
</style>
