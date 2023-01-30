<template>
    <div :class="mainClasses" class="sidebar-item">
        <component @click="onclick" :is="wrapper" :to="to" class="sidebar-item__wrapper">
            <b-icon class="sidebar-item__icon" :icon="icon"/>
            <span class="sidebar-item__title">{{ title }}</span>
        </component>
        <div v-if="type === 'dropdown'" :class="dropdownContent" class="sidebar-item__dropdown-content dropdown-content" >
            <sidebar-item
                v-for="(child, index) of children"
                v-bind="child"  
                :key="index"
                class="dropdown-content__item"
            ></sidebar-item>
        </div>
    </div>
</template>

<script>
export default {
    name: "SidebarItem",
    props: {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "link"
        },
        icon: {
            type: String,
            default: "archive"
        },
        to: {
            type: [String, Object],
            default: "#"
        },
        children: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            is_open: false
        }
    },
    computed: {
        wrapper () {
            return this.type === "dropdown"? "div": "router-link"
        },
        mainClasses() {
            return {
                ['sidebar-item_'+ this.type]: true,
                'sidebar-item_open': this.is_open
            };
        },
        dropdownContent() {
            return {
                'dropdown-content_open': this.is_open
            }
        }
    },
    methods: {
        onclick() {
            this.is_open = !this.is_open
        }
    }
}
</script>


<style lang="scss" scoped>
.sidebar-item {
    padding: 6px 0;
    cursor: pointer;

    &, &__wrapper {
        border-radius: 5px;
    }

    &__wrapper {
        display: flex;
        align-items: center;
        margin: 0 6px;
        padding: 12px;
        text-decoration: none;
        color: #BEC5CC;

        &:hover {
            background-color: #2a3645;
        }
    }

    &_open {
        background: #212e3d;
    }

    &__icon {
        width: 20px;
        height: 20px;
    }

    &__title {
        margin-left: 7px;
    }

    &_dropdown {
        color: #BEC5CC;
        position: relative;

        &::after {
            content: " ";
            display: block;
            position: absolute;
            right: 30px;
            top: 26px;
            width: 8px;
            height: 8px;
            border-bottom: 1px solid currentColor;
            border-left: 1px solid currentColor;
            transform: rotate(-45deg);
        }
    }
}

.dropdown-content {
    display: none;
    &_open {
        display: block;
    }
}

</style>
