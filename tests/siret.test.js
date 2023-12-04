const request = require('supertest');
const app = require('../server');

describe('GET /siret/{id}', () => {
  const validSiretId = '39889833800023';
  const invalidSiretId = '123456';
  const nonNumericSiretId = 'abc3425622';
  const validSiret = {
    "siren": "398898338",
    "nic": "00023",
    "siret": "39889833800023",
    "statutdiffusionetablissement": "O",
    "datecreationetablissement": "2000-02-04",
    "trancheeffectifsetablissement": "31",
    "anneeeffectifsetablissement": "2019",
    "activiteprincipaleregistremetiersetablissement": null,
    "datederniertraitementetablissement": "2021-10-27T08:25:06",
    "etablissementsiege": "true",
    "nombreperiodesetablissement": "4",
    "complementadresseetablissement": "30 A 32",
    "numerovoieetablissement": "30",
    "indicerepetitionetablissement": null,
    "typevoieetablissement": "AV",
    "libellevoieetablissement": "DE LA REPUBLIQUE",
    "codepostaletablissement": "94800",
    "libellecommuneetablissement": "VILLEJUIF",
    "libellecommuneetrangeretablissement": null,
    "distributionspecialeetablissement": null,
    "codecommuneetablissement": "94076",
    "codecedexetablissement": "94815",
    "libellecedexetablissement": "VILLEJUIF CEDEX",
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
    "datedebut": "2008-01-01",
    "etatadministratifetablissement": "A",
    "enseigne1etablissement": null,
    "enseigne2etablissement": null,
    "enseigne3etablissement": null,
    "denominationusuelleetablissement": null,
    "activiteprincipaleetablissement": "85.42Z",
    "nomenclatureactiviteprincipaleetablissement": "NAFRev2",
    "caractereemployeuretablissement": "O"
  };

  it('should fetch a SIRET for a valid ID', async () => {
    const res = await request(app).get(`/siret/${validSiretId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(validSiret);
  }, 20000); 

  it('should return 404 for an invalid SIRET ID', async () => {
    const res = await request(app).get(`/siret/${invalidSiretId}`);
    expect(res.statusCode).toBe(404);
  }, 20000); 

  it('should return 400 for a non-numeric SIRET ID', async () => {
    const res = await request(app).get(`/siret/${nonNumericSiretId}`);
    expect(res.statusCode).toBe(400);
  });

  it('should delete a SIRET for a valid ID', async () => {
    const res = await request(app).delete(`/siret/${validSiretId}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return 404 when deleting an invalid SIRET ID', async () => {
    const res = await request(app).delete(`/siret/${invalidSiretId}`);
    expect(res.statusCode).toBe(404);
  });
});
