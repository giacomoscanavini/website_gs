window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "frequency": {
    "title": "Update a frequency table",
    "intro": "nums = [4, 2, 4, 4, 2]",
    "frames": [
      {
        "text": "Start with an empty dictionary. An absent value has frequency zero.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              2,
              4,
              4,
              2
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "counts",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {}
      },
      {
        "text": "At index 0, value = 4. Read count 0, add one, and store counts[4] = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              2,
              4,
              4,
              2
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
            "label": "value → count",
            "values": [
              "4 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "value": "4"
        }
      },
      {
        "text": "At index 1, value = 2. Read count 0, add one, and store counts[2] = 1.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              2,
              4,
              4,
              2
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
            "label": "value → count",
            "values": [
              "4 → 1",
              "2 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "value": "2"
        }
      },
      {
        "text": "At index 2, value = 4. Read count 1, add one, and store counts[4] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              2,
              4,
              4,
              2
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
            "label": "value → count",
            "values": [
              "4 → 2",
              "2 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "value": "4"
        }
      },
      {
        "text": "At index 3, value = 4. Read count 2, add one, and store counts[4] = 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              2,
              4,
              4,
              2
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
            "label": "value → count",
            "values": [
              "4 → 3",
              "2 → 1"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "value": "4"
        }
      },
      {
        "text": "At index 4, value = 2. Read count 1, add one, and store counts[2] = 2.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              2,
              4,
              4,
              2
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
            "label": "value → count",
            "values": [
              "4 → 3",
              "2 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "value": "2"
        }
      }
    ]
  },
  "hash_pair": {
    "title": "Look up the complement before inserting",
    "intro": "nums = [4, 1, 6, 3], target = 9",
    "frames": [
      {
        "text": "Store only earlier values, so an index cannot pair with itself.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
              3
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
          "target": "9"
        }
      },
      {
        "text": "i = 0: value = 4, so need = 9 - 4 = 5. Look for 5 among earlier values.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
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
          },
          {
            "label": "value → index",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "0",
          "value": "4",
          "need": "5"
        }
      },
      {
        "text": "No match yet. Store seen[4] = 0 for later iterations.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
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
            "label": "value → index",
            "values": [
              "4 → 0"
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
        "text": "i = 1: value = 1, so need = 9 - 1 = 8. Look for 8 among earlier values.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
              3
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
            "label": "value → index",
            "values": [
              "4 → 0"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "1",
          "value": "1",
          "need": "8"
        }
      },
      {
        "text": "No match yet. Store seen[1] = 1 for later iterations.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
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
            "label": "value → index",
            "values": [
              "4 → 0",
              "1 → 1"
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
        "text": "i = 2: value = 6, so need = 9 - 6 = 3. Look for 3 among earlier values.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
              3
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
            "label": "value → index",
            "values": [
              "4 → 0",
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
          "value": "6",
          "need": "3"
        }
      },
      {
        "text": "No match yet. Store seen[6] = 2 for later iterations.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
              3
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
            "label": "value → index",
            "values": [
              "4 → 0",
              "1 → 1",
              "6 → 2"
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
        "text": "i = 3: value = 3, so need = 9 - 3 = 6. Look for 6 among earlier values.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
              3
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
            "label": "value → index",
            "values": [
              "4 → 0",
              "1 → 1",
              "6 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "i": "3",
          "value": "3",
          "need": "6"
        }
      },
      {
        "text": "6 is stored at index 2. Return (2, 3); 6 + 3 = 9.",
        "rows": [
          {
            "label": "nums",
            "values": [
              4,
              1,
              6,
              3
            ],
            "marks": {},
            "active": [],
            "done": [
              2,
              3
            ],
            "indexed": true
          },
          {
            "label": "value → index",
            "values": [
              "4 → 0",
              "1 → 1",
              "6 → 2"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": false
          }
        ],
        "state": {
          "result": "(2, 3)"
        }
      }
    ]
  }
});
