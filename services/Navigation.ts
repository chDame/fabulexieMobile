import {createRef} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const isMountedRef = createRef<boolean>();

export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name: string) {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
