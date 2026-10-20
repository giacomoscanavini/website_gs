window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "binary_value": {
    "title": "Find one matching value",
    "intro": "nums = [1, 2, 2, 2, 4, 6], target = 4",
    "frames": [
      {
        "text": "Start with [lo, hi) = [0, 6). hi is an excluded boundary, not an element to read.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "6": [
                "hi"
              ]
            },
            "active": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "0",
          "hi": "6",
          "target": "4"
        }
      },
      {
        "text": "Compute mid = (0 + 6) // 2 = 3. Read nums[3] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "3": [
                "mid"
              ],
              "6": [
                "hi"
              ]
            },
            "active": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "0",
          "hi": "6",
          "mid": "3",
          "target": "4"
        }
      },
      {
        "text": "2 < 4: the boundary or value cannot be at mid or to its left. Move lo from 0 to mid + 1 = 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo"
              ],
              "6": [
                "hi"
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
          "lo": "4",
          "hi": "6"
        }
      },
      {
        "text": "Compute mid = (4 + 6) // 2 = 5. Read nums[5] = 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo"
              ],
              "5": [
                "mid"
              ],
              "6": [
                "hi"
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
          "lo": "4",
          "hi": "6",
          "mid": "5",
          "target": "4"
        }
      },
      {
        "text": "6 >= 4: move hi from 6 to mid = 5. The matching value, if present, is in the remaining left interval.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo"
              ],
              "5": [
                "hi"
              ]
            },
            "active": [
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "4",
          "hi": "5"
        }
      },
      {
        "text": "Compute mid = (4 + 5) // 2 = 4. Read nums[4] = 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo",
                "mid"
              ],
              "5": [
                "hi"
              ]
            },
            "active": [
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "4",
          "hi": "5",
          "mid": "4",
          "target": "4"
        }
      },
      {
        "text": "nums[4] equals 4. Return index 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "mid"
              ]
            },
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
  },
  "binary_lower": {
    "title": "Find the first value at least 2",
    "intro": "nums = [1, 2, 2, 2, 4, 6], target = 2",
    "frames": [
      {
        "text": "Start with [lo, hi) = [0, 6). hi is an excluded boundary, not an element to read.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "6": [
                "hi"
              ]
            },
            "active": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "0",
          "hi": "6",
          "target": "2"
        }
      },
      {
        "text": "Compute mid = (0 + 6) // 2 = 3. Read nums[3] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "3": [
                "mid"
              ],
              "6": [
                "hi"
              ]
            },
            "active": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "0",
          "hi": "6",
          "mid": "3",
          "target": "2"
        }
      },
      {
        "text": "2 >= 2: move hi from 6 to mid = 3. Keep mid as a possible boundary; equality does not end a boundary search.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "3": [
                "hi"
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
          "lo": "0",
          "hi": "3"
        }
      },
      {
        "text": "Compute mid = (0 + 3) // 2 = 1. Read nums[1] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "1": [
                "mid"
              ],
              "3": [
                "hi"
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
          "lo": "0",
          "hi": "3",
          "mid": "1",
          "target": "2"
        }
      },
      {
        "text": "2 >= 2: move hi from 3 to mid = 1. Keep mid as a possible boundary; equality does not end a boundary search.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "1": [
                "hi"
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
          "lo": "0",
          "hi": "1"
        }
      },
      {
        "text": "Compute mid = (0 + 1) // 2 = 0. Read nums[0] = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo",
                "mid"
              ],
              "1": [
                "hi"
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
          "lo": "0",
          "hi": "1",
          "mid": "0",
          "target": "2"
        }
      },
      {
        "text": "1 < 2: the boundary or value cannot be at mid or to its left. Move lo from 0 to mid + 1 = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "1": [
                "lo",
                "hi"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "1",
          "hi": "1"
        }
      },
      {
        "text": "lo = hi = 1. Return 1, the first index with value >= 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "1": [
                "lo = hi"
              ]
            },
            "active": [],
            "done": [
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "result": "1"
        }
      }
    ]
  },
  "binary_upper": {
    "title": "Find the first value greater than 2",
    "intro": "nums = [1, 2, 2, 2, 4, 6], target = 2",
    "frames": [
      {
        "text": "Start with [lo, hi) = [0, 6). hi is an excluded boundary, not an element to read.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "6": [
                "hi"
              ]
            },
            "active": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "0",
          "hi": "6",
          "target": "2"
        }
      },
      {
        "text": "Compute mid = (0 + 6) // 2 = 3. Read nums[3] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "0": [
                "lo"
              ],
              "3": [
                "mid"
              ],
              "6": [
                "hi"
              ]
            },
            "active": [
              0,
              1,
              2,
              3,
              4,
              5
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "0",
          "hi": "6",
          "mid": "3",
          "target": "2"
        }
      },
      {
        "text": "2 <= 2: the boundary or value cannot be at mid or to its left. Move lo from 0 to mid + 1 = 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo"
              ],
              "6": [
                "hi"
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
          "lo": "4",
          "hi": "6"
        }
      },
      {
        "text": "Compute mid = (4 + 6) // 2 = 5. Read nums[5] = 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo"
              ],
              "5": [
                "mid"
              ],
              "6": [
                "hi"
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
          "lo": "4",
          "hi": "6",
          "mid": "5",
          "target": "2"
        }
      },
      {
        "text": "6 > 2: move hi from 6 to mid = 5. Keep mid as a possible boundary; equality does not end a boundary search.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo"
              ],
              "5": [
                "hi"
              ]
            },
            "active": [
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "4",
          "hi": "5"
        }
      },
      {
        "text": "Compute mid = (4 + 5) // 2 = 4. Read nums[4] = 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo",
                "mid"
              ],
              "5": [
                "hi"
              ]
            },
            "active": [
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "4",
          "hi": "5",
          "mid": "4",
          "target": "2"
        }
      },
      {
        "text": "4 > 2: move hi from 5 to mid = 4. Keep mid as a possible boundary; equality does not end a boundary search.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo",
                "hi"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "lo": "4",
          "hi": "4"
        }
      },
      {
        "text": "lo = hi = 4. Return 4, the first index with value > 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              2,
              2,
              4,
              6
            ],
            "marks": {
              "4": [
                "lo = hi"
              ]
            },
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
