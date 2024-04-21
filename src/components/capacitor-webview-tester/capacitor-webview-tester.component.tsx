import React, {useState} from 'react';
import styled from "styled-components";
import {IonButton} from "@ionic/react";
import {CapacitorWebview, UrlChangedEvent, WebviewClosedEvent} from '@jackobo/capacitor-webview';

const ContainerBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    border: 1px solid var(--ion-color-primary);
`

const TitleBox = styled.div`
    font-weight: bold;
`

const EventsHeaderBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    font-weight: bold;
    font-size: 24px;
`

const ClearButtonBox = styled.div`
    cursor: pointer;
    border: 1px solid var(--ion-color-primary);
    padding: 8px;
    border-radius: 4px;
`

interface IReceivedEvent {
    eventName: string;
    url?: string;
}

export const CapacitorWebviewTesterComponent: React.FC = () => {
    const [receivedEvents, setReceivedEvents] = useState<IReceivedEvent[]>([])

    const registerListeners = async () => {
        await CapacitorWebview.addListener('urlChangedEvent', (event: UrlChangedEvent) => {
            setReceivedEvents((prevEvents) => {
                return [
                    ...prevEvents,
                    {
                        eventName: 'urlChangedEvent',
                        url: event.url
                    }
                ]
            })
        });

        await CapacitorWebview.addListener('webViewClosedEvent', (event: WebviewClosedEvent) => {
            setReceivedEvents((preEvents) => {
                return [
                    ...preEvents,
                    {
                        eventName: 'webViewClosedEvent',
                        url: event.url
                    }
                ]
            });


            CapacitorWebview.removeAllListeners();
        })
    }


    const onOpenWebViewClick = async () => {
        await registerListeners();

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
        <ContainerBox>
            <TitleBox>Capacitor WebView Test</TitleBox>
            <IonButton onClick={onOpenWebViewClick}>Open webview</IonButton>
            <EventsHeaderBox>
                <div>Events</div>
                <ClearButtonBox  onClick={() => setReceivedEvents([])}>
                    Clear
                </ClearButtonBox>
            </EventsHeaderBox>

            <div>
                {receivedEvents.map((ev, index) => (<div key={index + ev.eventName + ev.url}>{`${ev.eventName}: ${ev.url}`}</div>))}
            </div>

        </ContainerBox>
    )
}