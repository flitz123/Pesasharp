export function getAffiliateUrl(slug: string) {
    const map: Record<string, string> = {
        jumia: 'https://affiliate.jumia.co.ke/example-id',
        broker: 'https://example-broker.com/affiliate-id',
        printify: 'https://printify.com/store/pesaplan'
    };
    return map[slug];
}

