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

4. On PC, press "F" for +1 click, "G" for +2 clicks, and "D" for -1 click. On Mobile, you should see two buttons, +1 and -1, which can be pressed to increment clicks instead of using the keyboard for convenience.

5. After scoring, Press "End" to end the clicker session. 

6. You can input your scores in the form below the clicker scores, and press "Save" to make them display in the table.

7. You can also download all the inputted scores in .xlsx format by clicking the "Download Scores" button

8. On the Gear icon to the left, you can add your own custom key bindings on PC only, (must be a letter, number or special character) and activate/de-activate the flashing animations during scoring.


# Disclaimer:

All results are saved locally to your browser, but will be **permanently lost** if clearing browser cookies. To avoid inadvertently losing your data, be sure to **download your inputted scores** using the "Download Scores" button.
