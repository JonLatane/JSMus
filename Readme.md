#JSMus

Human-readable and writable, enharmonically-intelligent JSON music format.

##Running the test suite

* clone and enter the project
* `bower install`
* `npm install -g http-server` To install a simple http server for the frontend-only test suite and app
* `http-server -c-1 .` To start it up, in a new terminal tab.
..* **The -c-1 is important; you'll need to manually clear cache, at least in Chrome, if you forget this.** I recommend aliasing for a dev environment.
* `open http://localhost:8080/tests.html` or your equivalent on Linux.

[Here's the demo file, 4 bars of Beethoven's Ode To Joy with a voice-led accompaniment.](../blob/master/examples/OdeToJoy.json)

[This is the JSMus JSON Schema we validate against.](../blob/master/examples/OdeToJoy.json)

##Next steps
* Handle rendering with CSS flex layout