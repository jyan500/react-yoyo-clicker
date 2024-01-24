# About the Yoyo Clicker:

Clicker designed for scoring and evaluating technical evaluation (TE) scores during Yoyo competitions,
as well as for mock judging of Yoyo Freestyles uploaded to Youtube.

Inspired by Judge Basher, as well as the Scales Collective Clicker.

Tech Stack: React + Typescript + Tailwind CSS

# How to Run:

1. Download the repo.

2. Run `npm install` to install all dependencies.

3. Run `npm start`

4. The app should open at [http://localhost:3000](http://localhost:3000)

# How to Use:

1. If you're scoring a freestyle uploaded to youtube, copy + paste the youtube link into the 
search bar and click "Submit".
    * It must be a **regular** youtube video link that includes a video ID in `?v=` like so: https://www.youtube.com/watch?v=F5GO6JwzfkY&list=PLKSgreKUG67JT7lzsJshlWwGcBPRqbK9g&ab_channel=yoyovideoarchive
    * Due to this constraint above, youtube shorts are **not** currently supported.
    * Note that if you're not scoring via youtube, skip to step 3.

2. Once the youtube video has loaded in the embed, you can start the video and begin scoring.

3. Press "Start" to begin the clicker session.

4. Press "F" for +1 click, "G" for +2 clicks, and "D" for -1 click

5. After scoring, Press "End" to end the clicker session. 

6. You can input your scores in the form below the clicker scores, and press "Save" to make them display in the table.

7. You can also download all the inputted scores in .xlsx format by clicking the "Download Scores" button
