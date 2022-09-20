import fs from 'fs/promises'
import Path from 'path'
import axios from 'axios'
import { createOrUpdate } from './contentful-client.mjs'

const backendEndpoint = 'https://freefrom-map-api.herokuapp.com'
const localDataDir = 'scripts/localData'

let inited = false

async function init() {
    if (inited) return
    fs.mkdir(localDataDir, { recursive: true })
    inited = true
}

async function get(path) {
    await init()
    const filename = path.replace(/[?/=]/g, '-') + '.json'
    const filePath = Path.join(localDataDir, filename)
    try {
        const rawData = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(rawData)
    } catch (err) {
        if (err.code !== 'ENOENT') throw err
        console.log(`fetching ${path}...`)
        const { data } = await axios.get(`${backendEndpoint}/${path}`)
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
        return data
    }
}


async function run() {


    // import the categories

    const cats = await get('categories?withCriteria=true')
    
    for (const cat of cats) {
        const ideal_criteria = []
        const adverse_criteria = []
        for (const crit of cat.criteria) {
            await createOrUpdate('criteria', { id: crit.id, text: crit.title }, ['text'])
            const critRef = { linkType: 'criteria', id: crit.id }
            if (crit.adverse) adverse_criteria.push(critRef)
            else ideal_criteria.push(critRef)
        }

        await createOrUpdate('category', cat, ['title', 'help_text'], { ideal_criteria, adverse_criteria })    
    }

    // import the states

    const states = await get('states?details=true')

    // const s = states[0]
    for (const s of states) {
        // make a state category entry for each cat

        const stateCategoryRefs = []

        for (const sc of s.category_grades) {
            const cat = cats.find(c => c.id === sc.category_id)
            const category = { linkType: 'category', id: cat.id }

            const stateCat = {
                id: `${s.code}${sc.category_id}`.toLowerCase(),
                internalTitle: `${s.code}: ${cat.title.slice(0, 20)}`,
                grade: sc.grade
            }

            stateCategoryRefs.push({
                linkType: 'state_category',
                id: stateCat.id
            })

            // and add the criteria scores for this category
            const criteria_met = []
            const criteria_maybe_met = []
            const criteria_not_met = []

            for (const critScore of s.criterion_scores) {
                // look it up to make sure it's in this category
                const inCategory = !!cat.criteria.find(c => c.id === critScore.criterion_id)
                if (inCategory) {
                    const critRef = { linkType: 'criteria', id: critScore.criterion_id }
                    if (critScore.meets_criterion === 'yes') {
                        criteria_met.push(critRef)
                    } else if (critScore.meets_criterion === 'maybe') {
                        criteria_maybe_met.push(critRef)
                    } else if (critScore.meets_criterion === 'no') {
                        criteria_not_met.push(critRef)
                    }
                }
            }

            // and resource links
            const resource_links = []
            for (const link of s.resource_links.filter(r => r.category_id === sc.category_id)) {
                await createOrUpdate('resource_link', link, ['active', 'text', 'url'])
                resource_links.push({
                    linkType: 'resource_link',
                    id: link.id
                })
            }

            // and honorable mention
            const honorable_mentions = []
            for (const hm of s.honorable_mentions.filter(r => r.category_id === sc.category_id)) {
                await createOrUpdate('policy', hm, ['description', 'text', 'url'])
                honorable_mentions.push({
                    linkType: 'policy',
                    id: hm.id
                })
            }

            // and innovative policy ideas
            const innovative_policy_ideas = []
            for (const pi of s.innovative_policy_ideas.filter(r => r.category_id === sc.category_id)) {
                await createOrUpdate('policy', pi, ['description', 'text', 'url'])
                innovative_policy_ideas.push({
                    linkType: 'policy',
                    id: pi.id
                })
            }

            await createOrUpdate('state_category', stateCat, Object.keys(stateCat).filter(f => f !== 'id'), {
                category,
                criteria_met,
                criteria_maybe_met,
                criteria_not_met,
                resource_links,
                honorable_mentions,
                innovative_policy_ideas
            })

        }

        s.grade = s.grade.grade
        s.id = s.code
        // now save the state itself
        await createOrUpdate('state', s, ['name', 'code', 'quote', 'total', 'grade'], { categories: stateCategoryRefs })
    }

}

run().catch(console.error)