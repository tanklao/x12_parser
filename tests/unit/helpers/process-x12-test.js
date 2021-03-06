import { processX12 } from 'x12-parser/helpers/process-x12';
import { module, test } from 'qunit';
import Ember from 'ember';

module('Unit | Helper | process x12');

let x12Contents;

test('it parses X12 into a hash of coverage data', function(assert) {
  let result = processX12([x12Contents]);
  assert.ok(result instanceof Array);
  let firstResult = result[0];
  assert.ok(Ember.$.isPlainObject(firstResult));
  assert.equal(firstResult.firstName, 'TONY');
  assert.equal(firstResult.lastName, 'PARKER');
  assert.equal(firstResult.clientIdForMember, '11111111A');
  assert.equal(firstResult.dependent, false);
  assert.equal(firstResult.primaryPhone, '1111111111');
  assert.equal(firstResult.email, 'tonyparker@example.com');
  assert.equal(firstResult.address1, '900 EVA ST');
  assert.equal(firstResult.address2, 'SAN ANTONIO, TX 77777');
  assert.equal(firstResult.ssn, '895549060');
});

x12Contents = `
ISA*00*          *00*          *30*911223280      *30*45-2355015     *141130*1500*^*00501*000000007*0*P*:~
GS*BE*911223280*45-2355015*20141130*1500*1*X*005010X220A1~
ST*834*0001*005010X220A1~
BGN*00*20141130150008*20141130*1500****4~
DTP*090*D8*20141214~
N1*P5*COSTCO*FI*911223280~
N1*IN*OMADA*FI*45-2355015~
N1*TV*ALIQUANT*FI*999999999~
INS*Y*18*030*XN*A***FT~
REF*0F*111111111~
NM1*IL*1*PARKER*TONY****34*11111111A~
PER*IP**TE*1111111111*EM*tonyparker@example.com~
N3*900 EVA ST~
N4*SAN ANTONIO*TX*77777**60*SW~
DMG*D8*19700111*M~
REF*LU*00123~
REF*3L*HQ~
REF*9X*00001111~
REF*PID*123~
INS*N*18*030*XN*A***PT~
REF*0F*895549060~
NM1*IL*1*GINOBLI*MANU****34*22222222A~
PER*IP**TE*2222222222~
N3*123 ARGENTINA DR~
N4*SAN ANTONIO*TX*77777**60*SE~
DMG*D8*19901011*M~
REF*LU*00321~
REF*3L*HQ~
REF*9X*00002222~
REF*PID*321~
INS*N*18*030*XN*A***PT~
REF*0F*222222222~
NM1*IL*1*DUNCAN*TIM****34*22222222B~
PER*IP**TE*2222222222~
N3*123 ARGENTINA DR~
N4*SAN ANTONIO*TX*77777**60*SE~
DMG*D8*19901011*M~
REF*LU*00321~
REF*3L*HQ~
REF*9X*00002222~
REF*PID*456~
SE*18*0003~
GE*1*1~
IEA*1*000000007~
 `.replace(/\n/g, '').trim();
