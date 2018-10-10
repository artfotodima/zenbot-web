import { INavProps, Nav } from 'office-ui-fabric-react/lib/Nav';
import * as React from 'react';
// import './Nav.Basic.Example.scss';
// https://github.com/OfficeDev/office-ui-fabric-react/blob/4d32614144c1ee0b904746f615ae245bb47348ce/packages/office-ui-fabric-react/src/components/Nav/examples/Nav.Basic.Example.tsx

export class LeftNavMenu extends React.Component<any, any> {
  constructor(props: INavProps) {
    super(props);
    this._onClickHandler = this._onClickHandler.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="ms-NavExample-LeftPane">
        <Nav
          groups={[
            {
              links: [
                {
                  isExpanded: true,
                  links: [
                    {
                      key: 'key1',
                      name: 'Activity',
                      url: 'http://msn.com',
                    },
                    {
                      key: 'key2',
                      name: 'News',
                      url: 'http://msn.com',
                    }
                  ],
                  name: 'Binance',
                  url: 'http://example.com',
                },
                { name: 'Documents', url: 'http://example.com', key: 'key3', isExpanded: true },
                { name: 'Pages', url: 'http://msn.com', key: 'key4' },
                { name: 'Notebook', url: 'http://msn.com', key: 'key5' },
                { name: 'Long Name Test for ellipse', url: 'http://msn.com', key: 'key6' },
                {
                  icon: 'Edit',
                  key: 'key8',
                  name: 'Edit',
                  onClick: this._onClickHandler2,
                  url: 'http://cnn.com',
                },
                {
                  iconProps: { iconName: 'Delete' },
                  key: 'key9',
                  name: 'Delete',
                  onClick: this._onClickHandler2,
                  url: 'http://cnn.com',
                }
              ]
            }
          ]}
          expandedStateText={'expanded'}
          collapsedStateText={'collapsed'}
          selectedKey={'key3'}
        />
      </div>
    );
  }

  private _onClickHandler(e: React.MouseEvent<HTMLElement>): false {
    alert('test');
    return false;
  }

  private _onClickHandler2(e: React.MouseEvent<HTMLElement>): false {
    return false;
  }
}

export default LeftNavMenu