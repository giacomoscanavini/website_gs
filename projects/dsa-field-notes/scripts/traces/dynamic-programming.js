window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "dp_recursive": {
    "title": "See the repeated recursive calls",
    "intro": "n = 4; steps may have size 1 or 2",
    "frames": [
      {
        "text": "Enter solve(4). First evaluate solve(3), then solve(2).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "4"
        }
      },
      {
        "text": "Enter solve(3). First evaluate solve(2), then solve(1).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3"
        }
      },
      {
        "text": "Enter solve(2). First evaluate solve(1), then solve(0).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "Enter solve(1). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              2,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "solve(1) returns 1. This state has now been computed 1 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              2,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1",
          "result": "1"
        }
      },
      {
        "text": "Enter solve(0). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              2,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0"
        }
      },
      {
        "text": "solve(0) returns 1. This state has now been computed 1 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              2,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0",
          "result": "1"
        }
      },
      {
        "text": "solve(2) returns 2. This state has now been computed 1 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2",
          "result": "2"
        }
      },
      {
        "text": "Enter solve(1). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "solve(1) returns 1. This state has now been computed 2 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1",
          "result": "1"
        }
      },
      {
        "text": "solve(3) returns 3. This state has now been computed 1 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3",
          "result": "3"
        }
      },
      {
        "text": "Enter solve(2). First evaluate solve(1), then solve(0).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "Enter solve(1). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              2,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "solve(1) returns 1. This state has now been computed 3 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              2,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1",
          "result": "1"
        }
      },
      {
        "text": "Enter solve(0). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              2,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0"
        }
      },
      {
        "text": "solve(0) returns 1. This state has now been computed 2 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              2,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0",
          "result": "1"
        }
      },
      {
        "text": "solve(2) returns 2. This state has now been computed 2 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2",
          "result": "2"
        }
      },
      {
        "text": "solve(4) returns 5. This state has now been computed 1 time(s).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "4",
          "result": "5"
        }
      },
      {
        "text": "Return 5 ways. Repeated states generated repeated work.",
        "rows": [
          {
            "label": "state → computation count",
            "values": [
              "0 → 2",
              "1 → 3",
              "2 → 2",
              "3 → 1",
              "4 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "result": "5"
        }
      }
    ]
  },
  "dp_memo": {
    "title": "Reuse a computed state",
    "intro": "n = 5; steps may have size 1 or 2",
    "frames": [
      {
        "text": "Enter solve(5). First evaluate solve(4), then solve(3).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "5"
        }
      },
      {
        "text": "Enter solve(4). First evaluate solve(3), then solve(2).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "4"
        }
      },
      {
        "text": "Enter solve(3). First evaluate solve(2), then solve(1).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3"
        }
      },
      {
        "text": "Enter solve(2). First evaluate solve(1), then solve(0).",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "Enter solve(1). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              2,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "solve(1) returns 1. Save this result in the cache.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              2,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "1 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1",
          "result": "1"
        }
      },
      {
        "text": "Enter solve(0). This is a base case.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              2,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "1 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0"
        }
      },
      {
        "text": "solve(0) returns 1. Save this result in the cache.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              2,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0",
          "result": "1"
        }
      },
      {
        "text": "solve(2) returns 2. Save this result in the cache.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2",
          "result": "2"
        }
      },
      {
        "text": "solve(1) is already cached as 1. Return it without expanding another call.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "solve(3) returns 3. Save this result in the cache.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2",
              "3 → 3"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3",
          "result": "3"
        }
      },
      {
        "text": "solve(2) is already cached as 2. Return it without expanding another call.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2",
              "3 → 3"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "solve(4) returns 5. Save this result in the cache.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2",
              "3 → 3",
              "4 → 5"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "4",
          "result": "5"
        }
      },
      {
        "text": "solve(3) is already cached as 3. Return it without expanding another call.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2",
              "3 → 3",
              "4 → 5"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3"
        }
      },
      {
        "text": "solve(5) returns 8. Save this result in the cache.",
        "rows": [
          {
            "label": "active calls",
            "values": [
              5
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "i → saved result",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 2",
              "3 → 3",
              "4 → 5",
              "5 → 8"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "5",
          "result": "8"
        }
      },
      {
        "text": "Return 8 ways. Each state was computed once.",
        "rows": [
          {
            "label": "state → computation count",
            "values": [
              "0 → 1",
              "1 → 1",
              "2 → 1",
              "3 → 1",
              "4 → 1",
              "5 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "result": "8"
        }
      }
    ]
  },
  "dp_bottom": {
    "title": "Fill states in dependency order",
    "intro": "n = 5; dp[i] counts ways to reach step i",
    "frames": [
      {
        "text": "Set dp[0] = 1 for the empty path and dp[1] = 1 for one single step. Other entries are not computed yet.",
        "rows": [
          {
            "label": "dp",
            "values": [
              1,
              1,
              0,
              0,
              0,
              0
            ],
            "marks": {},
            "active": [],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "n": "5"
        }
      },
      {
        "text": "i = 2: dp[2] = dp[1] + dp[0] = 1 + 1 = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              1,
              1,
              2,
              0,
              0,
              0
            ],
            "marks": {
              "0": [
                "i-2"
              ],
              "1": [
                "i-1"
              ],
              "2": [
                "i"
              ]
            },
            "active": [
              2
            ],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "i = 3: dp[3] = dp[2] + dp[1] = 2 + 1 = 3.",
        "rows": [
          {
            "label": "dp",
            "values": [
              1,
              1,
              2,
              3,
              0,
              0
            ],
            "marks": {
              "1": [
                "i-2"
              ],
              "2": [
                "i-1"
              ],
              "3": [
                "i"
              ]
            },
            "active": [
              3
            ],
            "done": [
              0,
              1,
              2
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "3"
        }
      },
      {
        "text": "i = 4: dp[4] = dp[3] + dp[2] = 3 + 2 = 5.",
        "rows": [
          {
            "label": "dp",
            "values": [
              1,
              1,
              2,
              3,
              5,
              0
            ],
            "marks": {
              "2": [
                "i-2"
              ],
              "3": [
                "i-1"
              ],
              "4": [
                "i"
              ]
            },
            "active": [
              4
            ],
            "done": [
              0,
              1,
              2,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "4"
        }
      },
      {
        "text": "i = 5: dp[5] = dp[4] + dp[3] = 5 + 3 = 8.",
        "rows": [
          {
            "label": "dp",
            "values": [
              1,
              1,
              2,
              3,
              5,
              8
            ],
            "marks": {
              "3": [
                "i-2"
              ],
              "4": [
                "i-1"
              ],
              "5": [
                "i"
              ]
            },
            "active": [
              5
            ],
            "done": [
              0,
              1,
              2,
              3,
              4
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "5"
        }
      },
      {
        "text": "Return dp[5] = 8.",
        "rows": [
          {
            "label": "dp",
            "values": [
              1,
              1,
              2,
              3,
              5,
              8
            ],
            "marks": {},
            "active": [],
            "done": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "8"
        }
      }
    ]
  },
  "dp_rolling": {
    "title": "Keep only the states needed next",
    "intro": "n = 5; the answer ends in previous",
    "frames": [
      {
        "text": "Before i = 2, older = f(0) = 1 and previous = f(1) = 1. Store only these two states.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              1,
              1
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "older": "1",
          "previous": "1"
        }
      },
      {
        "text": "i = 2: current = older + previous = 1 + 1 = 2.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              1,
              1,
              2
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ],
              "2": [
                "current"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "Shift the stored states: older becomes 1; previous becomes 2. The old value 1 is no longer needed.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              1,
              2
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "older": "1",
          "previous": "2"
        }
      },
      {
        "text": "i = 3: current = older + previous = 1 + 2 = 3.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              1,
              2,
              3
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ],
              "2": [
                "current"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "3"
        }
      },
      {
        "text": "Shift the stored states: older becomes 2; previous becomes 3. The old value 1 is no longer needed.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              2,
              3
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "3",
          "older": "2",
          "previous": "3"
        }
      },
      {
        "text": "i = 4: current = older + previous = 2 + 3 = 5.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              2,
              3,
              5
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ],
              "2": [
                "current"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "4"
        }
      },
      {
        "text": "Shift the stored states: older becomes 3; previous becomes 5. The old value 2 is no longer needed.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              3,
              5
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "4",
          "older": "3",
          "previous": "5"
        }
      },
      {
        "text": "i = 5: current = older + previous = 3 + 5 = 8.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              3,
              5,
              8
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ],
              "2": [
                "current"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "5"
        }
      },
      {
        "text": "Shift the stored states: older becomes 5; previous becomes 8. The old value 3 is no longer needed.",
        "rows": [
          {
            "label": "state slots",
            "values": [
              5,
              8
            ],
            "marks": {
              "0": [
                "older"
              ],
              "1": [
                "previous"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "5",
          "older": "5",
          "previous": "8"
        }
      }
    ]
  },
  "coin_change": {
    "title": "Choose the best final coin",
    "intro": "coins = [1, 3, 4], amount = 6",
    "frames": [
      {
        "text": "dp[0] = 0. The value 7 means unreachable so far, since no valid answer for amount 6 needs more than 6 positive coins.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              7,
              7,
              7,
              7,
              7,
              7
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "coins": "[1, 3, 4]"
        }
      },
      {
        "text": "total = 1, coin = 1: try 1 + dp[0] = 1. Set dp[1] = min(7, 1) = 1.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              7,
              7,
              7,
              7,
              7
            ],
            "marks": {
              "0": [
                "from"
              ],
              "1": [
                "total"
              ]
            },
            "active": [
              0,
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "1",
          "coin": "1"
        }
      },
      {
        "text": "total = 2, coin = 1: try 1 + dp[1] = 2. Set dp[2] = min(7, 2) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              7,
              7,
              7,
              7
            ],
            "marks": {
              "1": [
                "from"
              ],
              "2": [
                "total"
              ]
            },
            "active": [
              1,
              2
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "2",
          "coin": "1"
        }
      },
      {
        "text": "total = 3, coin = 1: try 1 + dp[2] = 3. Set dp[3] = min(7, 3) = 3.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              3,
              7,
              7,
              7
            ],
            "marks": {
              "2": [
                "from"
              ],
              "3": [
                "total"
              ]
            },
            "active": [
              2,
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "3",
          "coin": "1"
        }
      },
      {
        "text": "total = 3, coin = 3: try 1 + dp[0] = 1. Set dp[3] = min(3, 1) = 1.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              7,
              7,
              7
            ],
            "marks": {
              "0": [
                "from"
              ],
              "3": [
                "total"
              ]
            },
            "active": [
              0,
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "3",
          "coin": "3"
        }
      },
      {
        "text": "total = 4, coin = 1: try 1 + dp[3] = 2. Set dp[4] = min(7, 2) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              2,
              7,
              7
            ],
            "marks": {
              "3": [
                "from"
              ],
              "4": [
                "total"
              ]
            },
            "active": [
              3,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "4",
          "coin": "1"
        }
      },
      {
        "text": "total = 4, coin = 3: try 1 + dp[1] = 2. Set dp[4] = min(2, 2) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              2,
              7,
              7
            ],
            "marks": {
              "1": [
                "from"
              ],
              "4": [
                "total"
              ]
            },
            "active": [
              1,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "4",
          "coin": "3"
        }
      },
      {
        "text": "total = 4, coin = 4: try 1 + dp[0] = 1. Set dp[4] = min(2, 1) = 1.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              7,
              7
            ],
            "marks": {
              "0": [
                "from"
              ],
              "4": [
                "total"
              ]
            },
            "active": [
              0,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "4",
          "coin": "4"
        }
      },
      {
        "text": "total = 5, coin = 1: try 1 + dp[4] = 2. Set dp[5] = min(7, 2) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              7
            ],
            "marks": {
              "4": [
                "from"
              ],
              "5": [
                "total"
              ]
            },
            "active": [
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "5",
          "coin": "1"
        }
      },
      {
        "text": "total = 5, coin = 3: try 1 + dp[2] = 3. Set dp[5] = min(2, 3) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              7
            ],
            "marks": {
              "2": [
                "from"
              ],
              "5": [
                "total"
              ]
            },
            "active": [
              2,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "5",
          "coin": "3"
        }
      },
      {
        "text": "total = 5, coin = 4: try 1 + dp[1] = 2. Set dp[5] = min(2, 2) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              7
            ],
            "marks": {
              "1": [
                "from"
              ],
              "5": [
                "total"
              ]
            },
            "active": [
              1,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "5",
          "coin": "4"
        }
      },
      {
        "text": "total = 6, coin = 1: try 1 + dp[5] = 3. Set dp[6] = min(7, 3) = 3.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              3
            ],
            "marks": {
              "5": [
                "from"
              ],
              "6": [
                "total"
              ]
            },
            "active": [
              5,
              6
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "6",
          "coin": "1"
        }
      },
      {
        "text": "total = 6, coin = 3: try 1 + dp[3] = 2. Set dp[6] = min(3, 2) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              2
            ],
            "marks": {
              "3": [
                "from"
              ],
              "6": [
                "total"
              ]
            },
            "active": [
              3,
              6
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "6",
          "coin": "3"
        }
      },
      {
        "text": "total = 6, coin = 4: try 1 + dp[2] = 3. Set dp[6] = min(2, 3) = 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              2
            ],
            "marks": {
              "2": [
                "from"
              ],
              "6": [
                "total"
              ]
            },
            "active": [
              2,
              6
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "6",
          "coin": "4"
        }
      },
      {
        "text": "Return dp[6] = 2: use coins 3 + 3. Choosing the largest coin first would give 4 + 1 + 1 instead.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              1,
              2,
              1,
              1,
              2,
              2
            ],
            "marks": {},
            "active": [],
            "done": [
              6
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "2"
        }
      }
    ]
  },
  "knapsack": {
    "title": "Update capacities backward to use an item once",
    "intro": "weights = [2, 3], values = [3, 4], capacity = 4",
    "frames": [
      {
        "text": "dp[cap] is the best value with capacity at most cap. Initially no items are available.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              0,
              0,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "capacity": "4"
        }
      },
      {
        "text": "Consider one item with weight 2 and value 3. Visit capacities from 4 down to 2.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              0,
              0,
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "weight": "2",
          "value": "3"
        }
      },
      {
        "text": "cap = 4: max(skip = 0, take = dp[2] + 3 = 3) gives 3. The smaller source capacity still belongs to the previous item row.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              0,
              0,
              3
            ],
            "marks": {
              "4": [
                "cap"
              ],
              "2": [
                "source"
              ]
            },
            "active": [
              4,
              2
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "cap": "4",
          "weight": "2",
          "value": "3"
        }
      },
      {
        "text": "cap = 3: max(skip = 0, take = dp[1] + 3 = 3) gives 3. The smaller source capacity still belongs to the previous item row.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              0,
              3,
              3
            ],
            "marks": {
              "3": [
                "cap"
              ],
              "1": [
                "source"
              ]
            },
            "active": [
              3,
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "cap": "3",
          "weight": "2",
          "value": "3"
        }
      },
      {
        "text": "cap = 2: max(skip = 0, take = dp[0] + 3 = 3) gives 3. The smaller source capacity still belongs to the previous item row.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              3,
              3,
              3
            ],
            "marks": {
              "2": [
                "cap"
              ],
              "0": [
                "source"
              ]
            },
            "active": [
              2,
              0
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "cap": "2",
          "weight": "2",
          "value": "3"
        }
      },
      {
        "text": "Consider one item with weight 3 and value 4. Visit capacities from 4 down to 3.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              3,
              3,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "weight": "3",
          "value": "4"
        }
      },
      {
        "text": "cap = 4: max(skip = 3, take = dp[1] + 4 = 4) gives 4. The smaller source capacity still belongs to the previous item row.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              3,
              3,
              4
            ],
            "marks": {
              "4": [
                "cap"
              ],
              "1": [
                "source"
              ]
            },
            "active": [
              4,
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "cap": "4",
          "weight": "3",
          "value": "4"
        }
      },
      {
        "text": "cap = 3: max(skip = 3, take = dp[0] + 4 = 4) gives 4. The smaller source capacity still belongs to the previous item row.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              3,
              4,
              4
            ],
            "marks": {
              "3": [
                "cap"
              ],
              "0": [
                "source"
              ]
            },
            "active": [
              3,
              0
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "cap": "3",
          "weight": "3",
          "value": "4"
        }
      },
      {
        "text": "Return dp[4] = 4. The weight-2 item was not reused to produce an invalid value of 6.",
        "rows": [
          {
            "label": "dp",
            "values": [
              0,
              0,
              3,
              4,
              4
            ],
            "marks": {},
            "active": [],
            "done": [
              4
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "4"
        }
      }
    ]
  }
});
