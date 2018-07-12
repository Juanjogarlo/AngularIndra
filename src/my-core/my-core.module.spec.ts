import { MyCoreModule } from './my-core.module';

describe('MyCoreModule', () => {
  let myCoreModule: MyCoreModule;

  beforeEach(() => {
    myCoreModule = new MyCoreModule();
  });

  it('should create an instance', () => {
    expect(myCoreModule).toBeTruthy();
  });
});
