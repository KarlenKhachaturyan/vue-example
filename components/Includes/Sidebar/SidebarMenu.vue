<template>
    <aside class="sidebar">
        <div class="sidebar__item brand brand_light">
            <router-link class="sidebar-item__link" to="/">
                <i class="brand__icon"/>
                <span class="brand__title">TCO Admin</span>
            </router-link>
        </div>
        <div class="sidebar__body">
            <sidebar-item v-for="(page, index) of pages" :key="index" v-bind="page" class="sidebar__item">
            </sidebar-item>
        </div>
        <div class="sidebar__footer">
            <sidebar-item @click.native="$store.dispatch('auth/logout')" class="sidebar__item" title="Log Out"
                          icon="door-open">
            </sidebar-item>
        </div>
    </aside>
</template>

<script>
import SidebarItem from "@/components/Includes/Sidebar/SidebarItem.vue";

export default {
    name: "SidebarMenu",
    components: {SidebarItem},
    data() {
        return {
            pages: [
                {
                    icon: "graph-up",
                    title: "Dashboard",
                    to: {
                        name: "Dashboard"
                    }
                },
                {
                    type: "dropdown",
                    icon: "house",
                    title: "Home Page",
                    children: [
                        {
                            icon: "images",
                            title: "Hero Slider",
                            to: {
                                name: "HomeSlideTable"
                            }
                        },
                        {
                            icon: "info-circle",
                            title: "About Section",
                            to: {
                                name: "AboutBlock"
                            }
                        },
                        {
                            icon: "file-earmark-person",
                            title: "Partners",
                            to: {
                                name: "PartnersTable"
                            }
                        },
                        {
                            title: "Our Advantages",
                            to: {
                                name: "OurAdvantagesTable"
                            }
                        }
                    ]
                },
                {
                    icon: "info-circle",
                    title: "About Us page",
                    to: {
                        name: "AboutTable"
                    }
                },
                {
                    icon: "bag-check",
                    title: "Services page",
                    to: {
                        name: "ServicesTable"
                    }
                },
                {
                    icon: "person",
                    title: "Team page",
                    to: {
                        name: "Team"
                    }
                },
                {
                    icon: "megaphone",
                    type: "dropdown",
                    title: "Contact us",
                    children: [
                        {
                            icon: "megaphone-fill",
                            title: "Page",
                            to: {
                                name: "ContactUs"
                            }
                        },
                        {
                            icon: "question",
                            title: "Questions",
                            to: {
                                name: "Questions"
                            }
                        },
                    ]
                },
                {
                    icon: "images",
                    title: "Banners",
                    to: {
                        name: "Page"
                    }
                },
                {
                    icon: "link45deg",
                    title: "Footer",
                    to: {
                        name: "Socials"
                    }
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.sidebar {
    height: 100%;
    width: 260px;
    background: #182535;
}

.brand {
    height: 64px;
    padding: 12px;
    margin: 0 12px;

    &,
    > * {
        display: flex;
        align-items: center;
        text-decoration: none;
    }

    &__title {
        margin-left: 10px;
        letter-spacing: -1.45px;
        font-size: 1.75rem;
        font-weight: 500;
    }

    &__icon {
        background-size: contain;
        height: 27.19px;
        width: 27.19px;
    }

    &_light {
        .brand__title {
            color: white;
        }

        .brand__icon {
            background: url("../../../assets/svg/icon.svg") no-repeat;
        }
    }
}
</style>
