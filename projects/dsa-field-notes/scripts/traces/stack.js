window.DSA_TRACES = Object.assign(window.DSA_TRACES || {}, {
  "brackets": {
    "title": "Close the most recent open group",
    "intro": "text = '([])'",
    "frames": [
      {
        "text": "The stack holds opening brackets that have not yet been closed. The top is on the right.",
        "rows": [
          {
            "label": "text",
            "values": [
              "(",
              "[",
              "]",
              ")"
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "stack",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "i = 0: '(' opens a group. Push it onto the stack.",
        "rows": [
          {
            "label": "text",
            "values": [
              "(",
              "[",
              "]",
              ")"
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
            "label": "stack",
            "values": [
              "("
            ],
            "marks": {
              "0": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "i = 1: '[' opens a group. Push it onto the stack.",
        "rows": [
          {
            "label": "text",
            "values": [
              "(",
              "[",
              "]",
              ")"
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
            "label": "stack",
            "values": [
              "(",
              "["
            ],
            "marks": {
              "1": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "i = 2: ']' closes a group. Pop '['; it matches the required '['.",
        "rows": [
          {
            "label": "text",
            "values": [
              "(",
              "[",
              "]",
              ")"
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
            "label": "stack",
            "values": [
              "("
            ],
            "marks": {
              "0": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "i = 3: ')' closes a group. Pop '('; it matches the required '('.",
        "rows": [
          {
            "label": "text",
            "values": [
              "(",
              "[",
              "]",
              ")"
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
            "label": "stack",
            "values": [],
            "marks": {
              "-1": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {}
      },
      {
        "text": "No unmatched opening brackets remain. Return True.",
        "rows": [
          {
            "label": "text",
            "values": [
              "(",
              "[",
              "]",
              ")"
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
          },
          {
            "label": "stack",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "result": "True"
        }
      }
    ]
  },
  "next_greater": {
    "title": "Resolve pending answers with a monotonic stack",
    "intro": "nums = [2, 1, 3]",
    "frames": [
      {
        "text": "Store unresolved indices, not just their values. None means that no greater value has been found.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "stack indices",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              null,
              null
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
        "text": "i = 0: value = 2. Resolve smaller values on top of the stack first.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
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
          },
          {
            "label": "stack indices",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              null,
              null
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0",
          "value": "2"
        }
      },
      {
        "text": "Push index 0. Its next greater value is still unknown.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
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
            "label": "stack indices",
            "values": [
              0
            ],
            "marks": {
              "0": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              null,
              null
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "0"
        }
      },
      {
        "text": "i = 1: value = 1. Resolve smaller values on top of the stack first.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
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
            "label": "stack indices",
            "values": [
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              null,
              null
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "1",
          "value": "1"
        }
      },
      {
        "text": "Push index 1. Its next greater value is still unknown.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
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
            "label": "stack indices",
            "values": [
              0,
              1
            ],
            "marks": {
              "1": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              null,
              null
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "1"
        }
      },
      {
        "text": "i = 2: value = 3. Resolve smaller values on top of the stack first.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
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
            "label": "stack indices",
            "values": [
              0,
              1
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              null,
              null
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "value": "3"
        }
      },
      {
        "text": "Pop index 1, whose value is 1. The first greater value to its right is 3; write answer[1] = 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              3
            ],
            "marks": {
              "2": [
                "i"
              ],
              "1": [
                "j"
              ]
            },
            "active": [
              2,
              1
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "stack indices",
            "values": [
              0
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              null,
              3,
              null
            ],
            "marks": {},
            "active": [
              1
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "j": "1"
        }
      },
      {
        "text": "Pop index 0, whose value is 2. The first greater value to its right is 3; write answer[0] = 3.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              3
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
              2,
              0
            ],
            "done": [],
            "indexed": true
          },
          {
            "label": "stack indices",
            "values": [],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              3,
              3,
              null
            ],
            "marks": {},
            "active": [
              0
            ],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "i": "2",
          "j": "0"
        }
      },
      {
        "text": "Push index 2. Its next greater value is still unknown.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
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
            "label": "stack indices",
            "values": [
              2
            ],
            "marks": {
              "0": [
                "top"
              ]
            },
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              3,
              3,
              null
            ],
            "marks": {},
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
        "text": "The remaining index has no greater value to its right. Leave its answer as None.",
        "rows": [
          {
            "label": "nums",
            "values": [
              2,
              1,
              3
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          },
          {
            "label": "answer",
            "values": [
              3,
              3,
              null
            ],
            "marks": {},
            "active": [],
            "done": [],
            "indexed": true
          }
        ],
        "state": {
          "result": "[3, 3, None]"
        }
      }
    ]
  }
});
