import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
    theme: {
        themes: {
            dark: {
                background: colors.green.lighten5, // Not automatically applied
                fontFamily: '"Segoe UI", Arial, sans-serif',
            },
            light: {
                background: colors.shades.white, // If not using lighten/darken, use base to return hex
                fontFamily: 'Segoe UI',
                myprimary: '#22252d',
                secondary: '#AAB2C0',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
});
