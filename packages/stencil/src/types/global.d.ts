import { Icons } from '../components/assets/index';

declare global {
 type IconName = keyof typeof Icons;

 interface SVGProps {
  [key: string]: any;
  className?: string;
  style?: { [key: string]: any };
 }
}

export {};
