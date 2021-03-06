/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('onDeviceReady Begin');
        app.receivedEvent('deviceready');
        // Cesium.BingMapsApi.defaultKey = '';
        var viewer = new Cesium.Viewer('cesiumContainer');

        var options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 10000 };
        var watchID = navigator.geolocation.watchPosition(
          function(position) {
            // GeoLocationSuccess Event Handler
            //console.log('Latitude: '          + position.coords.latitude          + ', ' +
            //            'Longitude: '         + position.coords.longitude         + ', ' +
            //            'Altitude: '          + position.coords.altitude          + ', ' +
            //            'Accuracy: '          + position.coords.accuracy          + ', ' +
            //            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + ', ' +
            //            'Heading: '           + position.coords.heading           + ', ' +
            //            'Speed: '             + position.coords.speed             + ', ' +
            //            'Timestamp: '         + position.timestamp                + '\n');
            if(viewer) {
              viewer.camera.setView({
                destination : Cesium.Cartesian3.fromDegrees(
                  position.coords.longitude,
                  position.coords.latitude,
                  Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.position).height
                )
              });
	    }
          },
          function(error) {
            // GeoLocationError Event Handler
            console.log('code: '    + error.code    + '\n' +
                        'message: ' + error.message + '\n');
          },
          options);

	var md = cordova.require("cordova/plugin_list").metadata;

	console.log(JSON.stringify(md));

        //var ipfs = require('ipfs');

	if("cordova-plugin-background-mode" in md) {
          // Android customization
          cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
          // Make background operation silent
          cordova.plugins.backgroundMode.configure({
            silent: true
          });
          // Enable background mode
          cordova.plugins.backgroundMode.enable();

          // Called when background mode has been activated
          cordova.plugins.backgroundMode.onactivate = function () {
              setTimeout(function () {
                  // Modify the currently displayed notification
                  cordova.plugins.backgroundMode.configure({
                      text:'Running in background for more than 5s now.'
                  });
              }, 5000);
          }
        }

        console.log('onDeviceReady End');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
