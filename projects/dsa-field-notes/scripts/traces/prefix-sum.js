window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "prefix": {
    "title": "Build once, subtract for each query",
    "intro": "nums = [2, -1, 3, 4], query [1, 4)",
    "frames": [
      {
        "text": "prefix[0] = 0 represents the empty prefix.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              -1,
              3,
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix",
            "values": [
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "built": "0"
        }
      },
      {
        "text": "Read nums[0] = 2. Set prefix[1] = prefix[0] + nums[0] = 0 + (2) = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              -1,
              3,
              4
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
          },
          {
            "label": "prefix",
            "values": [
              0,
              2
            ],
            "marks": {
              "1": [
                "i+1"
              ]
            },
            "active": [
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0"
        }
      },
      {
        "text": "Read nums[1] = -1. Set prefix[2] = prefix[1] + nums[1] = 2 + (-1) = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              -1,
              3,
              4
            ],
            "marks": {
              "1": [
                "i"
              ]
            },
            "active": [
              1
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix",
            "values": [
              0,
              2,
              1
            ],
            "marks": {
              "2": [
                "i+1"
              ]
            },
            "active": [
              2
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "Read nums[2] = 3. Set prefix[3] = prefix[2] + nums[2] = 1 + (3) = 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              -1,
              3,
              4
            ],
            "marks": {
              "2": [
                "i"
              ]
            },
            "active": [
              2
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix",
            "values": [
              0,
              2,
              1,
              4
            ],
            "marks": {
              "3": [
                "i+1"
              ]
            },
            "active": [
              3
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2"
        }
      },
      {
        "text": "Read nums[3] = 4. Set prefix[4] = prefix[3] + nums[3] = 4 + (4) = 8.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              -1,
              3,
              4
            ],
            "marks": {
              "3": [
                "i"
              ]
            },
            "active": [
              3
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix",
            "values": [
              0,
              2,
              1,
              4,
              8
            ],
            "marks": {
              "4": [
                "i+1"
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
          "i": "3"
        }
      },
      {
        "text": "Query [1, 4): subtract the sum before index 1 from the sum before index 4. prefix[4] - prefix[1] = 8 - 2 = 6.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              -1,
              3,
              4
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
              3
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix",
            "values": [
              0,
              2,
              1,
              4,
              8
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
              4
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "left": "1",
          "right": "4",
          "result": "6"
        }
      }
    ]
  },
  "prefix_count": {
    "title": "Count earlier prefixes with the needed value",
    "intro": "nums = [1, -1, 1, 1], target = 1",
    "frames": [
      {
        "text": "Record the empty prefix once: counts = {0: 1}. This allows a subarray to start at index 0.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix sum → frequency",
            "values": [
              "0 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "total": "0",
          "answer": "0"
        }
      },
      {
        "text": "i = 0: total becomes 1. Need an earlier prefix 1 - 1 = 0. There are 1; answer increases to 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
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
          },
          {
            "label": "earlier prefix → frequency",
            "values": [
              "0 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0",
          "total": "1",
          "need": "0",
          "answer": "1"
        }
      },
      {
        "text": "Only after counting matches, record this prefix: counts[1] = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {
              "0": [
                "i"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix sum → frequency",
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
          "total": "1",
          "answer": "1"
        }
      },
      {
        "text": "i = 1: total becomes 0. Need an earlier prefix 0 - 1 = -1. There are 0; answer increases to 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
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
          },
          {
            "label": "earlier prefix → frequency",
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
          "i": "1",
          "total": "0",
          "need": "-1",
          "answer": "1"
        }
      },
      {
        "text": "Only after counting matches, record this prefix: counts[0] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {
              "1": [
                "i"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix sum → frequency",
            "values": [
              "0 → 2",
              "1 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "total": "0",
          "answer": "1"
        }
      },
      {
        "text": "i = 2: total becomes 1. Need an earlier prefix 1 - 1 = 0. There are 2; answer increases to 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
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
          },
          {
            "label": "earlier prefix → frequency",
            "values": [
              "0 → 2",
              "1 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "2",
          "total": "1",
          "need": "0",
          "answer": "3"
        }
      },
      {
        "text": "Only after counting matches, record this prefix: counts[1] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {
              "2": [
                "i"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix sum → frequency",
            "values": [
              "0 → 2",
              "1 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "total": "1",
          "answer": "3"
        }
      },
      {
        "text": "i = 3: total becomes 2. Need an earlier prefix 2 - 1 = 1. There are 2; answer increases to 5.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {
              "3": [
                "i"
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
          },
          {
            "label": "earlier prefix → frequency",
            "values": [
              "0 → 2",
              "1 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3",
          "total": "2",
          "need": "1",
          "answer": "5"
        }
      },
      {
        "text": "Only after counting matches, record this prefix: counts[2] = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {
              "3": [
                "i"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "prefix sum → frequency",
            "values": [
              "0 → 2",
              "1 → 2",
              "2 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "total": "2",
          "answer": "5"
        }
      },
      {
        "text": "Return 5. Negative values did not require any special window rule.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              -1,
              1,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "result": "5"
        }
      }
    ]
  }
});
