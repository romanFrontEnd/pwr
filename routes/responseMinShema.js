export default {
  schema: {
    response: {
      200: {
        "type": "array",
        "items": {
          "properties": {
            "name": {
              "type": "string",
              "examples": [
                "Hello-World"
              ]
            },
            "owner": {
              "properties": {
                "login": {
                  "type": "string",
                  "examples": [
                    "octocat"
                  ]
                }
              }
            },
            "fork": {
              "type": "boolean"
            }
          }
        }
      }
    }
  }
}