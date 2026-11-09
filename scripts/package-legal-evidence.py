"""Build/check only the checked-in public synthetic package. Never accepts private inputs.
Run after rendering report.pdf: python3 scripts/package-legal-evidence.py [--check]
No runtime dependency; this is not the held Creative Filing Library archive format.
"""
import csv,hashlib,io,json,pathlib,sys,zipfile
ROOT=pathlib.Path(__file__).resolve().parents[1]/'docs/legal-rights'
TABLES=('evidence','timeline','contributors','permissions','authorities','decisions')
def digest(b):return hashlib.sha256(b).hexdigest()
def csv_bytes(rows):
 fields=list(rows[0]);f=io.StringIO(newline='');w=csv.DictWriter(f,fields,lineterminator='\n');w.writeheader()
 for row in rows:w.writerow({k:json.dumps(v,ensure_ascii=False,separators=(',',':')) for k,v in row.items()})
 return f.getvalue().encode()
def read_csv(b):return [{k:json.loads(v) for k,v in row.items()} for row in csv.DictReader(io.StringIO(b.decode(),newline=''))]
def build():
 data=json.loads((ROOT/'package.json').read_text());assert data['visibility']=='public_synthetic' and data['professional_review']=='PENDING'
 assert all(a['visibility']=='public_synthetic' for a in data['evidence'])
 members={p:(ROOT/p).read_bytes() for p in ['package.json','evidence-package.schema.json','report.html','report.css','report.pdf','synthetic/brief.txt']}
 for k in TABLES:
  b=csv_bytes(data[k]);assert read_csv(b)==data[k];members[k+'.csv']=b
 manifest=dict(schema_version='1.0.0',package_id=data['package_id'],exported_at=data['exported_at'],visibility='public_synthetic',professional_review='PENDING',excluded='All real protected media, mail, contracts, identity, medical, financial, benefits and housing evidence',members=[dict(path=p,size_bytes=len(b),sha256=digest(b)) for p,b in sorted(members.items())])
 members['manifest.json']=(json.dumps(manifest,indent=2)+'\n').encode();out=io.BytesIO()
 with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
  for p,b in sorted(members.items()):z.writestr(zipfile.ZipInfo(p,(2026,11,9,0,0,0)),b)
 archive=out.getvalue();return {**members,'sample-v1.zip':archive,'sample-v1.zip.sha256':(digest(archive)+'  sample-v1.zip\n').encode()}
def verify_archive(b):
 with zipfile.ZipFile(io.BytesIO(b)) as z:
  names=z.namelist();assert len(names)==len(set(names))
  assert all(not p.startswith('/') and '..' not in pathlib.PurePosixPath(p).parts for p in names)
  m=json.loads(z.read('manifest.json'));assert sorted(names)==sorted([x['path'] for x in m['members']]+['manifest.json'])
  for x in m['members']:
   raw=z.read(x['path']);assert len(raw)==x['size_bytes'] and digest(raw)==x['sha256']
  data=json.loads(z.read('package.json'))
  for k in TABLES:assert read_csv(z.read(k+'.csv'))==data[k]
  a=data['evidence'][0];assert digest(z.read(a['source_record_reference']))==a['sha256']
  ids={e['event_id'] for e in data['timeline']};assert set(a['custody_event_ids'])<=ids
  for e in data['timeline']:
   assert e['supersedes']=='unknown' or e['supersedes'] in ids
  assert data['evidence'][0]['source_creation']['value']=='unknown'
  assert data['timeline'][2]['supersedes']==data['timeline'][1]['event_id']
if __name__=='__main__':
 expected=build()
 if '--check' in sys.argv:
  for p,b in expected.items():assert (ROOT/p).read_bytes()==b,'Stale '+p
 else:
  for p,b in expected.items():(ROOT/p).write_bytes(b)
 verify_archive(expected['sample-v1.zip'])
 # JSON cells preserve formulas as quoted string data and round-trip nested values.
 malicious=[dict(text='=HYPERLINK("https://invalid.example")',nested={'x':['unknown',0]})]
 assert read_csv(csv_bytes(malicious))==malicious
 assert list(csv.DictReader(io.StringIO(csv_bytes(malicious).decode())))[0]['text'].startswith('"')
 print('PASS: six CSV/JSON round trips, synthetic original hash, append-only example, archive membership/path/hash checks, spreadsheet formula-as-data encoding and reproducibility')
