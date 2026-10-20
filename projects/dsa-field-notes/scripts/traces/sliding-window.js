window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "fixed_window": {
    "title": "Slide a window of length 3",
    "intro": "nums = [2, 1, 5, 1, 3], k = 3",
    "frames": [
      {
        "text": "Build the first window without making a slice.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "k": "3",
          "total": "0"
        }
      },
      {
        "text": "i = 0: add nums[0] = 2. The running total becomes 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {
              "0": [
                "i"
              ]
            },
            "active": [
              0
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0",
          "total": "2"
        }
      },
      {
        "text": "i = 1: add nums[1] = 1. The running total becomes 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {
              "1": [
                "i"
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
          "i": "1",
          "total": "3"
        }
      },
      {
        "text": "i = 2: add nums[2] = 5. The running total becomes 8.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {
              "2": [
                "i"
              ]
            },
            "active": [
              0,
              1,
              2
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "total": "8"
        }
      },
      {
        "text": "The first complete window is [0, 2]. Set best = 8.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {
              "0": [
                "left"
              ],
              "2": [
                "right"
              ]
            },
            "active": [
              0,
              1,
              2
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "total": "8",
          "best": "8"
        }
      },
      {
        "text": "right = 3: add nums[3] = 1 and remove nums[0] = 2. total = 8 + 1 - 2 = 7; best = 8.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {
              "1": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [
              1,
              2,
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "3",
          "total": "7",
          "best": "8"
        }
      },
      {
        "text": "right = 4: add nums[4] = 3 and remove nums[1] = 1. total = 7 + 3 - 1 = 9; best = 9.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {
              "2": [
                "left"
              ],
              "4": [
                "right"
              ]
            },
            "active": [
              2,
              3,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "4",
          "total": "9",
          "best": "9"
        }
      },
      {
        "text": "All length-3 windows are checked. Return 9.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              5,
              1,
              3
            ],
            "marks": {},
            "active": [],
            "done": [
              2,
              3,
              4
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "9"
        }
      }
    ]
  },
  "unique_window": {
    "title": "Shrink until a duplicate is gone",
    "intro": "text = 'abba'",
    "frames": [
      {
        "text": "The current window is empty. seen stores its characters.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "0",
          "best": "0"
        }
      },
      {
        "text": "right = 0: the next character is 'a'. Check it against the current window before adding it.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "0": [
                "left",
                "right"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "0",
          "right": "0",
          "best": "0"
        }
      },
      {
        "text": "Add 'a'. Window [0, 0] is 'a', length 1; best = 1.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "0": [
                "left",
                "right"
              ]
            },
            "active": [
              0
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "a"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "0",
          "right": "0",
          "best": "1"
        }
      },
      {
        "text": "right = 1: the next character is 'b'. Check it against the current window before adding it.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "0": [
                "left"
              ],
              "1": [
                "right"
              ]
            },
            "active": [
              0
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "a"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "0",
          "right": "1",
          "best": "1"
        }
      },
      {
        "text": "Add 'b'. Window [0, 1] is 'ab', length 2; best = 2.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "0": [
                "left"
              ],
              "1": [
                "right"
              ]
            },
            "active": [
              0,
              1
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "a",
              "b"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "0",
          "right": "1",
          "best": "2"
        }
      },
      {
        "text": "right = 2: the next character is 'b'. Check it against the current window before adding it.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "0": [
                "left"
              ],
              "2": [
                "right"
              ]
            },
            "active": [
              0,
              1
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "a",
              "b"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "0",
          "right": "2",
          "best": "2"
        }
      },
      {
        "text": "'b' is already present. Remove text[0] = 'a'; move left from 0 to 1. Check again before adding the new character.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "1": [
                "left"
              ],
              "2": [
                "right"
              ]
            },
            "active": [
              1
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "b"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "1",
          "right": "2",
          "best": "2"
        }
      },
      {
        "text": "'b' is already present. Remove text[1] = 'b'; move left from 1 to 2. Check again before adding the new character.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "2": [
                "left",
                "right"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "2",
          "right": "2",
          "best": "2"
        }
      },
      {
        "text": "Add 'b'. Window [2, 2] is 'b', length 1; best = 2.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "2": [
                "left",
                "right"
              ]
            },
            "active": [
              2
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "b"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "2",
          "right": "2",
          "best": "2"
        }
      },
      {
        "text": "right = 3: the next character is 'a'. Check it against the current window before adding it.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "2": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [
              2
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "b"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "2",
          "right": "3",
          "best": "2"
        }
      },
      {
        "text": "Add 'a'. Window [2, 3] is 'ba', length 2; best = 2.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {
              "2": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [
              2,
              3
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "seen",
            "values": [
              "a",
              "b"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "left": "2",
          "right": "3",
          "best": "2"
        }
      },
      {
        "text": "Return 2. The left boundary never moved backward.",
        "rows": [
          {
            "label": "text",
            "values": [
              "a",
              "b",
              "b",
              "a"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "result": "2"
        }
      }
    ]
  },
  "shortest_window": {
    "title": "Record a valid window, then shrink",
    "intro": "nums = [2, 3, 1, 2, 4, 3], target = 7",
    "frames": [
      {
        "text": "Start with an empty window. best = 7 is a sentinel larger than this six-element array.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "total": "0",
          "best": "7"
        }
      },
      {
        "text": "right = 0: add 2. The window [0, 0] now sums to 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "0": [
                "left",
                "right"
              ]
            },
            "active": [
              0
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "0",
          "total": "2",
          "best": "7"
        }
      },
      {
        "text": "right = 1: add 3. The window [0, 1] now sums to 5.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "0": [
                "left"
              ],
              "1": [
                "right"
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
          "left": "0",
          "right": "1",
          "total": "5",
          "best": "7"
        }
      },
      {
        "text": "right = 2: add 1. The window [0, 2] now sums to 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "0": [
                "left"
              ],
              "2": [
                "right"
              ]
            },
            "active": [
              0,
              1,
              2
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "2",
          "total": "6",
          "best": "7"
        }
      },
      {
        "text": "right = 3: add 2. The window [0, 3] now sums to 8.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "0": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [
              0,
              1,
              2,
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "3",
          "total": "8",
          "best": "7"
        }
      },
      {
        "text": "8 >= 7: record length 4; best = 4. Try a shorter window by removing its left end next.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "0": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [
              0,
              1,
              2,
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "3",
          "total": "8",
          "best": "4"
        }
      },
      {
        "text": "Remove nums[0] = 2, then left becomes 1. The sum becomes 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "1": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [
              1,
              2,
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "1",
          "right": "3",
          "total": "6",
          "best": "4"
        }
      },
      {
        "text": "right = 4: add 4. The window [1, 4] now sums to 10.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "1": [
                "left"
              ],
              "4": [
                "right"
              ]
            },
            "active": [
              1,
              2,
              3,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "1",
          "right": "4",
          "total": "10",
          "best": "4"
        }
      },
      {
        "text": "10 >= 7: record length 4; best = 4. Try a shorter window by removing its left end next.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "1": [
                "left"
              ],
              "4": [
                "right"
              ]
            },
            "active": [
              1,
              2,
              3,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "1",
          "right": "4",
          "total": "10",
          "best": "4"
        }
      },
      {
        "text": "Remove nums[1] = 3, then left becomes 2. The sum becomes 7.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "2": [
                "left"
              ],
              "4": [
                "right"
              ]
            },
            "active": [
              2,
              3,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "2",
          "right": "4",
          "total": "7",
          "best": "4"
        }
      },
      {
        "text": "7 >= 7: record length 3; best = 3. Try a shorter window by removing its left end next.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "2": [
                "left"
              ],
              "4": [
                "right"
              ]
            },
            "active": [
              2,
              3,
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "2",
          "right": "4",
          "total": "7",
          "best": "3"
        }
      },
      {
        "text": "Remove nums[2] = 1, then left becomes 3. The sum becomes 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "3": [
                "left"
              ],
              "4": [
                "right"
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
          "left": "3",
          "right": "4",
          "total": "6",
          "best": "3"
        }
      },
      {
        "text": "right = 5: add 3. The window [3, 5] now sums to 9.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "3": [
                "left"
              ],
              "5": [
                "right"
              ]
            },
            "active": [
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "3",
          "right": "5",
          "total": "9",
          "best": "3"
        }
      },
      {
        "text": "9 >= 7: record length 3; best = 3. Try a shorter window by removing its left end next.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "3": [
                "left"
              ],
              "5": [
                "right"
              ]
            },
            "active": [
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "3",
          "right": "5",
          "total": "9",
          "best": "3"
        }
      },
      {
        "text": "Remove nums[3] = 2, then left becomes 4. The sum becomes 7.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "4": [
                "left"
              ],
              "5": [
                "right"
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
          "left": "4",
          "right": "5",
          "total": "7",
          "best": "3"
        }
      },
      {
        "text": "7 >= 7: record length 2; best = 2. Try a shorter window by removing its left end next.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "4": [
                "left"
              ],
              "5": [
                "right"
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
          "left": "4",
          "right": "5",
          "total": "7",
          "best": "2"
        }
      },
      {
        "text": "Remove nums[4] = 4, then left becomes 5. The sum becomes 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {
              "5": [
                "left",
                "right"
              ]
            },
            "active": [
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "5",
          "right": "5",
          "total": "3",
          "best": "2"
        }
      },
      {
        "text": "The shortest valid length is 2, achieved by [4, 3].",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              3,
              1,
              2,
              4,
              3
            ],
            "marks": {},
            "active": [],
            "done": [
              4,
              5
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "2"
        }
      }
    ]
  }
});
