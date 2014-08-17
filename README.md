# GeoAddress.js
GeoAddress retrieves the address based on your geographical location.

## Setup
GeoAddress.js requires the Google Maps API.
```
<script src="http://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&sensor=false"></script>
```

And insert the GeoAddress.js plugin:
```
<script src="geo-address.js"></script>
```

Add some input that will receive the data, for example:
```
<input type="text" class="geo-address" data-geo="street" name="street">
<input type="text" class="geo-address" data-geo="place" name="place">
```

Run the script when you want to like so:
```
// This is an example with a jQuery event listener.
// The plugin doesn't depend on jQuery.
$('#button').on('click', function(e) {
	e.preventDefault();
	GeoAddress.run();
});
```

A full implementation can be found in ```example/index.html```.

## Example
To see this plugin in action follow this link:
[https://rawgit.com/wiljanslofstra/GeoAddress.js/master/example/index.html](https://rawgit.com/wiljanslofstra/GeoAddress.js/master/example/index.html)

## Options
Options can be passed in the run method.
```
GeoAddress.run({
	// Overwrite if the input already contains a value
	overwriteValues: false,
	
	// The data attribute name
	dataAttribute: 'data-geo',

	// The elements selector for GeoAddress elements
	dataSelector: '.geo-address',

	// Callback on error, like permission denied, google errors etc.
	error: function(msg, code){},

	// Callback on success, returns an object with all data.
	success: function(data){}
});
```