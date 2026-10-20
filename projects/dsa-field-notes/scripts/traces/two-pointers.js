window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "pair_sorted": {
    "title": "Move one boundary at a time",
    "intro": "nums = [1, 2, 4, 6, 9], target = 8",
    "frames": [
      {
        "text": "Set left = 0 and right = 4. The array is already sorted.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
            ],
            "marks": {
              "0": [
                "left"
              ],
              "4": [
                "right"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "4",
          "target": "8"
        }
      },
      {
        "text": "Compare nums[0] + nums[4] = 1 + 9 = 10.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
            ],
            "marks": {
              "0": [
                "left"
              ],
              "4": [
                "right"
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
          "left": "0",
          "right": "4",
          "total": "10",
          "target": "8"
        }
      },
      {
        "text": "10 > 8: move right from 4 to 3. With the smallest remaining partner, 9 was still too large.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
            ],
            "marks": {
              "0": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "3"
        }
      },
      {
        "text": "Compare nums[0] + nums[3] = 1 + 6 = 7.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
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
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "0",
          "right": "3",
          "total": "7",
          "target": "8"
        }
      },
      {
        "text": "7 < 8: move left from 0 to 1. With the largest remaining partner, 1 was still too small.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
            ],
            "marks": {
              "1": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "1",
          "right": "3"
        }
      },
      {
        "text": "Compare nums[1] + nums[3] = 2 + 6 = 8.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
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
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "1",
          "right": "3",
          "total": "8",
          "target": "8"
        }
      },
      {
        "text": "8 equals the target. Return indices (1, 3), whose values are 2 and 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              4,
              6,
              9
            ],
            "marks": {
              "1": [
                "left"
              ],
              "3": [
                "right"
              ]
            },
            "active": [],
            "done": [
              1,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "(1, 3)"
        }
      }
    ]
  },
  "compact": {
    "title": "Separate the read and write positions",
    "intro": "nums = [3, 2, 2, 3, 4], remove = 3",
    "frames": [
      {
        "text": "write = 0: no kept values have been written yet. Remove the value 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              3,
              2,
              2,
              3,
              4
            ],
            "marks": {
              "0": [
                "write"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "write": "0"
        }
      },
      {
        "text": "read = 0: nums[0] is 3, so skip it. write stays 0.",
        "rows": [
          {
            "label": "nums",
            "values": [
              3,
              2,
              2,
              3,
              4
            ],
            "marks": {
              "0": [
                "read",
                "write"
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
          "read": "0",
          "write": "0"
        }
      },
      {
        "text": "read = 1: keep 2. Write it at index 0, then move write from 0 to 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              2,
              2,
              3,
              4
            ],
            "marks": {
              "1": [
                "read",
                "write"
              ]
            },
            "active": [
              0
            ],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {
          "read": "1",
          "write": "1"
        }
      },
      {
        "text": "read = 2: keep 2. Write it at index 1, then move write from 1 to 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              2,
              2,
              3,
              4
            ],
            "marks": {
              "2": [
                "read",
                "write"
              ]
            },
            "active": [
              1
            ],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "read": "2",
          "write": "2"
        }
      },
      {
        "text": "read = 3: nums[3] is 3, so skip it. write stays 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              2,
              2,
              3,
              4
            ],
            "marks": {
              "3": [
                "read"
              ],
              "2": [
                "write"
              ]
            },
            "active": [
              3
            ],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "read": "3",
          "write": "2"
        }
      },
      {
        "text": "read = 4: keep 4. Write it at index 2, then move write from 2 to 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              2,
              4,
              3,
              4
            ],
            "marks": {
              "4": [
                "read"
              ],
              "3": [
                "write"
              ]
            },
            "active": [
              2
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
          "read": "4",
          "write": "3"
        }
      },
      {
        "text": "Return 3. Only nums[:3] is the result; the values after that prefix are irrelevant.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              2,
              4,
              3,
              4
            ],
            "marks": {
              "3": [
                "write"
              ]
            },
            "active": [],
            "done": [
              0,
              1,
              2
            ],
            "indexed": true
          }
        ],
        "state": {
          "length": "3",
          "kept": "[2, 2, 4]"
        }
      }
    ]
  }
});
