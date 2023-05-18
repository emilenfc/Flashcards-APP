import { extendType, objectType,nonNull,stringArg } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";


export const Link = objectType({
    name: "Link",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("description");
        t.nonNull.string("url");
    }
})

let links: NexusGenObjects["Link"][] = [
    {
        id: 1,
        url: "www.howtographql.com",
        description: "Grapql official website"
    },
    {
        id: 2,
        url: "www.testing.com",
        description: "Official"
    }
];

export const LinkQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("feed", {
            type: "Link",
            resolve(parent, args, context, info) {
                return links;
            }
        })
    }
})
///////////////////this is for mutation

export const LinkMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Link",
            args: {
                description: nonNull(stringArg()),
                url: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const { description, url } = args;
                let idCount = links.length + 1;
                const link = {
                    id: idCount,
                    description: description,
                    url: url
                };
                links.push(link);
                return link;
            },
        });
    },
});