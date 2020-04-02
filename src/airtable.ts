import Airtable from 'airtable';

import { config } from 'dotenv';

config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const publishedInitiative = base('Initiatives')
  .select({
    view: 'Liste des initiatives publiées',
  });

// Fields detail : https://airtable.com/appyiU5U8JBAf23m2/api/docs#javascript/table:initiatives:fields
const formatRecord = (record: Record<string, any>): object => ({
  id: record.get('Id'),
  idNumber: record.get('Id number'),

  date: record.get('Date de création'),

  contactRole: record.get('Fonction du répondant'),
  contactLastName: record.get('Nom du contact'),
  contactFirstName: record.get('Prénom du contact'),
  contactMail: record.get('Mail du contact'),
  contactPhone: record.get('Téléphone du contact'),

  knownMailInContactBase: record.get('Mail connu dans base contacts'),

  requestState: record.get('Etat de la demande'),
  structureName: record.get('Nom de la structure'),
  approuvedStructures: record.get('Structure approuvée'),

  interventionAreas: record.get('Secteurs d’interventions'),
  interventionOtherArea: record.get('Champ autre secteur'),
  interventionZone: record.get('Zone d’intervention'),

  actionCoordinatedWithPP: record.get('Action coordonnée avec les pouvoirs publics (oui/non)'),
  actionDescription: record.get('Description de l’action en 400 signes'),

  supportAndEngagement: record.get('Soutiens et engagements'),
  supportDescription: record.get('Description soutien en nature'),

  initiativeType: record.get('Type d\'initiative'),
  initiativeStatus: record.get('Statut de l\'initiative'),
  initiativeDescription: record.get('Description de l\'initiative'),

  region: record.get('Régions'),
  amount: record.get('Montant'),
  link: record.get('Lien vers votre page d’appel à don'),
  attachments: record.get('Attachment'),
  annualBudget: record.get('Budget annuel 2018 (total recettes)'),
});

// la réponse de la promesse est un objet contenant les élément de formatRecord
const getInitiatives = async (): Promise<object> => {
  return publishedInitiative
    .firstPage() // on fetch les records
    .then((records: Array<Record<string, any>>) => records.map(formatRecord)); // on les normalise
};

export default {
  getInitiatives,
};
