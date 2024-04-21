import React from 'react';
import './ExploreContainer.css';
import {IonButton} from "@ionic/react";
import {CapacitorWebview} from "@jackobo/capacitor-webview";


const ExploreContainer: React.FC = () => {
    const onOpenWebViewClick = async () => {
        await CapacitorWebview.openWebView({
            url: "https://www.aeroitalia.com/",
            toolbar: {
                title: "Aeroitalia",
                backgroundColor: "#FF0000",
                color: "#ffffff"
            }
        });
    }
    return (
        <div id="container" onClick={onOpenWebViewClick}>
            <IonButton>Open webview</IonButton>
        </div>
    );
};

export default ExploreContainer;
