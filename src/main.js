import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './components/Widget/Widget';
import Config from './config';

const widgetName = Config.name;
const widgetConfigName = widgetName + 'Config'
const defaultconfig = {
    someDefaultConfiguration: false
};
let widgetComponent = null;
let windowDetail = null


function app(window) {
    console.log(window)
    // If we don't already have a name for widget's global object
    // assigned by the host, then they must be using the simple <script> tag method
    // so we need to get our data out of that tag
    windowDetail = window;
    if (!window[widgetName]) {
        let tag = document.getElementById(widgetName + '-Script');

        if (!tag) {
            throw Error(`Cannot find script tag with id {$widgetName}-Script`);
        }

        let rawData = tag.getAttribute('data-config');
        rawData = rawData.replace(/'/g, "\"");
        let data = JSON.parse(rawData);
        window[widgetName] = data.name;

        let placeholder = {};
        (placeholder.q = []).push(['init', data.config]);

        window[window[widgetName]] = placeholder;
    }


    let placeholder = window[window[widgetName]];

    // override temporary (until the app loaded) handler
    // for widget's API calls
    window[window[widgetName]] = apiHandler;
    window[widgetConfigName] = defaultconfig;

    if (placeholder) {

        let queue = placeholder.q;
        if (queue) {

            for (var i = 0; i < queue.length; i++) {
                apiHandler(queue[i][0], queue[i][1]);
            }
        }
    }
}

/**
    Method that handles all API calls
*/
function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();
    let config = window[widgetConfigName];

    config = Object.assign({}, config, params);
    window[widgetConfigName] = config;
    // get a reference to the created widget component so we can
    // call methods as needed
    var div = document.createElement("DIV");
    var body =document.body.appendChild(div);
    ReactDOM.render(<Widget  window={windowDetail} ref={widgetComponent} apiKey={config.apiKey} />, body);
           
}

app(window);

export default app;
