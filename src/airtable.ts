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
  // annualBudget: record.get('Budget annuel 2018 (total recettes)'),
  legalForm: record.get('forme juridique'),
});

// la réponse de la promesse est un objet contenant les élément de formatRecord
const getInitiatives = async (): Promise<object> => {
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
const getInitiativesByPages = (pageSize = 10): Promise<object> =>
  new Promise((res, rej) => {
    const acc = [];
    return initiativeTable
      .select({
        pageSize,
        fields: [
          'Id',
          'Date de création',
          'Structure approuvée',
          'Secteurs d’interventions',
          'Champ autre secteur',
          "Type d'initiative",
          'Description de l’action en 400 signes',
          "Description de l'initiative",
          'Soutiens et engagements',
          'Description soutien en nature',
          'Zone d’intervention',
          'Régions',
          'Montant',
          'Lien vers votre page d’appel à don',
          'Action coordonnée avec les pouvoirs publics (oui/non)',
          'forme juridique',
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
const pageReader = <t>(array: Array<t>) => {
  let currentIndex = 0;
  return {
    next: (): t => {
      if (currentIndex++ >= array.length) {
        return null;
      }
      return array[currentIndex];
    },
    prev: (): t => {
      if (currentIndex-- < 0) {
        return null;
      }
      return array[currentIndex];
    },
    setIndex: (index: number) => currentIndex = index,
    getIndex: (): number => currentIndex,
    getLength: (): number => array.length
  };
};

export {
  getInitiatives,
  getInitiativesByPages,
  pageReader
};
