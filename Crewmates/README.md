# Web Development Project 7 - *Galactic Crewmates*

Submitted by: **Azamat**

This web app: **A space-themed crewmate builder that lets you assemble your own interstellar crew. You can create, customize, view, edit, and delete crewmates stored in a Supabase database. Each crewmate has a name, color, speed, division category, role, and equipped weapon.**

Time spent: **3** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate's attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user's added crewmates**
  - The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
  - The detail page contains extra information about the crewmate not included in the summary page
  - Users can navigate to the edit form from the detail page

The following **optional** features are implemented:

- [x] A crewmate can be given a category upon creation which restricts their attribute value options
  - User can choose a `category` option (Tactical Operations, Engineering & Tech, Medical & Bio, Command & Intel) before specifying attributes
  - Based on the category selected, only the relevant roles and weapons for that division are shown
- [x] A section of the summary page displays summary statistics about a user's crew on their crew page
  - Shows total crewmate count, average speed, and most common suit color with percentage
- [x] The summary page displays a custom "success" metric about a user's crew which changes the look of the crewmate list
  - Displays a **Mission Readiness %** score calculated from crew size, category diversity, and average speed

The following **additional** features are implemented:

* [x] Supabase integration with localStorage fallback — the app works offline and syncs to the cloud when credentials are configured
* [x] Custom SVG crewmate avatars rendered with the selected suit color
* [x] Confirmation dialog before deleting a crewmate to prevent accidental deletions
* [x] Dynamic speed commentary on the detail page based on the crewmate's speed value

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/Rmzfs0z.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />



## License

    Copyright 2026 Azamat

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
