import React from 'react';
import {CapacitorWebviewTesterComponent} from "./capacitor-webview-tester/capacitor-webview-tester.component";
import styled from "styled-components";

const ExploreContainerBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    padding: 12px;
    
`

const ExploreContainer: React.FC = () => {

    return (
        <ExploreContainerBox>
            <CapacitorWebviewTesterComponent/>
        </ExploreContainerBox>
    );
};

export default ExploreContainer;
