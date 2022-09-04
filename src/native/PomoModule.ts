import { NativeModule, NativeModules } from 'react-native';

const { PomoModule } = NativeModules;

interface PomoModuleInterface {
  isServiceRunning(): Promise<boolean>;

  bind(): Promise<boolean>;

  unbind(): Promise<void>;

  play(): Promise<void>;

  pause(): Promise<void>;

  stop(): Promise<void>;

  reset(): Promise<void>;
}

export default PomoModule as NativeModule & PomoModuleInterface;
