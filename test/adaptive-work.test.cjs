const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const root=path.join(__dirname,'../docs');
test('existing planning and maker routes expose bounded exercises',()=>{
 const html=fs.readFileSync(path.join(root,'case-study/03-accessibility-requirements.html'),'utf8');assert.equal(html.split('id="adaptive-work"').length,2);assert.match(html,/not an integrated solution/);assert.match(html,/Keep medical and benefits evidence private/);assert.match(html,/outside its licence/);
 for(const name of ['independent-work.html','accessibility/input-motor.html'])assert.match(fs.readFileSync(path.join(root,name),'utf8'),/03-accessibility-requirements.html#adaptive-work/);
 const maker=fs.readFileSync(path.join(root,'tracks/maker-game-systems.html'),'utf8');assert.equal(maker.split('id="repair-literacy"').length,2);assert.match(maker,/without opening|do not open/i);assert.match(maker,/qualified/);
});
