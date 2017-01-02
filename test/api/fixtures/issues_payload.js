module.exports = [
  {
    "id": 198049402,
    "name": "[WIP] Supertest",
    "description": "Fixes #56 \r\nFixes #66 \r\n\r\nUsing supertest instead of shot as it works with express",
    "number": 67,
    "labels": [],
    "assignees": []
  },
  {
    "id": 198049265,
    "name": "Convert testing framework from shot to supertest",
    "description": "Shot doesn't work with express, using supertest instead",
    "number": 66,
    "labels": [
      {
        "name": "in-progress",
        "color": "009688"
      },
      {
        "name": "priority-1",
        "color": "0D47A1"
      }
    ],
    "assignees": [
      {
        "name": "shouston3",
        "image": "https://avatars.githubusercontent.com/u/15983736?v=3"
      }
    ]
  },
  {
    "id": 197924908,
    "name": "Refactor the repetitious front end code",
    "description": "Relies on #61 being finished",
    "number": 62,
    "labels": [
      {
        "name": "priority-3",
        "color": "42A5F5"
      }
    ],
    "assignees": []
  },
  {
    "id": 197924828,
    "name": "Add tests for the front end flow",
    "description": "Relies on #55 being finished",
    "number": 61,
    "labels": [
      {
        "name": "priority-2",
        "color": "1976D2"
      }
    ],
    "assignees": []
  },
  {
    "id": 197886221,
    "name": "Tests payload is empty",
    "description": "shot.inject payload is always an empty string",
    "number": 56,
    "labels": [
      {
        "name": "bug",
        "color": "ee0701"
      },
      {
        "name": "in-progress",
        "color": "009688"
      },
      {
        "name": "priority-2",
        "color": "1976D2"
      }
    ],
    "assignees": [
      {
        "name": "shouston3",
        "image": "https://avatars.githubusercontent.com/u/15983736?v=3"
      }
    ]
  },
  {
    "id": 197853840,
    "name": "api endpoints",
    "description": "At the moment the wiki API endpoints dont seem to follow a pattern. I think its a good convention for your API request `method` + `url` to be *meaningful*.\r\n\r\nI propose (changes in **bold**):\r\n\r\nGET - /orgs : gets all organisations of authenticated user\r\n**GET - /repos/{org_id} : gets all repos of an organisation**\r\n**GET - /issues/{repo_id} : gets all issues of an organisation**\r\n~~GET~~ POST- /issue/{issue_id}/start : adds `in-progress` label\r\n~~GET~~ POST- /issue/{issue_id}/stop : removes `in-progress` label\r\n\r\n",
    "number": 54,
    "labels": [
      {
        "name": "discuss",
        "color": "60eeee"
      }
    ],
    "assignees": []
  },
  {
    "id": 197758908,
    "name": "Enhance error handling for login",
    "description": "We should pass this error down to the client (error page?)\r\n\r\nhttps://github.com/gitodoro/gitodoro/blob/master/src/api/githubOauth.js#L36",
    "number": 50,
    "labels": [
      {
        "name": "priority-3",
        "color": "42A5F5"
      }
    ],
    "assignees": []
  },
  {
    "id": 197472026,
    "name": "Consider a state object",
    "description": "We could store the application state in [local storage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) which would allow data to persist when a user closes the browser.",
    "number": 45,
    "labels": [
      {
        "name": "priority-3",
        "color": "42A5F5"
      }
    ],
    "assignees": []
  },
  {
    "id": 197471155,
    "name": "Set up the repo part of the api",
    "description": "in accordance with the api described in the [wiki](https://github.com/gitodoro/gitodoro/wiki/Api)",
    "number": 43,
    "labels": [
      {
        "name": "priority-1",
        "color": "0D47A1"
      }
    ],
    "assignees": []
  },
  {
    "id": 197430900,
    "name": "Secure access_token before storing cookie",
    "description": "- encryption with bcrypt\r\n- set up adjustments for express validation middleware",
    "number": 34,
    "labels": [
      {
        "name": "priority-2",
        "color": "1976D2"
      }
    ],
    "assignees": []
  },
  {
    "id": 197398999,
    "name": "Style countdown timer",
    "description": "linked to #11 ",
    "number": 29,
    "labels": [
      {
        "name": "priority-2",
        "color": "1976D2"
      }
    ],
    "assignees": []
  },
  {
    "id": 197398755,
    "name": "Countdown timer jumps straight to 58 seconds",
    "description": "eg. when minutes is set to 10, on start click the timers shows 9:58 as first digits\r\n",
    "number": 28,
    "labels": [
      {
        "name": "bug",
        "color": "ee0701"
      },
      {
        "name": "priority-3",
        "color": "42A5F5"
      }
    ],
    "assignees": []
  },
  {
    "id": 197335540,
    "name": "Unsure if we should have different endpoints for each view",
    "description": "Instead it may make the application more portable (to a chrome extension at least) if we keep it as a single page application as much as possible.\r\n\r\nCurrently we have a `/login` endpoint and a `/timer` endpoint which serves up the html for that page. Instead we perhaps should have one endpoint which serves up our `<div id=\"app\"></div>`\r\n\r\nAnd then change each view by changing the content of the `app` div.\r\n\r\nHowever, I think that **we should continue with just getting the web app to a working state** and not worry about changing this for now and only worry about this if it becomes an issue in the other forms of the project.\r\n\r\nAfter struggling to think of how oauth could be possible with a Chrome extension, I found out that Chrome extensions have their [own way of managing oauth](https://developer.chrome.com/extensions/tut_oauth)",
    "number": 24,
    "labels": [
      {
        "name": "priority-5",
        "color": "C5DEF5"
      }
    ],
    "assignees": []
  },
  {
    "id": 197169907,
    "name": "Be able to STOP, CLOSE or CONTINUE working on an issue when the timer finishes",
    "description": "- Start break timer\r\n\r\nSTOP:\r\n- STOP button\r\n- send request to remove 'in progress' label from issue and post a comment for how much time has been spent on the issue in that \"session\"\r\n- when break timer finishes show user select field with list of repos\r\n\r\n\r\nCLOSE:\r\n- CLOSE button\r\n- send request to remove 'in progress' label, close issue and post a comment for how much time has been spent on the issue in that \"session\"\r\n - when break timer finishes show user select field with list of repos\r\n\r\nCONTINUE:\r\n- CONTINUE button\r\n- when break timer finishes start 25min timer on previous issues",
    "number": 14,
    "labels": [
      {
        "name": "epic",
        "color": "000059"
      }
    ],
    "assignees": []
  },
  {
    "id": 197169737,
    "name": "Be able to STOP or CLOSE an issue while the timer is running",
    "description": "STOP:\r\n- STOP button\r\n- send request to remove 'in progress' label from issue and post a comment for how much time has been spent on the issue in that \"session\"\r\n- show user select field with list of repos\r\n- remove timer\r\n\r\n\r\nCLOSE:\r\n- CLOSE button\r\n- send request to remove 'in progress' label, close issue and post a comment for how much time has been spent on the issue in that \"session\"\r\n- show user select field with list of repos\r\n- remove timer",
    "number": 13,
    "labels": [
      {
        "name": "epic",
        "color": "000059"
      }
    ],
    "assignees": []
  },
  {
    "id": 196813010,
    "name": "Logo",
    "description": "A gitodoro logo - combination of the git octocat, a tomato and a timer\r\n\r\n![gitodoro_logo](https://cloud.githubusercontent.com/assets/15983736/21372711/db9b910a-c710-11e6-96ac-9b40072e880c.png)\r\n",
    "number": 12,
    "labels": [],
    "assignees": []
  }
];
