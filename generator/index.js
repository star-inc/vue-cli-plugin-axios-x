module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        devDependencies: {
            axios: "^0.26.1"
        }
    });

    // Render vuetify plugin file
    api.render({"./src/plugins/axios.js": "./templates/plugins/axios.js"}, options);

    const helpers = require('./helpers')(api)

    // adapted from https://github.com/Akryum/vue-cli-plugin-apollo/blob/master/generator/index.js#L68-L91
    api.onCreateComplete(() => {
        // Modify main.js
        helpers.updateMain(src => {
            const vueImportIndex = src.findIndex(line => line.match(/^import Vue/));
            const axiosImportIndex = src.findIndex(line => line.match(/\/plugins\/axios/));
            if (axiosImportIndex < 0) {
                src.splice(vueImportIndex + 1, 0, "import './plugins/axios'");
            }
            return src;
        });
    });
};
  