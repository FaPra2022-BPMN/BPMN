import { Diagram } from '../diagram';
import { SwitchController } from './switch-controller'; // import { SwitchController } from './switch-controller';

describe('SwitchController', () => {
  it('should create an instance', () => {
    expect(new SwitchController(new Diagram())).toBeTruthy();   
  });
});
