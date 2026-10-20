window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "bfs": {
    "title": "Discover each vertex when it enters the queue",
    "intro": "Edges: 0 → 1, 2; 1 → 3; 2 → 3",
    "frames": [
      {
        "text": "Enqueue vertex 0 and mark it discovered with distance 0.",
        "rows": [
          {
            "label": "queue",
            "values": [
              0
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "graph": "0 → 1, 2; 1 → 3; 2 → 3"
        }
      },
      {
        "text": "Dequeue vertex 0 from the front. Its distance is 0.",
        "rows": [
          {
            "label": "queue",
            "values": [],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "0"
        }
      },
      {
        "text": "Neighbor 1 is new. Set distance[1] = 0 + 1 = 1, then enqueue it at the back.",
        "rows": [
          {
            "label": "queue",
            "values": [
              1
            ],
            "marks": {
              "0": [
                "front",
                "back"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "0",
          "neighbor": "1"
        }
      },
      {
        "text": "Neighbor 2 is new. Set distance[2] = 0 + 1 = 1, then enqueue it at the back.",
        "rows": [
          {
            "label": "queue",
            "values": [
              1,
              2
            ],
            "marks": {
              "0": [
                "front"
              ],
              "1": [
                "back"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "0",
          "neighbor": "2"
        }
      },
      {
        "text": "Dequeue vertex 1 from the front. Its distance is 1.",
        "rows": [
          {
            "label": "queue",
            "values": [
              2
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "1"
        }
      },
      {
        "text": "Neighbor 3 is new. Set distance[3] = 1 + 1 = 2, then enqueue it at the back.",
        "rows": [
          {
            "label": "queue",
            "values": [
              2,
              3
            ],
            "marks": {
              "0": [
                "front"
              ],
              "1": [
                "back"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1",
              "3 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "1",
          "neighbor": "3"
        }
      },
      {
        "text": "Dequeue vertex 2 from the front. Its distance is 1.",
        "rows": [
          {
            "label": "queue",
            "values": [
              3
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1",
              "3 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "2"
        }
      },
      {
        "text": "Neighbor 3 is already discovered. Do not enqueue it again.",
        "rows": [
          {
            "label": "queue",
            "values": [
              3
            ],
            "marks": {
              "0": [
                "front",
                "back"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1",
              "3 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "2",
          "neighbor": "3"
        }
      },
      {
        "text": "Dequeue vertex 3 from the front. Its distance is 2.",
        "rows": [
          {
            "label": "queue",
            "values": [],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1",
              "3 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "node": "3"
        }
      },
      {
        "text": "The queue is empty. Each distance is the minimum number of edges from vertex 0.",
        "rows": [
          {
            "label": "vertex → distance",
            "values": [
              "0 → 0",
              "1 → 1",
              "2 → 1",
              "3 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "result": "{0: 0, 1: 1, 2: 1, 3: 2}"
        }
      }
    ]
  },
  "deque_max": {
    "title": "Remove expired and dominated candidates",
    "intro": "nums = [1, 3, 2, 5, 4], k = 3",
    "frames": [
      {
        "text": "The deque stores candidate indices in decreasing value order. Its front will hold the window maximum.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "candidate indices",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "k": "3"
        }
      },
      {
        "text": "Append index 0. Candidates from front to back now have values [1].",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
              "0": [
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
            "label": "candidate indices",
            "values": [
              0
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "0"
        }
      },
      {
        "text": "right = 1: 3 is at least as large as nums[0] = 1 and expires later. Remove index 0 from the back.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
            "label": "candidate indices",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "1"
        }
      },
      {
        "text": "Append index 1. Candidates from front to back now have values [3].",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
            "label": "candidate indices",
            "values": [
              1
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "1"
        }
      },
      {
        "text": "Append index 2. Candidates from front to back now have values [3, 2].",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
          },
          {
            "label": "candidate indices",
            "values": [
              1,
              2
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "2"
        }
      },
      {
        "text": "Window [0, 2] is complete. Its maximum is nums[1] = 3; append it to the output.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
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
          },
          {
            "label": "candidate indices",
            "values": [
              1,
              2
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
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
          "right": "2",
          "result": "[3]"
        }
      },
      {
        "text": "right = 3: 5 is at least as large as nums[2] = 2 and expires later. Remove index 2 from the back.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
          },
          {
            "label": "candidate indices",
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
          "right": "3"
        }
      },
      {
        "text": "right = 3: 5 is at least as large as nums[1] = 3 and expires later. Remove index 1 from the back.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
          },
          {
            "label": "candidate indices",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "3"
        }
      },
      {
        "text": "Append index 3. Candidates from front to back now have values [5].",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
          },
          {
            "label": "candidate indices",
            "values": [
              3
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
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
          "right": "3"
        }
      },
      {
        "text": "Window [1, 3] is complete. Its maximum is nums[3] = 5; append it to the output.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
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
          },
          {
            "label": "candidate indices",
            "values": [
              3
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [
              3,
              5
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "3",
          "result": "[3, 5]"
        }
      },
      {
        "text": "Append index 4. Candidates from front to back now have values [5, 4].",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
            ],
            "marks": {
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
          },
          {
            "label": "candidate indices",
            "values": [
              3,
              4
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [
              3,
              5
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "4"
        }
      },
      {
        "text": "Window [2, 4] is complete. Its maximum is nums[3] = 5; append it to the output.",
        "rows": [
          {
            "label": "nums",
            "values": [
              1,
              3,
              2,
              5,
              4
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
          },
          {
            "label": "candidate indices",
            "values": [
              3,
              4
            ],
            "marks": {
              "0": [
                "front"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "maxima",
            "values": [
              3,
              5,
              5
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "right": "4",
          "result": "[3, 5, 5]"
        }
      }
    ]
  }
});
