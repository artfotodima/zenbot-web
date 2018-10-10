import * as React from 'react';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
// See https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Basic.Example.tsx
export class TopCommandBar extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <CommandBar
          items={this.getItems()}
          overflowItems={this.getOverlflowItems()}
          farItems={this.getFarItems()}
          ariaLabel={'Use left and right arrow keys to navigate between commands'}
        />
      </div>
    );
  }

  // Data for CommandBar
  private getItems = () => {
    return [
      {
        href: '/',
        iconProps: {
          iconName: 'Home'
        },
        key: 'home',
        name: 'Zenbot',
        ['data-automation-id']: 'Home'
      },
      // {
      //   iconProps: {
      //     iconName: 'Download'
      //   },
      //   key: 'backfill',
      //   name: 'Backfill',
      //   onClick: () => console.log('Backfill')
      // },
      {
        iconProps: {
          iconName: 'AreaChart'
        },
        key: 'strategies',
        name: 'Strategies',
        onClick: () => console.log('Strategies')
      },
      {
        iconProps: {
          iconName: 'LineChart'
        },
        key: 'paper',
        name: 'Paper Trading',
        onClick: () => console.log('paper trading')
      },
    ];
  };

  private getOverlflowItems = () => {
    return [];
    // return [
    //   {
    //     iconProps: {
    //       iconName: 'MoveToFolder'
    //     },
    //     key: 'move',
    //     name: 'Move to...',
    //     onClick: () => console.log('Move to'),
    //   },
    //   {
    //     iconProps: {
    //       iconName: 'Copy'
    //     },
    //     key: 'copy',
    //     name: 'Copy to...',
    //     onClick: () => console.log('Copy to'),
    //   }
    // ];
  };

  private getFarItems = () => {
    return [
      {
        iconProps: {
          iconName: 'Settings'
        },
        key: 'settings',
        name: 'Settings',
        onClick: () => console.log('Settings')
      },
    ];
  };
}

export default TopCommandBar