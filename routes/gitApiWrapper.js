import ghGot from 'gh-got'; // github api wrapper node module
import ghApiShema from './responseShema.js'
import ghApiMinShema from './responseMinShema.js'

/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://www.fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
    const jwt = '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'; // github api token allow to use github API
    const ghOpts = {
        headers: {
            'authorization': `Bearer ${jwt}`,
            'accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        }
    };

    const paramsJsonSchema = {
        type: 'object',
        properties: {
            name: { type: 'string' }, // github user name you want to list repos
            forks: { type: 'boolean' }  // forks - true/false flag if you want to filter out all repos that are not forks. Default is false
        }
    }

    const headersJsonSchema = {
        type: 'object',
        properties: {
            'Accept:': { type: 'string' }
        },
        required: ['Accept']
    }
    const schema = {
        params: paramsJsonSchema,
        headers: headersJsonSchema
    }

    const opts = {
        schema: {
          response: {
            200: {
              type: 'array',
              items: {
                owner: {
                    "properties": {
                      "login": {
                        "type": "string",
                        "examples": [
                          "octocat"
                        ]
                      }
                    }
                  },
                  fork: {
                    "type": "boolean"
                  }
              }
            }
          }
        }
      }

    fastify.get('/', async (request, reply) => {
      return { hello: 'gitHub API Wrapper' }
    })
  
    fastify.get('/repos/:name/:forks', opts, async (request, reply) => {
        //return 'uname='+ request.params.userName + ' forks=' + request.params.forks;
        let uname = request.params.name;
        console.log(request.params.name + "  " +  request.params.forks);
        const {body} = await ghGot('users/'+ uname + '/repos', ghOpts); // get all user repos

        //console.log(body);
        
        return { sucess: true }
        const result = ''//await collection.findOne({ animal: request.params.animal })
        if (!result) {
        throw new Error('Invalid value')
        }
        return result
    })
  
}
  
export default routes;