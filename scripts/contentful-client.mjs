import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import contentful from 'contentful-management'

let client

export async function getClient() {
    if (!client) {
        client = contentful.createClient({
            accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
        })    
    }
    return client
}

export async function getSpace() {
    const c = await getClient()
    return c.getSpace(process.env.CONTENTFUL_SPACE_ID)
}

export async function getEnvironment() {
    const s = await getSpace()
    return s.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT)
}

export function prefixId(resourceType, obj) {
    if (!resourceType || !obj || !obj.id) throw new Error('Need both resourceType and obj.id')
    const prefix = resourceType === 'state_category' ? 'sct' : resourceType.slice(0,3)
    return `${prefix}${obj.id}`
}

export async function createOrUpdate(resourceType, obj, fields=[], relations=[]) {
    const content = await getEnvironment()

    const id = prefixId(resourceType, obj)

    const fieldData = {}
    for (const f of fields) {
        fieldData[f] = { 'en-US': obj[f] }
    }
    for (const [k,v] of Object.entries(relations)) {
        // this could be a direct reference or a list
        const isList = Array.isArray(v)
        const vals = isList ? v : [v]
        let payload = []
        for (const r of vals) {
            payload.push({
                sys: {
                    id: prefixId(r.linkType, { id: r.id }),
                    linkType: 'Entry',
                    type: 'Link'        
                }
            })
        }
        fieldData[k] = {
            'en-US': isList ? payload : payload[0]
        }
    }

    let e = await content.getEntry(id).catch(e => {
        if (e.name !== 'NotFound') throw e
    })
    console.log("existing entry is", JSON.stringify(e, null, 2))
    // either create or update
    if (e) {
        if (!process.env.SKIP_UPDATE) {
            console.log("updating entry...")
            e.fields = fieldData
            await e.update()    
            e = await content.getEntry(id)
            await e.publish()        
        }
    } else {
        console.log(`creating new entry ${id}`)
        await content.createEntryWithId(resourceType, id, {
            fields: fieldData
        })
        e = await content.getEntry(id)
        await e.publish()
    }

}