# Leeds Beer Quest App

This is an app designed to make the Leeds Beer Quest dataset available to X-Lab staff.

The app is built with TypeScript, React and Next.js, using the default `create-next-app` codebase as a starter, with CSS modules for styling. Test infrastructure was subsequently added as per the current Next.js documentation.

## Running the app

Prerequisites: Node.js 18.17 and a compatible version of NPM.

To run the app locally in development mode, first clone the repo, then run:

    npm install

    npm run dev

then visit http://localhost:3000

To start the app in production mode:

    npm run build

    npm run start

To run the tests:

    npm run test

## Features

The app displays the list of venues relative to the user's location, closest first. User location is opted into via the usual browser location permission dialog, and if permission is denied the app will default to using Leeds city centre.

Additionally, the list of venues can be searched, which will filter the list of venues based on matching tags.

Distance from the current location is shown for each venue, along with a link to open the venue location in Google maps.

The app has a reasonably responsive design, so should work OK across different screen sizes (eg. mobile).

## Implementation approach

I wanted to keep the CSV as the source of truth, so decided to have a simple backend that loads, parses and serves the data from the CSV file. This is implemented using a basic Next.js API route at `src/app/api/locations/route.ts`. The CSV is stored in the Next.js `public` directory for no other reason than it's the only location I know of that works in both dev and production modes.

The parser logic can be found in `src/app/lib/beer_quest.ts`. The parser outputs slightly cleaned up version of what's in the CSV, eg. the tags string is transformed into an array in the output object.

On the client side, I'm making minimal use of Next.js features and am essentially using it to host a traditional SPA. The root component of the app can be found in `src/app/App.tsx`, and I've not broken any components out into their own files. The App component is hosted in the default 'home' Next.js page at `src/app/page.tsx`.

The client side logic is almost entirely implemented in `src/app/lib/venue_service.ts`. I wanted to do as much logic client-side as possible, so the backend is really just serving up a static dataset. The main thing here is `venueService` which takes a location and a search term, and returns a list of venues ordered by distance from the current location, filtered by the search term. There's no caching or any other attempt at optimisation here!

Basic source layout:

`src/app` - root of the Next/React app (our App.tsx is here)

`src/app/lib` - modules with no Next/React dependencies

`__test__` - tests for both lib modules and React components

## Testing approach

I've taken an approach of using pure TS code for interesting logic where possible (ie. no React or Next dependencies), with most of the testing focus on this. This means I don't have to use React testing library unless necessary - just plain unit tests. I've also taken a basic approach to stubbing dependencies in the App component tests. As we just pass in a couple of plain TS 'service' functions via props to the App component (basically dependency injection - see `src/app/page.tsx`), we can provide simple stubbed versions in the tests. One of the things that gets stubbed is a location service that allows us to provide a current location without having to interact with the browser location permissions dialog.

Overall I'd like to have added at least one proper end to end test, and some more component tests - however I had a lot of problems with React testing library and was eventually pressed for time.
