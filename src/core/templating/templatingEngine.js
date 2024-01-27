// src/core/templating/templatingEngine.js

class TemplatingEngine {
    constructor() {
        this.regex = /\{\{(.+?)\}\}/g; // Regex to identify placeholders
    }


    render(template, data) {
        // Handle loops
        template = template.replace(/\{\{#each (\w+)\}\}(.+?)\{\{\/each\}\}/gs, (match, variable, content) => {
            if (data[variable] && Array.isArray(data[variable])) {
                return data[variable].map(item => this.render(content, { ...data, ...item })).join('');
            }
            return '';
        });

        // Handle conditionals
        template = template.replace(/\{\{#if (.+?)\}\}(.+?)\{\{\/if\}\}/gs, (match, condition, content) => {
            if (eval(condition)) {
                return this.render(content, data);
            }
            return '';
        });

        // Handle placeholders
        return template.replace(this.regex, (match, key) => {
            return data[key.trim()] || '';
        });
    }

    // You may add more functionalities like handling loops, conditionals, etc.
}

export default TemplatingEngine;

