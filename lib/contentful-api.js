import { capitalCase } from "change-case"

const STATE_NAMES_QUERY = `query {
    stateCollection(limit:51) {
      items {
        name
      }
    }
  }`

const STATES_QUERY = `query {
    stateCollection(limit:50) {
      items {
        code
        name
        grade
        total
      }
    }
  }`

const STATE_QUERY = `query stateDetails($code: String, $name: String) {
  
    stateCollection(where: { OR:[ {code:$code}, { name:$name } ]} limit:1) {
      items {
        name
        ...on State {
          code
          name
          quote
          grade
          categoriesCollection {
            items {
              category {
                sys { id }
                title
              }
              resourceLinksCollection(limit:10) {
                items {
                  sys { id }
                  ...on ResourceLink {
                    text
                    url
                    active
                  }
                }
              }
              grade
              criteriaMetCollection(limit:10) {
                items {
                  ...on Criteria {
                    sys { id }
                  }
                }
              }
              criteriaNotMetCollection(limit:10) {
                items {
                  ...on Criteria {
                    sys { id }
                  }
                }
              }
              criteriaMaybeMetCollection(limit:10) {
                items {
                  ...on Criteria {
                    sys { id }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`

const STATE_POLICIES_QUERY = `query stateDetails($code: String, $name: String) {
  
    stateCollection(where: { OR:[ {code:$code}, {} { name:$name } ]} limit:1) {
      items {
        name
        code
        ...on State {
          name
          quote
          categoriesCollection(limit:100) {
            items {
              category {
                sys { id }
              }
              innovativePolicyIdeasCollection(limit:20) {
                items {
                  ...on Policy {
                    ...PolicyData
                  }
                }
              }
              honorableMentionsCollection(limit:20) {
                items {
                  ...on Policy {
                    ...PolicyData
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  fragment PolicyData on Policy {
  	sys { id }
    description
    text
    url
  }`

const CATEGORIES_QUERY = `query {
    categoryCollection {
      items {
        sys { id }
        title
        helpText
        idealCriteriaCollection(limit:50) {
          items { ...criteriaData }
        }
        adverseCriteriaCollection(limit:50) {
          items { ...criteriaData }
        }
      }
    }
  }
  
  fragment criteriaData on Criteria {
    sys {
      id
    }
    ...on Criteria {
      text
    }
  }
`

if (!process.env.NEXT_CONTENTFUL_API_ENDPOINT) throw new Error('Missing NEXT_CONTENTFUL_API_ENDPOINT')
if (!process.env.CONTENTFUL_ACCESS_TOKEN) throw new Error('Missing CONTENTFUL_ACCESS_TOKEN')

export async function fetchGraphQL(query, variables) {
    return fetch(
        process.env.NEXT_CONTENTFUL_API_ENDPOINT,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query, variables }),
        }
    ).then((response) => response.json())
        .then(json => {
            if (!json.data) throw new Error(JSON.stringify(json.errors.map(e => e.message).join(", "), null, 2))
            return json
        })
}

export async function getStateNames() {
    const res = await fetchGraphQL(STATE_NAMES_QUERY)
    return res.data.stateCollection.items
}

export async function getStates() {
    const res = await fetchGraphQL(STATES_QUERY)
    return res.data.stateCollection.items
}

export async function getCategories() {
    const res = await fetchGraphQL(CATEGORIES_QUERY)
    const categories = res.data.categoryCollection.items.map(cat => {
        const criteria = []
        for (const crit of cat.idealCriteriaCollection.items) {
            criteria.push({
                id: crit.sys.id,
                adverse: false,
                title: crit.text
            })
        }
        for (const crit of cat.adverseCriteriaCollection.items) {
            criteria.push({
                id: crit.sys.id,
                adverse: true,
                title: crit.text
            })
        }
        return {
            id: cat.sys.id,
            title: cat.title,
            help_text: cat.helpText,
            criteria
        }
    })
    return categories.sort((a,b) => a.id < b.id ? -1 : 1)
}

function normalizeStateName(name) {
    return capitalCase(name).replace('Of', 'of')
}

async function getStatePolicyDetails({ code, name }) {
    // can provide either code or name
    const res = await fetchGraphQL(STATE_POLICIES_QUERY, {
        code: code ? code.toUpperCase() : undefined,
        name: name ? normalizeStateName(name) : undefined
    })
    const state = res.data.stateCollection.items[0]
    const honorable_mentions = []
    const innovative_policy_ideas = []
    for (const cat of state.categoriesCollection.items) {
        for (const p of cat.honorableMentionsCollection.items) {
            honorable_mentions.push({
                category_id: cat.category.sys.id,
                description: p.description,
                text: p.text,
                url: p.url
            })
        }
        for (const p of cat.innovativePolicyIdeasCollection.items) {
            innovative_policy_ideas.push({
                category_id: cat.category.sys.id,
                description: p.description,
                text: p.text,
                url: p.url
            })
        }
    }
    return {
        honorable_mentions,
        innovative_policy_ideas
    }
}

export async function getStateDetails({ code, name }) {
    // can provide either code or name
    const vars = {
        code: code ? code.toUpperCase() : undefined,
        name: name ? normalizeStateName(name) : undefined
    }
    const [res, policies] = await Promise.all([
        fetchGraphQL(STATE_QUERY, vars),
        getStatePolicyDetails({ code, name })
    ])

    const s = res.data.stateCollection.items[0]

    const resource_links = []
    const category_grades = []
    const criterion_scores = []

    const { honorable_mentions, innovative_policy_ideas } = policies

    for (const cat of s.categoriesCollection.items) {

        const category_id = cat.category.sys.id

        for (const r of cat.resourceLinksCollection.items) {
            resource_links.push({
                id: r.sys.id,
                state: s.code,
                category_id,
                text: r.text,
                url: r.url,
                active: r.active
            })
        }

        for (const c of cat.criteriaMetCollection.items) {
            criterion_scores.push({
                criterion_id: c.sys.id,
                meets_criterion: "yes",
                state: s.code
            })
        }

        for (const c of cat.criteriaNotMetCollection.items) {
            criterion_scores.push({
                criterion_id: c.sys.id,
                meets_criterion: "no",
                state: s.code
            })
        }

        for (const c of cat.criteriaMaybeMetCollection.items) {
            criterion_scores.push({
                criterion_id: c.sys.id,
                meets_criterion: "maybe",
                state: s.code
            })
        }

        category_grades.push({
            category_id,
            code: s.code,
            grade: cat.grade
        })
    }

    return {
        name: s.name,
        quote: s.quote,
        grade: s.grade,
        criterion_scores,
        category_grades,
        honorable_mentions,
        innovative_policy_ideas,
        resource_links
    }
}