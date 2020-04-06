import Airtable from 'airtable';
import { environment } from './environments/environment';

const base = new Airtable({
  apiKey: environment.airtable.apiKey,
}).base(environment.airtable.baseId);

const initiativeTable = base(environment.airtable.tableName);

// Fields detail : https://airtable.com/appyiU5U8JBAf23m2/api/docs#javascript/table:initiatives:fields
const formatRecord = (record: Record<string, any>): object => ({
  id: record.get('Id'),
  // idNumber: record.get('Id number'),

  date: record.get('Date de création'),

  // contactRole: record.get('Fonction du répondant'),
  // contactLastName: record.get('Nom du contact'),
  // contactFirstName: record.get('Prénom du contact'),
  // contactMail: record.get('Mail du contact'),
  // contactPhone: record.get('Téléphone du contact'),

  // knownMailInContactBase: record.get('Mail connu dans base contacts'),

  // requestState: record.get('Etat de la demande'),
  structureName: record.get('Nom de la structure'),
  approuvedStructures: record.get('Structure approuvée'),

  interventionAreas: record.get('Secteurs d’interventions'),
  interventionOtherArea: record.get('Champ autre secteur'),
  interventionZone: record.get('Zone d’intervention'),

  actionCoordinatedWithPP: record.get(
    'Action coordonnée avec les pouvoirs publics (oui/non)'
  ),
  actionDescription: record.get('Description de l’action en 400 signes'),

  supportAndEngagement: record.get('Soutiens et engagements'),
  supportDescription: record.get('Description soutien en nature'),

  initiativeType: record.get("Type d'initiative"),
  // initiativeStatus: record.get("Statut de l'initiative"),
  initiativeDescription: record.get("Description de l'initiative"),

  region: record.get('Régions'),
  amount: record.get('Montant'),
  link: record.get('Lien vers votre page d’appel à don'),
  attachments: record.get('Attachment'),
  annualBudget: record.get('Budget annuel 2018 (total recettes)'),
  legalForm: record.get('forme juridique'),
});

// la réponse de la promesse est un objet contenant les élément de formatRecord
const getInitiatives = async (): Promise<Array<Record<string, any>>> => {
  return initiativeTable
    .select({
      view: environment.airtable.viewName,
    })
    .firstPage() // on fetch les records
    .then((records: Array<Record<string, any>>) => records.map(formatRecord)); // on les normalise
};
/**
 * Renvoi ranger par pages TOUS les records initiatives
 * @param pageSize le nombre de records dans une page
 */
const getInitiativesByPages = (pageSize = 10): Promise<Array<Array<Record<string, any>>>> =>
  new Promise((res, rej) => {
    const acc = [];
    return initiativeTable
      .select({
        pageSize,
        fields: [
          'Id',
          'Date de création',
          'Nom de la structure',
          'Structure approuvée',
          'Secteurs d’interventions',
          'Champ autre secteur',
          `Type d'initiative`,
          // 'Description de l’action en 400 signes',
          "Description de l'initiative",
          'Soutiens et engagements',
          'Description soutien en nature',
          'Zone d’intervention',
          'Régions',
          'Montant',
          'Lien vers votre page d’appel à don',
          'Budget annuel 2018 (total recettes)',
          'forme juridique',
          'Attachment',
        ],
        view: environment.airtable.viewName,
      })
      .eachPage(
        (records: Array<Record<string, any>>, fetchNextPage: () => void) => {
          acc.push(records.map(formatRecord));
          fetchNextPage();
        },
        (err: any) => {
          if (err === null) {
            res(acc);
            return;
          }
          rej(err);
        }
      );
  });

/**
 * Permet d'acceder aux information pages par pages.
 * @param array le tableau ranger par pages à lire
 * @returns next: page suivant; prev: page precedante; getLength: la longueur; getIndex: l'indice courant; setIndex: assigne l'indice courrant
 */
const PageReader = <t>(array: Array<Array<t>>) => {
  if (array.length <= 0) {
    throw new Error('Array must not be empty');
  }
  let currentIndex = 0;
  let arrayBuffer = array; // Une image du tableau de base pouvant etre manipuler à souhait
  // let accumulator = []; // contient tous les elements à plat de 0 à currentIndex
  return {
    next: (): Array<t> => {
      if (currentIndex >= arrayBuffer.length - 1) {
        return null;
      }
      currentIndex += 1;
      // accumulator = arrayBuffer
      //   .slice(0, currentIndex + 1)
      //   // flatten
      //   .reduce((acc, cur, i) => [...acc, ...cur], []);
      return arrayBuffer[currentIndex];
    },
    prev: (): Array<t> => {
      if (currentIndex - 1 < 0) {
        return null;
      }
      currentIndex -= 1;
      // accumulator = arrayBuffer
      //   .slice(0, currentIndex)
      //   // flatten
      //   .reduce((acc, cur, i) => [...acc, ...cur], []);
      return arrayBuffer[currentIndex];
    },
    setIndex: (index: number) => currentIndex = index,
    getCurrent: () => arrayBuffer[currentIndex],
    getPages: () => arrayBuffer,
    getPageSize: () => arrayBuffer[currentIndex].length,
    getIndex: (): number => currentIndex,
    getLength: (): number => arrayBuffer.length,
    // getAcc: (): Array<t> => accumulator,
    isEmpty: () => !arrayBuffer.some((value) => value.some(_ => true)),
    search: (filter: (c: t, i: number, a: Array<t>) => boolean) => {
      const filterdArray = array
        // search
        .map(arr => arr.filter(filter))
        // flatten
        .reduce((acc, cur, i) => [...acc, ...cur], []);
      // on rempli le tableau des élément de la recherche selon la taille max des pages
      const pageSize = array[currentIndex].length;
      arrayBuffer = [];
      let acc = [];

      filterdArray.forEach(record => {
        if (acc.length >= pageSize) {
          arrayBuffer.push(acc);
          acc = [];
        }
        acc.push(record);
      });
      if (acc.length > 0) {
        arrayBuffer.push(acc);
      }
    }
  };
};

export {
  getInitiatives,
  getInitiativesByPages,
  PageReader
};
