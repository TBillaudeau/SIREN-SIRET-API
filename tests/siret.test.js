const request = require('supertest');
const app = require('../server');


describe('SIRET API Tests', () => {

  describe('GET /siret/{id}', () => {
    it('should fetch a SIRET for a valid ID', async () => {
      const res = await request(app).get(`/siret/${validSiretId}`);
      expect(res.statusCode).toBe(200); 
      expect(res.body).toEqual(validSiretData);
    }); 

    it('should return 404 for an invalid SIRET ID', async () => {
      const res = await request(app).get(`/siret/${invalidSiretId}`);
      expect(res.statusCode).toBe(404);
    }); 

    it('should return 400 for a non-numeric SIRET ID', async () => {
      const res = await request(app).get(`/siret/${nonNumericSiretId}`);
      expect(res.statusCode).toBe(400);
    });
  });


  describe('DELETE /siret/{id}', () => {
    it('should delete a SIRET for a valid ID', async () => {
      const res = await request(app).delete(`/siret/${validSiretId}`);
      expect(res.statusCode).toBe(200);
    });
  
    it('should return 404 when deleting an invalid SIRET ID', async () => {
      const res = await request(app).delete(`/siret/${invalidSiretId}`);
      expect(res.statusCode).toBe(404);
    });
  });


  describe('POST /siret', () => {
    it('should add a new SIRET for valid data', async () => {
      const res = await request(app).post('/siret').query(newSiretData);
      expect(res.statusCode).toBe(200);
    });
  });


  describe('PUT /siret/{id}', () => {
    it('should update a SIRET for a valid ID', async () => {
      const dataWithoutNull = Object.entries(validSiretData)
      .filter(([key, value]) => value !== null)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      const res = await request(app).put(`/siret/${validSiretId}`).query(dataWithoutNull);
      expect(res.statusCode).toBe(200);
    });
  });

});

const validSiretId = '91158733500025';
const invalidSiretId = '12345678910';
const nonNumericSiretId = 'abc3425622';
const validSiretData = {
  "siren": "911587335",
  "nic": "00025",
  "siret": "91158733500025",
  "statutdiffusionetablissement": "O",
  "datecreationetablissement": "2022-04-11",
  "trancheeffectifsetablissement": null,
  "anneeeffectifsetablissement": null,
  "activiteprincipaleregistremetiersetablissement": null,
  "datederniertraitementetablissement": "2022-07-13T08:42:37",
  "etablissementsiege": "true",
  "nombreperiodesetablissement": "2",
  "complementadresseetablissement": null,
  "numerovoieetablissement": "1",
  "indicerepetitionetablissement": "B",
  "typevoieetablissement": "BD",
  "libellevoieetablissement": "MAXIME GORKI",
  "codepostaletablissement": "94800",
  "libellecommuneetablissement": "VILLEJUIF",
  "libellecommuneetrangeretablissement": null,
  "distributionspecialeetablissement": null,
  "codecommuneetablissement": "94076",
  "codecedexetablissement": null,
  "libellecedexetablissement": null,
  "codepaysetrangeretablissement": null,
  "libellepaysetrangeretablissement": null,
  "complementadresse2etablissement": null,
  "numerovoie2etablissement": null,
  "indicerepetition2etablissement": null,
  "typevoie2etablissement": null,
  "libellevoie2etablissement": null,
  "codepostal2etablissement": null,
  "libellecommune2etablissement": null,
  "libellecommuneetranger2etablissement": null,
  "distributionspeciale2etablissement": null,
  "codecommune2etablissement": null,
  "codecedex2etablissement": null,
  "libellecedex2etablissement": null,
  "codepaysetranger2etablissement": null,
  "libellepaysetranger2etablissement": null,
  "datedebut": "2022-07-01",
  "etatadministratifetablissement": "A",
  "enseigne1etablissement": "FRANPRIX",
  "enseigne2etablissement": null,
  "enseigne3etablissement": null,
  "denominationusuelleetablissement": null,
  "activiteprincipaleetablissement": "47.11C",
  "nomenclatureactiviteprincipaleetablissement": "NAFRev2",
  "caractereemployeuretablissement": "O"
};

const newSiretData = {
  "siren": "911587335",
  "nic": "00025",
  "siret": "91158733500025",
  "statutdiffusionetablissement": "O",
  "datecreationetablissement": "2022-04-11",
  "trancheeffectifsetablissement": null,
  "anneeeffectifsetablissement": null,
  "activiteprincipaleregistremetiersetablissement": null,
  "datederniertraitementetablissement": "2022-07-13T08:42:37",
  "etablissementsiege": "true",
  "nombreperiodesetablissement": "2",
  "complementadresseetablissement": null,
  "numerovoieetablissement": "1",
  "indicerepetitionetablissement": "B",
  "typevoieetablissement": "BD",
  "libellevoieetablissement": "MAXIME GORKI",
  "codepostaletablissement": "94800",
  "libellecommuneetablissement": "VILLEJUIF",
  "libellecommuneetrangeretablissement": null,
  "distributionspecialeetablissement": null,
  "codecommuneetablissement": "94076",
  "codecedexetablissement": null,
  "libellecedexetablissement": null,
  "codepaysetrangeretablissement": null,
  "libellepaysetrangeretablissement": null,
  "complementadresse2etablissement": null,
  "numerovoie2etablissement": null,
  "indicerepetition2etablissement": null,
  "typevoie2etablissement": null,
  "libellevoie2etablissement": null,
  "codepostal2etablissement": null,
  "libellecommune2etablissement": null,
  "libellecommuneetranger2etablissement": null,
  "distributionspeciale2etablissement": null,
  "codecommune2etablissement": null,
  "codecedex2etablissement": null,
  "libellecedex2etablissement": null,
  "codepaysetranger2etablissement": null,
  "libellepaysetranger2etablissement": null,
  "datedebut": "2022-07-01",
  "etatadministratifetablissement": "A",
  "enseigne1etablissement": "CARREFOUR MARKET",
  "enseigne2etablissement": null,
  "enseigne3etablissement": null,
  "denominationusuelleetablissement": null,
  "activiteprincipaleetablissement": "47.11C",
  "nomenclatureactiviteprincipaleetablissement": "NAFRev2",
  "caractereemployeuretablissement": "O"
};