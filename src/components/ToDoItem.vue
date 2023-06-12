<template>
    <li :class="{ 'todo-item': true, 'active-item': isEditing }">
        <input type="checkbox" v-model="localStatus" true-value="completed" false-value="pending" @change="changeStatus">
        <span v-if="!isEditing" :class="{ 'completed-task': item.status === 'completed' }" @click="handleClick">{{
            item.title }}</span>
        <input v-if="isEditing" type="text" class="edit-input" v-model="editedItem" @keyup.enter="saveItem">
        <div class="button-group">
            <button class="edit-button" @click.stop="toggleEditSave">
                <i>Edit</i>
            </button>
            <button class="remove-button" @click.stop="removeItem">
                <i>Delete</i>
            </button>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        activeItem: {
            type: Number,
            default: null
        }
    },

    data() {
        return {
            isEditing: false,
        };
    },
    computed: {
        localStatus: {
            get() {
                return this.item.status;
            },
            set(value) {
                this.item.status = value;
                this.$store.dispatch('todos/updateItemStatus', this.item);
            }
        },
        editedItem: {
            get() {
                return this.item.title;
            },
            set(value) {
                this.item.title = value;
            }
        }
    },
    methods: {
        changeStatus() {
            this.$store.dispatch('todos/updateItemStatus', this.item);
        },
        handleClick() {
            if (!this.isEditing) {
                this.isEditing = true;
            }
        },

        toggleEditSave() {
            if (this.isEditing) {
                this.saveItem();
            } else {
                this.isEditing = true;
            }
        },

        removeItem() {
            this.$store.dispatch('todos/removeItem', this.item);
        },
        saveItem() {
            this.isEditing = false;
            this.$store.dispatch('todos/saveItem', this.item);
        }
    }
};
</script>
    
<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    animation: slide-up 0.3s ease;
}

.todo-item:last-child {
    margin-bottom: 0;
}

.todo-item:hover {
    background-color: #f0f0f0;
}

.todo-item.active-item .edit-input {
    display: block;
}

.edit-input {
    display: none;
    flex: 1;
    margin-left: 12px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    animation: fade-in 0.3s ease;
}

.button-group {
    margin-left: auto;
    display: flex;
    animation: fade-in 0.5s ease;
}

.completed-task {
    text-decoration: line-through;
}

.remove-button,
.edit-button {
    padding: 8px;
    margin-left: 6px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: color 0.2s ease;
}

.remove-button:hover,
.edit-button:hover {
    color: #f44336;
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
