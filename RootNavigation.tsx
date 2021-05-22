import { NavigationContainerRef } from '@react-navigation/core';
import * as React from 'react';

export const navigationRef: React.Ref<NavigationContainerRef> = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}
