const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores');


const createCoffeeStore = async (req, res) => {
    if (req.method === 'POST') {
        const {id, name, imgUrl, address, postcode, timezone, voting } = req.body;

        try {
            const findCoffeeStoreRecords = await table
                .select({
                    filterByFormula: `id=${id}`,
                })
                .firstPage();

            console.log({findCoffeeStoreRecords});

            if (findCoffeeStoreRecords.length !== 0) {
                const records = findCoffeeStoreRecords.map(record => {
                    return {...record.fields};
                });
                res.json(records);
            } else {
                const createRecords = await table.create([
                    {
                        fields: {id, name, address, postcode, timezone, voting, imgUrl}
                    }
                ]);
                const records = createRecords.map(record => {
                    return {...record.fields};
                });
                res.json({records});
            }
        } catch (err) {
            console.error('Error finding store', err);
            res.status(500);
            res.json({message: 'Error finding store', err});
        }
    }

};

export default createCoffeeStore;


