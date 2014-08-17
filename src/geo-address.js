/*!
 * GeoAddress 0.1.0
 * @author: Wiljan Slofstra <wiljanslofstra@gmail.com>
 * @url: https://github.com/wiljanslofstra/GeoAddress.js
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.GeoAddress = factory(root);
    }
}(this, function () {
    var options = {
        overwriteValues: false,
        dataAttribute: 'data-geo',
        dataSelector: '.geo-address',
        success: function(){},
        error: function(){}
    },

    geocoder = new google.maps.Geocoder(),

    run = function(opts) {
        opts = opts || {};
        // Extend defaults with the options parameter object
        options = extend(options, opts);

        if (geolocationSupport()) {
            getLocation();
        } else {
            options.error('Geolocation is not supported.');
        }
    },

    getLocation = function() {
        navigator.geolocation.getCurrentPosition(locationHandler, locationErrorHandler);
    },

    locationHandler = function(position) {
        // Save the position parts in variables
        var lat = position.coords.latitude,
            lon = position.coords.longitude,
            coordinates = new google.maps.LatLng(lat, lon);
        
        geoCoder(coordinates);
    },

    locationErrorHandler = function(err) {
        options.error(err.message, err.code);
    },

    geoCoder = function(coordinates) {
        // Convert the long/lat to a readable address
        geocoder.geocode( { 'location': coordinates }, geoCoderHandler);
    },

    geoCoderHandler = function(results, status) {
        var addressCom = results[0].address_components;
        var data = {
            street: addressCom[1].long_name,
            houseNumber: addressCom[0].long_name,
            place: addressCom[2].long_name,
            state: addressCom[4].long_name,
            country: addressCom[5].long_name,
            postal: addressCom[6].long_name
        }
        options.success(data);
        outputData(data);
    },

    outputData = function(data) {
        var geoElements = document.querySelectorAll(options.dataSelector);
        for (var i = 0; i < geoElements.length; i++) {
            var geoElement = geoElements[i],
                dataVal = geoElement.getAttribute(options.dataAttribute);
            if (options.overwriteValues || geoElement.value === '') {
                geoElement.value = data[dataVal];
            }
        }
    },

    geolocationSupport = function() {
        return 'geolocation' in navigator;
    },

    extend = function (obj1, obj2) {
        for (var i in obj2) {
            if (typeof i !== 'undefined' || i === null) {
                obj1[i] = obj2[i];
            }
        }
        return obj1;
    };

    // Make those functions public
    return {
        run: run,
        geolocationSupport: geolocationSupport,
        options: options
    };
}));