import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base('Initiatives');

const getInitiatives = ({ maxRecords, sort }) =>
  new Promise((resolve, reject) => {
    table
      .select({
        view: 'Grid view',
        maxRecords,
        sort,
      })
      .firstPage((err, records) => {
        if (err) {
          return reject(err);
        }
        resolve(records); // TODO: format record
      });
  });

export default {
  getInitiatives,
};
