import React, {useState} from 'react';
import styled from "styled-components";
import {IonButton} from "@ionic/react";
import {CapacitorWebview, UrlChangedEvent, WebViewClosedEvent} from '@jackobo/capacitor-webview';

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
        await CapacitorWebview.addListener('urlChanged', (event: UrlChangedEvent) => {

            setReceivedEvents((prevEvents) => {
                return [
                    ...prevEvents,
                    {
                        eventName: 'urlChanged',
                        url: event.url
                    }
                ]
            })

            if(event.url && event.url.toString().indexOf('passengers-details') >=0) {
                CapacitorWebview.closeWebView();
            }
        });



        await CapacitorWebview.addListener('webViewClosed', (event: WebViewClosedEvent) => {
            setReceivedEvents((preEvents) => {
                return [
                    ...preEvents,
                    {
                        eventName: 'webViewClosed',
                        url: event.url
                    }
                ]
            });


            CapacitorWebview.removeAllListeners();
        })
    }


    const onOpenWebViewClick = async () => {
        await registerListeners();

        const response = await CapacitorWebview.openWebView({
            url: "https://www.aeroitalia.com/",
            enableDebug: true,
            toolbar: {
                title: "Aeroitalia",
                backgroundColor: "#10770c",
                //backgroundColor: "#FF0000",
                color: "#ffffff"
            },
            headers: {
                'some-header': 'some-value'
            }
        });

        setReceivedEvents((preEvents) => {
            return [
                ...preEvents,
                {
                    eventName: 'closeResult',
                    url: response?.url ?? ""
                }
            ]
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