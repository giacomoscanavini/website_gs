window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "insertion": {
    "title": "Shift larger values, then insert the saved key",
    "intro": "nums = [4, 1, 3, 2]",
    "frames": [
      {
        "text": "Index 0 is a sorted prefix of length 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "i = 1: save key = 1 outside the array. Scan the sorted prefix backward from j = 0.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "1": [
                "i"
              ],
              "0": [
                "j"
              ]
            },
            "active": [],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "1",
          "j": "0",
          "key": "1"
        }
      },
      {
        "text": "4 > key 1: shift nums[0] to index 1, then j becomes -1. The repeated array value is temporary; key is still saved.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i"
              ],
              "-1": [
                "j"
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
          "i": "1",
          "j": "-1",
          "key": "1"
        }
      },
      {
        "text": "Place key 1 at j + 1 = 0. The prefix through index 1 is sorted.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i"
              ],
              "0": [
                "place"
              ]
            },
            "active": [],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "1",
          "key": "1"
        }
      },
      {
        "text": "i = 2: save key = 3 outside the array. Scan the sorted prefix backward from j = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "2": [
                "i"
              ],
              "1": [
                "j"
              ]
            },
            "active": [],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "j": "1",
          "key": "3"
        }
      },
      {
        "text": "4 > key 3: shift nums[1] to index 2, then j becomes 0. The repeated array value is temporary; key is still saved.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              4,
              2
            ],
            "marks": {
              "2": [
                "i"
              ],
              "0": [
                "j"
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
          "i": "2",
          "j": "0",
          "key": "3"
        }
      },
      {
        "text": "Place key 3 at j + 1 = 1. The prefix through index 2 is sorted.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              4,
              2
            ],
            "marks": {
              "2": [
                "i"
              ],
              "1": [
                "place"
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
          "i": "2",
          "key": "3"
        }
      },
      {
        "text": "i = 3: save key = 2 outside the array. Scan the sorted prefix backward from j = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              4,
              2
            ],
            "marks": {
              "3": [
                "i"
              ],
              "2": [
                "j"
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
          "i": "3",
          "j": "2",
          "key": "2"
        }
      },
      {
        "text": "4 > key 2: shift nums[2] to index 3, then j becomes 1. The repeated array value is temporary; key is still saved.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              4,
              4
            ],
            "marks": {
              "3": [
                "i"
              ],
              "1": [
                "j"
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
          "i": "3",
          "j": "1",
          "key": "2"
        }
      },
      {
        "text": "3 > key 2: shift nums[1] to index 2, then j becomes 0. The repeated array value is temporary; key is still saved.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              3,
              4
            ],
            "marks": {
              "3": [
                "i"
              ],
              "0": [
                "j"
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
          "i": "3",
          "j": "0",
          "key": "2"
        }
      },
      {
        "text": "Place key 2 at j + 1 = 1. The prefix through index 3 is sorted.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "3": [
                "i"
              ],
              "1": [
                "place"
              ]
            },
            "active": [],
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
          "i": "3",
          "key": "2"
        }
      }
    ]
  },
  "selection": {
    "title": "Select one final position per pass",
    "intro": "nums = [4, 1, 3, 2]",
    "frames": [
      {
        "text": "No positions are fixed yet. Each pass selects the smallest remaining value.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "i = 0: start with smallest = 0. Scan the remaining suffix.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "0": [
                "i",
                "smallest"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0",
          "smallest": "0"
        }
      },
      {
        "text": "j = 1: compare 1 with candidate 4. Update smallest to 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "0": [
                "i"
              ],
              "1": [
                "j",
                "smallest"
              ]
            },
            "active": [
              1,
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0",
          "j": "1",
          "smallest": "1"
        }
      },
      {
        "text": "j = 2: compare 3 with candidate 1. Keep smallest = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "0": [
                "i"
              ],
              "2": [
                "j"
              ],
              "1": [
                "smallest"
              ]
            },
            "active": [
              2,
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0",
          "j": "2",
          "smallest": "1"
        }
      },
      {
        "text": "j = 3: compare 2 with candidate 1. Keep smallest = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "0": [
                "i"
              ],
              "3": [
                "j"
              ],
              "1": [
                "smallest"
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
          "i": "0",
          "j": "3",
          "smallest": "1"
        }
      },
      {
        "text": "Swap indices 0 and 1. Position 0 is now final.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "0": [
                "i"
              ],
              "1": [
                "smallest"
              ]
            },
            "active": [],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "0"
        }
      },
      {
        "text": "i = 1: start with smallest = 1. Scan the remaining suffix.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i",
                "smallest"
              ]
            },
            "active": [],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "1",
          "smallest": "1"
        }
      },
      {
        "text": "j = 2: compare 3 with candidate 4. Update smallest to 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i"
              ],
              "2": [
                "j",
                "smallest"
              ]
            },
            "active": [
              2,
              2
            ],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "1",
          "j": "2",
          "smallest": "2"
        }
      },
      {
        "text": "j = 3: compare 2 with candidate 3. Update smallest to 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i"
              ],
              "3": [
                "j",
                "smallest"
              ]
            },
            "active": [
              3,
              3
            ],
            "done": [
              0
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "1",
          "j": "3",
          "smallest": "3"
        }
      },
      {
        "text": "Swap indices 1 and 3. Position 1 is now final.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "1": [
                "i"
              ],
              "3": [
                "smallest"
              ]
            },
            "active": [],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "i = 2: start with smallest = 2. Scan the remaining suffix.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "2": [
                "i",
                "smallest"
              ]
            },
            "active": [],
            "done": [
              0,
              1
            ],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "smallest": "2"
        }
      },
      {
        "text": "j = 3: compare 4 with candidate 3. Keep smallest = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "2": [
                "i",
                "smallest"
              ],
              "3": [
                "j"
              ]
            },
            "active": [
              3,
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
          "i": "2",
          "j": "3",
          "smallest": "2"
        }
      },
      {
        "text": "Swap indices 2 and 2. Position 2 is now final.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "2": [
                "i",
                "smallest"
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
          "i": "2"
        }
      },
      {
        "text": "The last remaining value is also in its final position.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {},
            "active": [],
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
          "result": "[1, 2, 3, 4]"
        }
      }
    ]
  },
  "merge": {
    "title": "Split the list, then merge sorted halves",
    "intro": "nums = [4, 1, 3, 2]; indices reset within each subproblem",
    "frames": [
      {
        "text": "Depth 0: sort [4, 1, 3, 2]. Split at mid = 2.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "0"
        }
      },
      {
        "text": "Depth 1: sort [4, 1]. Split at mid = 1.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              4,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1"
        }
      },
      {
        "text": "Depth 2: sort [4]. A list of length 0 or 1 is already sorted.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "2"
        }
      },
      {
        "text": "Depth 2: sort [1]. A list of length 0 or 1 is already sorted.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "2"
        }
      },
      {
        "text": "Depth 1: both halves are sorted. Merge them with i = j = 0. Indices are local to each half.",
        "rows": [
          {
            "label": "left",
            "values": [
              4
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
            "label": "right",
            "values": [
              1
            ],
            "marks": {
              "0": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1",
          "i": "0",
          "j": "0"
        }
      },
      {
        "text": "right[0] = 1 < left[0] = 4. Append 1; advance j to 1.",
        "rows": [
          {
            "label": "left",
            "values": [
              4
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
            "label": "right",
            "values": [
              1
            ],
            "marks": {
              "1": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1",
          "i": "0",
          "j": "1"
        }
      },
      {
        "text": "The right half is exhausted. Append left[0] = 4; i becomes 1.",
        "rows": [
          {
            "label": "left",
            "values": [
              4
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
            "label": "right",
            "values": [
              1
            ],
            "marks": {
              "1": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              1,
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1",
          "i": "1",
          "j": "1"
        }
      },
      {
        "text": "Depth 1: return the merged list [1, 4].",
        "rows": [
          {
            "label": "merged result",
            "values": [
              1,
              4
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
          "depth": "1"
        }
      },
      {
        "text": "Depth 1: sort [3, 2]. Split at mid = 1.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1"
        }
      },
      {
        "text": "Depth 2: sort [3]. A list of length 0 or 1 is already sorted.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "2"
        }
      },
      {
        "text": "Depth 2: sort [2]. A list of length 0 or 1 is already sorted.",
        "rows": [
          {
            "label": "current subproblem",
            "values": [
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "2"
        }
      },
      {
        "text": "Depth 1: both halves are sorted. Merge them with i = j = 0. Indices are local to each half.",
        "rows": [
          {
            "label": "left",
            "values": [
              3
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
            "label": "right",
            "values": [
              2
            ],
            "marks": {
              "0": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1",
          "i": "0",
          "j": "0"
        }
      },
      {
        "text": "right[0] = 2 < left[0] = 3. Append 2; advance j to 1.",
        "rows": [
          {
            "label": "left",
            "values": [
              3
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
            "label": "right",
            "values": [
              2
            ],
            "marks": {
              "1": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1",
          "i": "0",
          "j": "1"
        }
      },
      {
        "text": "The right half is exhausted. Append left[0] = 3; i becomes 1.",
        "rows": [
          {
            "label": "left",
            "values": [
              3
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
            "label": "right",
            "values": [
              2
            ],
            "marks": {
              "1": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              2,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "1",
          "i": "1",
          "j": "1"
        }
      },
      {
        "text": "Depth 1: return the merged list [2, 3].",
        "rows": [
          {
            "label": "merged result",
            "values": [
              2,
              3
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
          "depth": "1"
        }
      },
      {
        "text": "Depth 0: both halves are sorted. Merge them with i = j = 0. Indices are local to each half.",
        "rows": [
          {
            "label": "left",
            "values": [
              1,
              4
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
            "label": "right",
            "values": [
              2,
              3
            ],
            "marks": {
              "0": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "0",
          "i": "0",
          "j": "0"
        }
      },
      {
        "text": "left[0] = 1 <= right[0] = 2. Append 1; advance i to 1.",
        "rows": [
          {
            "label": "left",
            "values": [
              1,
              4
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
            "label": "right",
            "values": [
              2,
              3
            ],
            "marks": {
              "0": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "0",
          "i": "1",
          "j": "0"
        }
      },
      {
        "text": "right[0] = 2 < left[1] = 4. Append 2; advance j to 1.",
        "rows": [
          {
            "label": "left",
            "values": [
              1,
              4
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
            "label": "right",
            "values": [
              2,
              3
            ],
            "marks": {
              "1": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              1,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "0",
          "i": "1",
          "j": "1"
        }
      },
      {
        "text": "right[1] = 3 < left[1] = 4. Append 3; advance j to 2.",
        "rows": [
          {
            "label": "left",
            "values": [
              1,
              4
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
            "label": "right",
            "values": [
              2,
              3
            ],
            "marks": {
              "2": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              1,
              2,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "0",
          "i": "1",
          "j": "2"
        }
      },
      {
        "text": "The right half is exhausted. Append left[1] = 4; i becomes 2.",
        "rows": [
          {
            "label": "left",
            "values": [
              1,
              4
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
            "label": "right",
            "values": [
              2,
              3
            ],
            "marks": {
              "2": [
                "j"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "result",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "depth": "0",
          "i": "2",
          "j": "2"
        }
      },
      {
        "text": "Depth 0: return the merged list [1, 2, 3, 4].",
        "rows": [
          {
            "label": "merged result",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {},
            "active": [],
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
          "depth": "0"
        }
      }
    ]
  },
  "bubble": {
    "title": "Move the largest remaining value to the right",
    "intro": "nums = [4, 1, 3, 2]",
    "frames": [
      {
        "text": "Compare neighbors from left to right. Each pass fixes the largest remaining value at end.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "Start a pass with end = 3 and swapped = False.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "3": [
                "end"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "end": "3"
        }
      },
      {
        "text": "j = 0: 4 > 1, so swap positions 0 and 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "0": [
                "j"
              ],
              "1": [
                "j+1"
              ],
              "3": [
                "end"
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
          "end": "3",
          "j": "0",
          "swapped": "True"
        }
      },
      {
        "text": "j = 1: 4 > 3, so swap positions 1 and 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              4,
              2
            ],
            "marks": {
              "1": [
                "j"
              ],
              "2": [
                "j+1"
              ],
              "3": [
                "end"
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
          "end": "3",
          "j": "1",
          "swapped": "True"
        }
      },
      {
        "text": "j = 2: 4 > 2, so swap positions 2 and 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              4
            ],
            "marks": {
              "2": [
                "j"
              ],
              "3": [
                "j+1",
                "end"
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
          "end": "3",
          "j": "2",
          "swapped": "True"
        }
      },
      {
        "text": "Position 3 is final. Shorten the next pass by one position.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              4
            ],
            "marks": {
              "3": [
                "end"
              ]
            },
            "active": [],
            "done": [
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "3",
          "swapped": "True"
        }
      },
      {
        "text": "Start a pass with end = 2 and swapped = False.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              4
            ],
            "marks": {
              "2": [
                "end"
              ]
            },
            "active": [],
            "done": [
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "2"
        }
      },
      {
        "text": "j = 0: 1 <= 3, so keep this pair unchanged.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              4
            ],
            "marks": {
              "0": [
                "j"
              ],
              "1": [
                "j+1"
              ],
              "2": [
                "end"
              ]
            },
            "active": [
              0,
              1
            ],
            "done": [
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "2",
          "j": "0",
          "swapped": "False"
        }
      },
      {
        "text": "j = 1: 3 > 2, so swap positions 1 and 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "1": [
                "j"
              ],
              "2": [
                "j+1",
                "end"
              ]
            },
            "active": [
              1,
              2
            ],
            "done": [
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "2",
          "j": "1",
          "swapped": "True"
        }
      },
      {
        "text": "Position 2 is final. Shorten the next pass by one position.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "2": [
                "end"
              ]
            },
            "active": [],
            "done": [
              2,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "2",
          "swapped": "True"
        }
      },
      {
        "text": "Start a pass with end = 1 and swapped = False.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "1": [
                "end"
              ]
            },
            "active": [],
            "done": [
              2,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "1"
        }
      },
      {
        "text": "j = 0: 1 <= 2, so keep this pair unchanged.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "0": [
                "j"
              ],
              "1": [
                "j+1",
                "end"
              ]
            },
            "active": [
              0,
              1
            ],
            "done": [
              2,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "1",
          "j": "0",
          "swapped": "False"
        }
      },
      {
        "text": "Position 1 is final. No swaps occurred: the whole array is sorted, so stop.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "1": [
                "end"
              ]
            },
            "active": [],
            "done": [
              1,
              2,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "end": "1",
          "swapped": "False"
        }
      },
      {
        "text": "Return with the original list sorted.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {},
            "active": [],
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
          "result": "[1, 2, 3, 4]"
        }
      }
    ]
  },
  "bucket": {
    "title": "Distribute, sort locally, concatenate",
    "intro": "nums = [0.42, 0.12, 0.37, 0.09, 0.81], b = 5",
    "frames": [
      {
        "text": "Create 5 ordered buckets covering [0, 1). Each has width 0.2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              0.42,
              0.12,
              0.37,
              0.09,
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "b": "5"
        }
      },
      {
        "text": "Index 0: floor(0.42 × 5) = 2. Append 0.42 to bucket 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              0.42,
              0.12,
              0.37,
              0.09,
              0.81
            ],
            "marks": {
              "0": [
                "scan"
              ]
            },
            "active": [
              0
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "2"
        }
      },
      {
        "text": "Index 1: floor(0.12 × 5) = 0. Append 0.12 to bucket 0.",
        "rows": [
          {
            "label": "nums",
            "values": [
              0.42,
              0.12,
              0.37,
              0.09,
              0.81
            ],
            "marks": {
              "1": [
                "scan"
              ]
            },
            "active": [
              1
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "0"
        }
      },
      {
        "text": "Index 2: floor(0.37 × 5) = 1. Append 0.37 to bucket 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              0.42,
              0.12,
              0.37,
              0.09,
              0.81
            ],
            "marks": {
              "2": [
                "scan"
              ]
            },
            "active": [
              2
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "1"
        }
      },
      {
        "text": "Index 3: floor(0.09 × 5) = 0. Append 0.09 to bucket 0.",
        "rows": [
          {
            "label": "nums",
            "values": [
              0.42,
              0.12,
              0.37,
              0.09,
              0.81
            ],
            "marks": {
              "3": [
                "scan"
              ]
            },
            "active": [
              3
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.12,
              0.09
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "0"
        }
      },
      {
        "text": "Index 4: floor(0.81 × 5) = 4. Append 0.81 to bucket 4.",
        "rows": [
          {
            "label": "nums",
            "values": [
              0.42,
              0.12,
              0.37,
              0.09,
              0.81
            ],
            "marks": {
              "4": [
                "scan"
              ]
            },
            "active": [
              4
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.12,
              0.09
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "4"
        }
      },
      {
        "text": "Sort bucket 0 using insertion sort. Current values: [0.12, 0.09].",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.12,
              0.09
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "0"
        }
      },
      {
        "text": "Bucket 0: key = 0.09; shift 0.12 right and decrement j to -1.",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.12,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "0",
          "key": "0.09",
          "i": "1",
          "j": "-1"
        }
      },
      {
        "text": "Bucket 0: place key 0.09 at local index 0.",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "0",
          "key": "0.09"
        }
      },
      {
        "text": "Append sorted bucket 0 to the output. Bucket order already guarantees the order between buckets.",
        "rows": [
          {
            "label": "output",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "0"
        }
      },
      {
        "text": "Sort bucket 1 using insertion sort. Current values: [0.37].",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "1"
        }
      },
      {
        "text": "Append sorted bucket 1 to the output. Bucket order already guarantees the order between buckets.",
        "rows": [
          {
            "label": "output",
            "values": [
              0.09,
              0.12,
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "1"
        }
      },
      {
        "text": "Sort bucket 2 using insertion sort. Current values: [0.42].",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "2"
        }
      },
      {
        "text": "Append sorted bucket 2 to the output. Bucket order already guarantees the order between buckets.",
        "rows": [
          {
            "label": "output",
            "values": [
              0.09,
              0.12,
              0.37,
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "2"
        }
      },
      {
        "text": "Sort bucket 3 using insertion sort. Current values: [].",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "3"
        }
      },
      {
        "text": "Append sorted bucket 3 to the output. Bucket order already guarantees the order between buckets.",
        "rows": [
          {
            "label": "output",
            "values": [
              0.09,
              0.12,
              0.37,
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "3"
        }
      },
      {
        "text": "Sort bucket 4 using insertion sort. Current values: [0.81].",
        "rows": [
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "4"
        }
      },
      {
        "text": "Append sorted bucket 4 to the output. Bucket order already guarantees the order between buckets.",
        "rows": [
          {
            "label": "output",
            "values": [
              0.09,
              0.12,
              0.37,
              0.42,
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 0 [0, 0.2)",
            "values": [
              0.09,
              0.12
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 1 [0.2, 0.4)",
            "values": [
              0.37
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 2 [0.4, 0.6)",
            "values": [
              0.42
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 3 [0.6, 0.8)",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "bucket 4 [0.8, 1)",
            "values": [
              0.81
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "bucket": "4"
        }
      }
    ]
  },
  "quick": {
    "title": "Partition around the final value",
    "intro": "nums = [4, 1, 3, 2]",
    "frames": [
      {
        "text": "Use the final value of each active interval as its pivot. Quicksort intervals here include both lo and hi.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "Partition [0, 3] around pivot = nums[3] = 2. i = 0 starts the region for values below the pivot.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "0": [
                "lo",
                "i"
              ],
              "3": [
                "hi/pivot"
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
          "lo": "0",
          "hi": "3",
          "pivot": "2",
          "i": "0",
          "depth": "0"
        }
      },
      {
        "text": "j = 0: 4 >= 2. Leave it in the right-side region; i remains 0.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              3,
              2
            ],
            "marks": {
              "0": [
                "i",
                "j"
              ],
              "3": [
                "pivot"
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
          "lo": "0",
          "hi": "3",
          "i": "0",
          "j": "0",
          "pivot": "2",
          "depth": "0"
        }
      },
      {
        "text": "j = 1: 1 < 2. Swap indices 0 and 1, then move i to 1. The region [lo, i) contains values below the pivot.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i",
                "j"
              ],
              "3": [
                "pivot"
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
          "lo": "0",
          "hi": "3",
          "i": "1",
          "j": "1",
          "pivot": "2",
          "depth": "0"
        }
      },
      {
        "text": "j = 2: 3 >= 2. Leave it in the right-side region; i remains 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              4,
              3,
              2
            ],
            "marks": {
              "1": [
                "i"
              ],
              "2": [
                "j"
              ],
              "3": [
                "pivot"
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
          "lo": "0",
          "hi": "3",
          "i": "1",
          "j": "2",
          "pivot": "2",
          "depth": "0"
        }
      },
      {
        "text": "Swap the pivot at 3 into index 1. This pivot position is final. Recurse on [0, 0] and [2, 3], excluding the pivot.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "1": [
                "p"
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
          "p": "1",
          "lo": "0",
          "hi": "3",
          "depth": "0"
        }
      },
      {
        "text": "Interval [0, 0] has one element. It is already placed.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
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
          "lo": "0",
          "hi": "0",
          "depth": "1"
        }
      },
      {
        "text": "Partition [2, 3] around pivot = nums[3] = 4. i = 2 starts the region for values below the pivot.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "2": [
                "lo",
                "i"
              ],
              "3": [
                "hi/pivot"
              ]
            },
            "active": [
              2,
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
          "lo": "2",
          "hi": "3",
          "pivot": "4",
          "i": "2",
          "depth": "1"
        }
      },
      {
        "text": "j = 2: 3 < 4. Swap indices 2 and 2, then move i to 3. The region [lo, i) contains values below the pivot.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "3": [
                "i",
                "pivot"
              ],
              "2": [
                "j"
              ]
            },
            "active": [
              2,
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
          "lo": "2",
          "hi": "3",
          "i": "3",
          "j": "2",
          "pivot": "4",
          "depth": "1"
        }
      },
      {
        "text": "Swap the pivot at 3 into index 3. This pivot position is final. Recurse on [2, 2] and [4, 3], excluding the pivot.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {
              "3": [
                "p"
              ]
            },
            "active": [],
            "done": [
              0,
              1,
              3
            ],
            "indexed": true
          }
        ],
        "state": {
          "p": "3",
          "lo": "2",
          "hi": "3",
          "depth": "1"
        }
      },
      {
        "text": "Interval [2, 2] has one element. It is already placed.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {},
            "active": [],
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
          "lo": "2",
          "hi": "2",
          "depth": "2"
        }
      },
      {
        "text": "Every partition is complete. The original list is sorted.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              2,
              3,
              4
            ],
            "marks": {},
            "active": [],
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
          "result": "[1, 2, 3, 4]"
        }
      }
    ]
  }
});
