import Vuex from "vuex"
import Vue from "vue"

import auth from "./modules/auth"
import contact from "./modules/contact"
import about from "./modules/about"
import service from "./modules/service"
import team from "./modules/team"
import socials from "./modules/socials"
import page from "./modules/page"
import footer from "./modules/footer"
import homeSlide from "./modules/homeSlide"
import aboutBlock from "./modules/aboutBlock"
import ourAdvantages from "./modules/ourAdvantages"
import partner from "./modules/partner"
import questions from "./modules/questions"
import aboutPage from "./modules/aboutPage"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        auth: auth,
        contact: contact,
        team: team,
        about: about,
        service: service,
        socials: socials,
        page: page,
        footer: footer,
        homeSlide: homeSlide,
        aboutBlock: aboutBlock,
        ourAdvantages: ourAdvantages,
        partner: partner,
        aboutPage: aboutPage,
        questions: questions
    }
})
