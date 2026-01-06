import * as React from  'react';

export const navigationRef =  React.createRef();

export function navigate(routeName, params) {
  /*if (navigationRef.isReady()) {
    navigationRef.navigate({
        routeName, 
        params
    });
  }*/
 navigationRef.current?.navigate(routeName, params);
}
